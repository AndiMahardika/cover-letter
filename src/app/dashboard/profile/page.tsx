import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, MapPin, Phone, Edit, Camera } from "lucide-react"

export default function ProfilePage() {
  // In a real app, this data would come from your database/API
  const userProfile = {
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "January 15, 2023",
    location: "Indonesia",
    phone: "+1 (555) 123-4567",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">User Profile</h1>
          {/* <p className="text-gray-600 mt-2">Manage your personal information and account settings</p> */}
        </div>
        {/* <Button className="bg-navy-900 hover:bg-navy-800">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button> */}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="bg-navy-900 text-white text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-2 border-white shadow-md hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl text-navy-900 mt-4">{userProfile.name}</CardTitle>
            <CardDescription className="text-gray-600">{userProfile.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {userProfile.joinedDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-navy-900">Profile Information</CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-navy-900">{userProfile.name}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Account Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Member Since</span>
                  </div>
                  <p className="text-blue-700">{userProfile.joinedDate}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {Math.floor((new Date().getTime() - new Date("2023-01-15").getTime()) / (1000 * 60 * 60 * 24))} days
                    ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-navy-900">Account Actions</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50">
              Change Password
            </Button>
            <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50">
              Update Email
            </Button>
            <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-50">
              Privacy Settings
            </Button>
            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}