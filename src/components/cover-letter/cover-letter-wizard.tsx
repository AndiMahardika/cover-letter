"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ExternalLink, Loader } from "lucide-react"
import { Stepper } from "./stepper"
import { FileUpload } from "./file-upload"
import { useStepsStore } from "@/store/stepStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { on } from "events"

interface CoverLetterWizardProps {
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
  jobUrl: string
  setJobUrl: (url: string) => void
  onGenerate: (coverLetter: string) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function CoverLetterWizard({
  uploadedFile,
  setUploadedFile,
  jobUrl,
  setJobUrl,
  onGenerate,
  isGenerating,
  setIsGenerating,
}: CoverLetterWizardProps) {
  const { currentStep, nextStep, prevStep, setStep } = useStepsStore()
  const [jobSource, setJobSource] = useState("")
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [language, setLanguage] = useState("english")

  const steps = [
    { number: 1, title: "Upload CV", description: "Upload your resume" },
    { number: 2, title: "Job URL", description: "Enter job vacancy URL" },
    { number: 3, title: "Generate", description: "Create cover letter" },
  ]

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleUrl = async () => {
    if (!jobUrl || !jobSource) return

    setIsLoadingUrl(true)
    setUrlError(null)

    try {
      const res = await fetch("/api/crawl-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: jobUrl.trim(), jobSource }),
      });
      
      const data = await res.json()

      if (!res.ok) {
        setUrlError(`${data.error || "Unknown error occurred."}`);
      } else {
        // console.log("Crawl URL result:", data);
        localStorage.setItem("jobData", JSON.stringify(data));
        nextStep()
      }
    } catch (error) {
      // setUrlError(`Network Error: ${error}`);
      setUrlError("Something went wrong. Try again later.")
    } finally {
      setIsLoadingUrl(false)
    }
  }

  const handleGenerate = async () => {
    const pdfText = localStorage.getItem("pdfText")
    const jobData = localStorage.getItem("jobData")
    
    setIsGenerating(true)
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText: pdfText,
          jobData: jobData ? JSON.parse(jobData) : null,
          language,
        }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to generate cover letter")
      }
      const data = await res.json()
      console.log("Generated cover letter:", data)
      onGenerate(data)
    } catch (error) {
      console.error("Error generating cover letter:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                First, <span className="font-bold">upload your resume</span> in order to fully customize your cover
                letter.
              </h3>
            </div>
            <FileUpload uploadedFile={uploadedFile} onFileUpload={setUploadedFile} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                Enter the <span className="font-bold">job vacancy URL</span> to analyze the requirements.
              </h3>
              <p className="text-gray-600">We'll analyze the job posting to create a targeted cover letter.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="jobUrl" className="text-navy-900 font-medium">
                    Job Vacancy URL
                  </Label>
                  <div className="mt-2 relative">
                    <Input
                      id="jobUrl"
                      type="url"
                      placeholder="https://example.com/job-posting"
                      value={jobUrl}
                      onChange={(e) => {
                        const value = e.target.value
                        setJobUrl(value)
                        if (value === "" || isValidUrl(value)) {
                          setUrlError(null)
                        } else {
                          setUrlError("Please enter a valid URL (e.g. https://example.com)")
                        }
                      }}
                      className={`pr-10 border ${
                        urlError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      }`}
                    />
                    <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {urlError && (
                    <p className="mt-1 text-sm text-red-600">{urlError}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="jobSource" className="text-navy-900 font-medium">
                    Job Source
                  </Label>
                  <Select value={jobSource} onValueChange={setJobSource}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Select job source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glints">Glints</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="jobstreet">Jobstreet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              { jobUrl && jobSource && (
                <Button onClick={handleUrl} disabled={isLoadingUrl} className="w-full bg-navy-900 hover:bg-navy-800 text-white m-0 rounded-lg font-semibold transition-colors">
                  { isLoadingUrl ? (
                    <>
                      <Loader className="animate-spin w-5 h-5 mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                Ready to <span className="font-bold">generate your cover letter</span>!
              </h3>
              <p className="text-gray-600">
                We'll create a personalized cover letter based on your CV and the job requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-navy-900 hover:bg-navy-800 text-white m-0 rounded-lg font-semibold transition-colors md:col-span-3"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Cover Letter...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>

              <div className="">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className=" border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}