import NextAuth, { NextAuthOptions } from 'next-auth'

/**
 * Proveedor de autenticación para Etsy.
 */
const etsyAuthProvider = {
  id: 'etsy',
  name: 'Etsy',
  type: 'oauth',
  token: 'https://api.etsy.com/v3/public/oauth/token',
  userinfo: {
    url: 'https://openapi.etsy.com/v3/application/users',
    /**
     * Método de solicitud de información de usuario.
     * 
     * @param {Object} context - Contexto de la solicitud.
     * @returns {Promise<Object>} - Promesa que resuelve en la información de usuario.
     */
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
  /**
   * Método para formatear el perfil de usuario.
   * 
   * @param {Object} profile - Perfil de usuario de Etsy.
   * @returns {Object} - Perfil formateado.
   */
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

/**
 * Controlador de NextAuth con el proveedor Etsy.
 */
const handler = NextAuth({
  providers: [etsyAuthProvider],
  callbacks: {
    /**
     * Callback para manejar el token JWT.
     * 
     * @param {Object} params - Parámetros de la callback.
     * @returns {Promise<Object>} - Promesa que resuelve en el token JWT.
     */
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
    /**
     * Callback para manejar la sesión.
     * 
     * @param {Object} params - Parámetros de la callback.
     * @returns {Promise<Object>} - Promesa que resuelve en la sesión.
     */
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
