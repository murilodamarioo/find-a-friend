export class InvalidCredentialsError extends Error {
  constructor() {
    super('email/password incorrect.')
  }
}