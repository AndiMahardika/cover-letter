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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditProfileDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    // Get user data when modal is opened
    useEffect(() => {
        if (!open) return;

        const fetchUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();


            if (error || !user) {
                toast.error("Gagal mengambil data user");
                return;
            }

            setName(user.user_metadata.name || "");
            setEmail(user.email || "");
            setPhone(user.user_metadata.phone || "");
        };

        fetchUser();
    }, [open]);

    // Handle save changes
    const handleSave = async () => {
        setLoading(true);

        const {
            data: { user }, error: supabaseError
        } = await supabase.auth.getUser();

        if (!user || supabaseError) {
            toast.error("Gagal mengambil data user");
            setLoading(false);
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                name: name,
                phone: phone,
            },
        });

        setLoading(false);

        if (updateError) {
            toast.error("Failed to update profikle");
        } else {
            toast.success("Profile updated successfully");
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}>
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-3 mt-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} disabled />
                        </div>
                        <div className="grid gap-3 mt-4">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+62..."
                            />
                        </div>
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant={"outline"}>
                                    Cancle
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}