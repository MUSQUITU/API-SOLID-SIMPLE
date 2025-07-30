import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -0.8426902,
      longitude: -52.5221761,
    })

    await gymsRepository.create({
      title: 'TS Gym',
      description: null,
      phone: null,
      latitude: -0.8426902,
      longitude: -52.5221761,
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TS Gym ${i}`,
        description: null,
        phone: null,
        latitude: -0.8426902,
        longitude: -52.5221761,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TS Gym 21' }),
      expect.objectContaining({ title: 'TS Gym 22' }),
    ])
  })
})
