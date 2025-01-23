import { getUserPermissions } from '@/db/users.db';
import { AuthOptions, getServerSession } from 'next-auth';
import { generateToken } from './jwt';

const authOptions: AuthOptions = {
  providers: [
    {
      id: 'adfs',
      name: 'ADFS',
      type: 'oauth',
      issuer: process.env.ADFS_ISSUER,
      clientId: process.env.ADFS_CLIENT_ID,
      clientSecret: process.env.ADFS_CLIENT_SECRET,
      authorization: {
        url: `${process.env.ADFS_ISSUER}/oauth2/authorize/`,
        params: {
          scope: 'openid profile email',
        },
      },
      token: {
        url: `${process.env.ADFS_ISSUER}/adfs/oauth2/token/`,
      },
      userinfo: {
        url: `${process.env.ADFS_ISSUER}/userinfo`,
      },
      jwks_endpoint: `${process.env.ADFS_ISSUER}/discovery/keys`, // Optionally for verifying tokens
      checks: ['pkce', 'state'], // Recommended for enhanced security
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.unique_name,
          email: profile.email,
          image: null,
        };
      },
    },
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      // AD account check
      if (!user.email) {
        throw new Error('Authentication Failed: No Email Found');
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Persist email across token refreshes
      if (account && user.email) {
        token.adfsToken = account.access_token;
        try {
          // Fetch permissions by email
          const permissions = await getUserPermissions(user.email);
          // Generate custom token with claims
          const customToken = generateToken({ email: user.email, permissions });
          // Update session with token and permissions
          token.accessToken = customToken;
        } catch (error) {
          console.error('Token Generation Error:', error);
          throw new Error('Failed to generate token');
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.adfsToken = token.adfsToken as string;
      return session;
    },
  },

  // Additional options (optional)
  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this environment variable
};

// Extended type definitions
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: null;
      permissions: string[];
    };
    accessToken: string;
    adfsToken: string;
  }
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
