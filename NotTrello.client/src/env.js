export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'sprintr-user.us.auth0.com'
export const clientId = 'pwfiMIJslkgu1IQJXg8FgC5kwxcZrcZQ'
export const audience = 'https://sprintr-user.us.auth0.com/api/v2/'
