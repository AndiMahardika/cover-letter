import { supabase } from "@/lib/supabaseClient";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // validate input
  if (!name || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long",
    };
  }

  // create user
  try {
    const { data: user, error: errorSingUp } = await supabase.auth.signUp({
      email,
      password,

      options: {
        emailRedirectTo: `/`,
        data: {
          name: name,
        },
      },
    });

    if (errorSingUp) {
      return {
        success: false,
        error: "Something went wrong. Please try again",
      };
    }
    if (
      user?.user &&
      user.user.identities &&
      user.user.identities.length === 0
    ) {
      return {
        success: false,
        error: "Email already exists. Please use a different email.",
      };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user", data: null };
  }
}


export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error)
      return { success: false, error: error.message || "Login failed" };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error logging in:", err);
    return { success: false, error: "Failed to login", data: null };
  }
}