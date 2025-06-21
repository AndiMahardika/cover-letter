"use client"

import { useState } from "react"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CoverLetterWizard } from "@/components/cover-letter/cover-letter-wizard"
import { CoverLetterPreview } from "@/components/cover-letter/cover-letter-preview"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { useReactToPrint } from "react-to-print";

export default function CoverLetterPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobUrl, setJobUrl] = useState("")
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef: editorRef });

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
              <Button onClick={reactToPrintFn}>Download</Button>
            </div>
            </CardHeader>
            <CardContent>
            { generatedCoverLetter ? (
              <SimpleEditor key={generatedCoverLetter} text={generatedCoverLetter} editorRef={editorRef} />
            ) : (
              <CoverLetterPreview coverLetter={generatedCoverLetter} isGenerating={isGenerating} />
              )
            }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}