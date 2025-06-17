"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Copy, Loader2 } from "lucide-react"
import { useState } from "react"

interface CoverLetterPreviewProps {
  coverLetter: string
  isGenerating: boolean
}

export function CoverLetterPreview({ coverLetter, isGenerating }: CoverLetterPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (coverLetter) {
      await navigator.clipboard.writeText(coverLetter)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (coverLetter) {
      const blob = new Blob([coverLetter], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "cover-letter.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <div className="text-center">
          <p className="font-medium text-navy-900">Generating your cover letter...</p>
          <p className="text-sm text-gray-600 mt-1">This may take a few moments</p>
        </div>
      </div>
    )
  }

  if (!coverLetter) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-gray-900">No cover letter generated yet</p>
          <p className="text-sm text-gray-600 mt-1">Complete the steps on the left to generate your cover letter</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy-900">Generated Cover Letter</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="border-gray-300">
            <Copy className="h-4 w-4 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="border-gray-300">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      <Separator />

      <div className="bg-white border rounded-lg p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{coverLetter}</div>
        </div>
      </div>
    </div>
  )
}