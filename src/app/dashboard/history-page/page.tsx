"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import formatDate from '@/lib/formatDate'
import { Calendar, FileText } from 'lucide-react'
import { useState } from 'react'

// Mock data for cover letters history
const mockCoverLetters = [
  {
    id: 1,
    name: "Software Engineer - TechCorp",
    jobSource: "LinkedIn",
    createdDate: "2024-01-15",
    content: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at TechCorp. With over 5 years of experience in full-stack development and a passion for creating innovative solutions, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed expertise in:
• React, Node.js, and TypeScript development
• Cloud architecture using AWS and Azure
• Agile development methodologies
• Database design and optimization

My recent project involved building a scalable e-commerce platform that handled over 100,000 daily transactions, demonstrating my ability to work with high-performance systems.

I am particularly excited about TechCorp's commitment to innovation and would love to contribute to your upcoming AI initiatives.

Thank you for considering my application.

Best regards,
John Doe`,
    language: "English",
  },
]

export default function HistoryPage() {
  const [selectedLetter, setSelectedLetter] = useState(mockCoverLetters[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [copied, setCopied] = useState(false)

  const getJobSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "linkedin":
        return "bg-blue-100 text-blue-700"
      case "glints":
        return "bg-green-100 text-green-700"
      case "jobstreet":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredLetters = mockCoverLetters.filter(
    (letter) =>
      letter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.jobSource.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  return (
    <div className='space-y-6'>
      <div>
        <h1 className="text-3xl font-bold text-navy-900">History</h1>
        <p className="text-gray-600 mt-2">Your cover letter history</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* left section - list cover letter */}
        <div className=''>
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-navy-900">Your Cover Letters</CardTitle>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  10 letters
                </Badge>
              </div>
              <CardDescription>Click on any letter to view its content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cover letters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div> */}

              {/* Cover Letters List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md border-gray-200 hover:border-gray-300`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-navy-900 text-sm leading-tight">{letter.name}</h3>
                        <Badge variant="secondary" className={`text-xs ${getJobSourceColor(letter.jobSource)}`}>
                          {letter.jobSource}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(letter.createdDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{letter.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* {filteredLetters.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No cover letters found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                </div>
              )} */}
            </CardContent>
          </Card>
        </div>

        {/* right section - preview cover letter */}
        <div>

        </div>
      </div>
    </div>
  )
}