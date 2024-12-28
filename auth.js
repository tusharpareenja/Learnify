import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

 
export const { handlers, auth, signIn, signOut } = NextAuth({

  
    session: { strategy: "jwt" },
    providers: [GitHub],
});

// Export handlers for Next.js API routes
export const { GET, POST } = handlers;
