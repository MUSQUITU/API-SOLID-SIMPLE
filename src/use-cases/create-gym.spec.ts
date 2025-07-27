import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -0.8426902,
      longitude: -52.5221761,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
