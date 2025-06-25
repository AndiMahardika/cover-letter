import { supabase } from "@/lib/supabaseClient";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long",
    };
  }

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
    }

    // ⬇️ INSERT ke tabel roles di sini
    const userId = user.user?.id;

    if (userId) {
      const { error: roleError } = await supabase
        .from("roles")
        .insert({ user_id: userId, role: "user" })
        .select()
        .single();

      if (roleError) {
        console.error("Error inserting role:", roleError);
        return { success: false, error: "User created, but failed to assign role." };
      }
    }

    return { success: true };
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

    // console.log(data.session)
    
    // await supabase.auth.setSession({
    //   access_token: data.session.access_token,
    //   refresh_token: data.session.refresh_token,
    // });
    const userId = data.user?.id;

    const role = await supabase
      .from("roles")
      .select("role")
      .eq("user_id", userId)
      .single();
    console.log("role", role.data?.role)

    return { success: true, data, role };
  } catch (err) {
    console.error("Error logging in:", err);
    return { success: false, error: "Failed to login", data: null };
  }
}