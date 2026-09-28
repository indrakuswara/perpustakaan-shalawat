"use server";

import { redirect } from "next/navigation";
import { authenticate } from "@/lib/credentials";
import { createSession, destroySession } from "@/lib/auth";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const admin = await authenticate(email, password);
  if (!admin) {
    redirect("/admin/login?error=1");
  }

  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
