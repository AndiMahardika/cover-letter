"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ExternalLink } from "lucide-react"
import { Stepper } from "./stepper"
import { FileUpload } from "./file-upload"

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
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { number: 1, title: "Upload CV", description: "Upload your resume" },
    { number: 2, title: "Job URL", description: "Enter job vacancy URL" },
    { number: 3, title: "Generate", description: "Create cover letter" },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerate = async () => {
    if (!uploadedFile || !jobUrl) return

    // setIsGenerating(true)
    // try {
    //   const formData = new FormData()
    //   formData.append("cv", uploadedFile)
    //   formData.append("jobUrl", jobUrl)

    //   const result = await generateCoverLetter(formData)
    //   if (result.success) {
    //     onGenerate(result.coverLetter)
    //   }
    // } catch (error) {
    //   console.error("Error generating cover letter:", error)
    // } finally {
    //   setIsGenerating(false)
    // }
  }

  const canProceedToStep2 = uploadedFile !== null
  const canProceedToStep3 = uploadedFile !== null && jobUrl.trim() !== ""

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
              <div>
                <Label htmlFor="jobUrl" className="text-navy-900 font-medium">
                  Job Vacancy URL
                </Label>
                <div className="mt-2 relative">
                  <Input
                    id="jobUrl"
                    type="url"
                    placeholder="https://example.com/job-posting"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    className="pr-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              {jobUrl && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">✓ URL looks valid and ready for analysis</p>
                </div>
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

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-navy-900 mb-2">Summary:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>CV uploaded: {uploadedFile?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Job URL provided</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!canProceedToStep3 || isGenerating}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}