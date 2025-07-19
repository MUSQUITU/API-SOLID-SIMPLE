export class ResourceNotFoundError extends Error {
  constructor() {
    super('invalid credentials.')
  }
}
