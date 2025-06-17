"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, UploadCloud } from "lucide-react"

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (file: File | null) => void
}

export function FileUpload({ uploadedFile, onFileUpload }: FileUploadProps) {
  const [error, setError] = useState("")
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB")
      return false
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed")
      return false
    }
    return true
  }

  const handleFileSelect = (file: File) => {
    setError("")
    if (validateFile(file)) {
      onFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    onFileUpload(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-gray-50"
            : "border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploadedFile ? (
            <>
              <FileText className="w-12 h-12 text-orange-500 mb-3" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{uploadedFile.name}</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-blue-500 mb-3" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Drag &apos;n&apos; drop a file here, or click to select a file
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF (Max. 2MB)</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleInputChange}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {uploadedFile && (
        <div className="space-x-2 mt-3">
          <Button variant="destructive" size="sm" onClick={removeFile}>
            <X />
            Remove File
          </Button>
          <Button size="sm" onClick={removeFile}>
            <UploadCloud />
            Upload
          </Button>
        </div>
      )}
    </div>
  )
}