"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, MapPin, Phone, Edit, Camera, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import EditProfileDialog from "./edit";
import toast from "react-hot-toast";

type UserProfile = {
  name: string;
  email: string;
  joinedDate: string;
  location: string;
  phone: string;
};

export default function ProfilePage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
    joinedDate: "",
    location: "",
    phone: "",
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log(user?.user_metadata?.name);

      if (error || !user) {
        toast.error("Failed to fetch user profile");
        return;
      }
      const data = user.user_metadata || {};
      const needsUpdate = !data.location || !data.phone;

      const updatedMetadata = {
        name: data.name || "John Doe",
        email: data.email || user.email || "john@example.com",
        joinedDate:
          user.created_at &&
          new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        location: data.location || "Indonesia",
        phone: data.phone || "(+62) 812-3456-7890",
      };

      if (needsUpdate) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            ...data,
            ...updatedMetadata,
          }
        })

        if (updateError) {
          toast.error("Failed to update user profile");
        }
      }
      setUserProfile({
        name: updatedMetadata.name,
        email: updatedMetadata.email,
        joinedDate: updatedMetadata.joinedDate || "-",
        location: updatedMetadata.location,
        phone: updatedMetadata.phone,
      });
    }

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (updatedFields: Partial<typeof userProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">User Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and account settings
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-navy-900 hover:bg-navy-800"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
          onProfileUpdate={handleProfileUpdate} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile"
                />
                <AvatarFallback className="bg-navy-900 text-white text-2xl">
                  {userProfile.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-2 border-white shadow-md hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl text-navy-900 mt-4">
              {userProfile.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {userProfile.email}
            </CardDescription>
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
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex gap-2 items-center">
                    <User className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.name}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">
                      {userProfile.location}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-navy-900">{userProfile.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Account Details
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Member Since
                    </span>
                  </div>
                  <p className="text-blue-700">{userProfile.joinedDate}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date("2023-01-15").getTime()) /
                      (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
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
  );
}
