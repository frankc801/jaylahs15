"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = (formData.get("password") ?? "").toString();

  if (!password) {
    return { error: "Please enter the password." };
  }

  if (!verifyPassword(password)) {
    return { error: "Incorrect password. Please try again." };
  }

  createSession();
  redirect("/admin");
}

export async function logout() {
  destroySession();
  redirect("/admin");
}
