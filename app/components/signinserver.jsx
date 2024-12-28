'use server'

import { signIn } from '@/auth'  // Import your signIn logic

export async function handleGitHubSignIn() {
  await signIn("github", {redirectTo: '/dashboard'})  // Perform GitHub sign-in on the server
}
