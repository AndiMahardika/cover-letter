"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditProfileDialog({
    open,
    onOpenChange,
    onProfileUpdate,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onProfileUpdate: (updatedFields: { name?: string; location?: string; phone?: string }) => void;
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+62"); // Default to Indonesia
    const [localPhone, setLocalPhone] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation name and phone number
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const countryMap: Record<string, string> = {
        "+62": "Indonesia",
        "+60": "Malaysia",
        "+65": "Singapore",
        "+1": "United States",
    };

    // Get user data when modal is opened
    useEffect(() => {
        if (!open) return;

        const fetchUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error || !user) {
                toast.error("Failed to fetch user data");
                return;
            }

            setName(user.user_metadata?.name || "");
            setEmail(user.email || "");

            const rawPhone = user.user_metadata?.phone || "";
            const digitsOnly = rawPhone.replace(/\D/g, "");

            const userLocation = user.user_metadata?.location || "Indonesia";
            const code = Object.entries(countryMap).find(([c, loc]) => loc === userLocation)?.[0] || "+62";

            setLocation(userLocation);
            setCountryCode(code);

            const codeDigits = code.replace("+", "");
            const localDigits = digitsOnly.startsWith(codeDigits)
                ? digitsOnly.slice(codeDigits.length)
                : digitsOnly;

            setLocalPhone(localDigits);
            setPhone(formatPhoneNumber(localDigits, code));

            setNameError("");
            setPhoneError("");
        };

        fetchUser();
    }, [open]);

    useEffect(() => {
        setPhone(formatPhoneNumber(localPhone, countryCode));
    }, [countryCode]);

    // Handle name change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (!value.trim()) {
            setNameError("Full name is required");
        } else {
            setNameError("");
        }
    };

    // Handle phone number change
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validate input to only numbers
        if (/[a-zA-Z]/.test(e.target.value)) {
            return;
        }

        const input = e.target.value.replace(/\D/g, "");
        const countryCodeDigits = countryCode.replace("+", "");

        // If the input starts with the country code, remove it
        const startsWithCountryCode = input.startsWith(countryCodeDigits);
        const cleaned = startsWithCountryCode
            ? input.slice(countryCodeDigits.length)
            : input;

        setLocalPhone(cleaned);
        setPhone(e.target.value);
    };

    const handlePhoneBlur = () => {
        setPhone(formatPhoneNumber(localPhone, countryCode));
    };

    const handleCountryCodeChange = (code: string) => {
        setCountryCode(code);
        const newLocation = countryMap[code] || "";
        setLocation(newLocation);
        setPhone(formatPhoneNumber(localPhone, code));
    };

    const formatPhoneNumber = (digits: string, code: string) => {
        if (!digits) return `(${code})`;
        const blocks = [];
        for (let i = 0; i < digits.length;) {
            const blockSize = i === 0 ? 3 : 4;
            blocks.push(digits.slice(i, i + blockSize));
            i += blockSize;
        }
        return `(${code}) ${blocks.join("-")}`;
    };

    // Handle save changes
    const handleSave = async () => {
        let valid = true;

        if (!name.trim()) {
            toast.error("Full name is required");
            setNameError("Full name is required");
            valid = false;
        } else {
            setNameError("");
        }

        if (!phone.trim()) {
            toast.error("Phone number is required");
            setPhoneError("Phone number is required");
            valid = false;
        } else {
            setPhoneError("");
        }

        if (!valid) return;

        setLoading(true);

        const {
            data: { user }, error: supabaseError
        } = await supabase.auth.getUser();

        if (!user || supabaseError) {
            toast.error("Failed to fetch user data");
            setLoading(false);
            return;
        }

        const formattedPhone = formatPhoneNumber(localPhone, countryCode);

        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                name: name,
                location: location,
                phone: formattedPhone,
            },
        });

        if (updateError) {
            toast.error("Failed to update profile");
        } else {
            toast.success("Profile updated successfully");
            onProfileUpdate({ name, location, phone: formattedPhone });
            onOpenChange(false);
        }

        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}>
                    <div className="grid gap-3 mt-4">

                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            autoFocus
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    {nameError && (
                        <p className="text-red-500 text-sm mt-1">{nameError}</p>
                    )}
                    <div className="grid gap-3 mt-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} disabled />
                    </div>
                    <div className="grid gap-3 mt-4">
                        <Label htmlFor="location">Location</Label>
                        <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="+62">Indonesia</SelectItem>
                                    <SelectItem value="+60">Malaysia</SelectItem>
                                    <SelectItem value="+65">Singapore</SelectItem>
                                    <SelectItem value="+1">United States</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3 mt-4">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            placeholder="12-3456-7890"
                        />
                    </div>
                    {phoneError && (
                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}