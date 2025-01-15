import { AuthOptions, getServerSession } from "next-auth"

const authOptions: AuthOptions =  {
    providers: [
      {
        id: "adfs",
        name: "ADFS",
        type: "oauth",
        issuer: process.env.ADFS_ISSUER,
        clientId: process.env.ADFS_CLIENT_ID,
        clientSecret: process.env.ADFS_CLIENT_SECRET,
        authorization: {
          url: `${process.env.ADFS_ISSUER}/oauth2/authorize/`,
          params: {
            scope: "openid profile email",
          },
        },
        token: {
          url: `${process.env.ADFS_ISSUER}/adfs/oauth2/token/`,
        },
        userinfo: {
          url: `${process.env.ADFS_ISSUER}/userinfo`,
        },
        jwks_endpoint: `${process.env.ADFS_ISSUER}/discovery/keys`, // Optionally for verifying tokens
        checks: ["pkce", "state"], // Recommended for enhanced security
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.unique_name,
            email: profile.email,
            image: null,
          };
        },
      }
    ],
    session: {
      strategy: "jwt"
    },
    
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }) {
          // @ts-expect-error add token to session
        session.accessToken = token.accessToken;
        return session;
      },
    },
  
    // Additional options (optional)
    secret: process.env.NEXTAUTH_SECRET, // Ensure you set this environment variable
  }

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }