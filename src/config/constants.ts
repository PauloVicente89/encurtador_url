const ENV_MODE = process.env.NODE_ENV;
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET
const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '3600s'
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET
const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '3600s'
const JWT_PASSWORD_RESET_TOKEN_EXPIRES_IN = process.env.JWT_PASSWORD_RESET_TOKEN_EXPIRES_IN || '1h'
const JWT_CREATE_PASSWORD_TOKEN_EXPIRES_IN = process.env.JWT_CREATE_PASSWORD_TOKEN_EXPIRES_IN || '1h'
const COOKIE_SECRET = process.env.COOKIE_SECRET

if (!ENV_MODE) {
	console.error('Environment variable "NODE_ENV" is required.')
	process.exit(1)
}
if (!JWT_ACCESS_TOKEN_SECRET) {
	console.error('Environment variable "JWT_ACCESS_TOKEN_SECRET" is required.')
	process.exit(1)
}
if (!JWT_REFRESH_TOKEN_SECRET) {
	console.error('Environment variable "JWT_REFRESH_TOKEN_SECRET" is required.')
	process.exit(1)
}
if (!COOKIE_SECRET) {
	console.error('Environment variable "COOKIE_SECRET" is required.')
	process.exit(1)
}

export default {
  isProd: ENV_MODE === 'prod' || 'production' ? true : false,
  jwt: {
		accessTokenSecret: JWT_ACCESS_TOKEN_SECRET,
		accessTokenExpiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
		refreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
		refreshTokenExpiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
		passwordResetTokenExpiresIn: JWT_PASSWORD_RESET_TOKEN_EXPIRES_IN,
		createPasswordTokenExpiresIn: JWT_CREATE_PASSWORD_TOKEN_EXPIRES_IN
	},
  cookie: {
		secret: COOKIE_SECRET
	},
};
