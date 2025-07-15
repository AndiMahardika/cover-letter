"use client"

import { useEffect, useState } from "react"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CoverLetterWizard } from "@/components/cover-letter/cover-letter-wizard"
import { CoverLetterPreview } from "@/components/cover-letter/cover-letter-preview"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { useReactToPrint } from "react-to-print";
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"

export interface Generate {
  coverLetter: string
  compatibility: {
    percentage: string
    strong_match: string
    experience_level: string
    minor_gap: string
  }
}

export default function CoverLetterPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobUrl, setJobUrl] = useState("")
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<Generate | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [titleLetter, setTitleLetter] = useState("")
  const [userId, setUserId] = useState("")
  const [saved, setSaved] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef: editorRef });

  const fetchUserId = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error("Failed to fetch user profile");
      return;
    }
    setUserId(user.id);
  }
  useEffect(() => {
    fetchUserId();
    if (localStorage.getItem("jobData")) {
      const jobData = JSON.parse(localStorage.getItem("jobData") || "{}");
      setTitleLetter(jobData.jobTitle + " - " + jobData.companyName)
    }
  }, [userId]);

  const handleSaveHistory = async () => {
    if(userId) {
      const { error } = await supabase
        .from("history")
        .insert({
          user_id: userId,
          title_letter: titleLetter,
          cover_letter: generatedCoverLetter?.coverLetter,
          date: new Date().toISOString(),
        })

      if (error) {
        toast.error("Failed to save history!");
        console.error("Error saving history:", error);
        setSaved(false);
        return;
      }
      toast.success("History saved successfully!");
      setSaved(true);
    }
    return;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900">Cover Letter Generator</h1>
        <p className="text-gray-600 mt-2">Create personalized cover letters based on your CV and job requirements</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Section - Wizard */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-navy-900">Generate Your Cover Letter</CardTitle>
              <CardDescription>Follow these steps to create a personalized cover letter</CardDescription>
            </CardHeader>
            <CardContent>
              <CoverLetterWizard
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                jobUrl={jobUrl}
                setJobUrl={setJobUrl}
                onGenerate={setGeneratedCoverLetter}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Preview */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
            <div className="flex items-center justify-between space-x-4">
              <div className="">
                <CardTitle className="text-navy-900">Cover Letter Preview</CardTitle>
                <CardDescription>Your generated cover letter will appear here</CardDescription>
              </div>
              { generatedCoverLetter && (
                <>
                  <Button onClick={handleSaveHistory} disabled={saved}>{saved ? "Saved" : "Save History"}</Button>
                  <Button onClick={reactToPrintFn}>Download</Button>
                </>
              )}
            </div>
            </CardHeader>
            <CardContent>
            { generatedCoverLetter ? (
              <SimpleEditor key={generatedCoverLetter.coverLetter} text={generatedCoverLetter.coverLetter} editorRef={editorRef} />
            ) : (
              <CoverLetterPreview isGenerating={isGenerating} />
              )
            }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}