import NextAuth, { NextAuthOptions } from 'next-auth'

const etsyAuthProvider = {
  id: 'etsy',
  name: 'Etsy',
  type: 'oauth',
  token: 'https://api.etsy.com/v3/public/oauth/token',
  userinfo: {
    url: 'https://openapi.etsy.com/v3/application/users',
    async request(context) {
      const response = await context.client.requestResource(
        context.client.issuer.userinfo_endpoint + '/' + context.tokens.access_token.split('.')[0],
        context.tokens,
        {
          headers: {
            'x-api-key': process.env.DATA_API_KEY
          }
        }
      );
      return JSON.parse(response.body);
    }
  },
  clientId: process.env.ETSY_ID,
  clientSecret: process.env.ETSY_SECRET,
  checks: ['pkce', 'state'],
  httpOptions: {
    headers: {
      'x-api-key': process.env.DATA_API_KEY
    }
  },
  authorization: {
    url: 'https://www.etsy.com/oauth/connect',
    params: {
      scope: 'listings_w shops_r shops_w transactions_r profile_r email_r'
    }
  },
  profile(profile) {
    return {
      id: profile.user_id,
      name: profile.first_name,
      email: profile.primary_email,
      image: profile.image_url_75x75
    };
  },
  client: {
    token_endpoint_auth_method: 'client_secret_post'
  }
}


const handler = NextAuth({
  providers: [etsyAuthProvider],
  callbacks: {
    async jwt ({ token, user, account, profile, session, trigger }) {
      if (trigger === 'signIn') {
        token.accessToken = account.access_token
      }
      if (user) {
        token.user = user
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    async session ({ session, user, token, trigger }) {
     if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
