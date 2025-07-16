"use client"

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import formatDate from '@/lib/formatDate'
import { supabase } from '@/lib/supabaseClient'
import { Calendar, FileText } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

type History = {
  id: number
  user_id: number
  date: string
  title_letter: string
  language: string
  job_source: string
  cover_letter: string
}

export default function HistoryPage() {
  const [selectedLetter, setSelectedLetter] = useState<History | null>(null)
  const [history, setHistory] = useState<History[] | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef: editorRef });

  const fetchDataHistory = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error("Failed to fetch user profile");
      return;
    }

    const userId = user.id
    const { data: history } = await supabase.from("history").select("*").eq("user_id", userId)

    if (error) {
      console.error("Error fetching history:", error)
      return
    }
    setHistory(history)
    return
  }

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

  const handleSelectLetter = (letter: History) => {
    setSelectedLetter(letter)
  }

  useEffect(() => {
    fetchDataHistory()
  }, [])
  
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
                {history?.map((letter) => (
                  <div
                    key={letter.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md border-gray-200 hover:border-gray-300`}
                    onClick={() => handleSelectLetter(letter)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-navy-900 text-sm leading-tight">{letter.title_letter}</h3>
                        <Badge variant="secondary" className={`text-xs ${getJobSourceColor(letter.job_source)}`}>
                          {letter.job_source}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(letter.date)}</span>
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

              {history?.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No cover letters found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* right section - preview cover letter */}
        <div>
        <Card className="h-fit">
            <CardHeader>
            <div className="flex items-center justify-between space-x-4">
              <div className="">
                <CardTitle className="text-navy-900">Cover Letter Preview</CardTitle>
                <CardDescription>Your cover letter will appear here</CardDescription>
              </div>
              { selectedLetter && (
                <>
                  <Button onClick={reactToPrintFn}>Download</Button>
                </>
              )}
            </div>
            </CardHeader>
            <CardContent>
            { selectedLetter ? (
              <SimpleEditor key={selectedLetter.cover_letter} text={selectedLetter.cover_letter} editorRef={editorRef} />
            ) : (
              <div className='text-center py-8'>no cover letter selected</div>
            ) }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}