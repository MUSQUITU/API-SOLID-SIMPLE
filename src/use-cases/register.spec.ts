import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Lu Css',
      email: 'luacss@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Lu Css',
      email: 'luacss@email.com',
      password: '123456',
    })

    const isPasswordCorrecttlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrecttlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'camis@email.com'

    await sut.execute({
      name: 'camis',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'camis',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
