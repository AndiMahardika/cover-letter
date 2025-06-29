"use server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getAllUsers(){
  const { data: { users }, error } = await supabaseAdmin().auth.admin.listUsers();
  if (error) {
    // console.error("Error fetching users:", error);
    return [];
  }
  return users || [];
}