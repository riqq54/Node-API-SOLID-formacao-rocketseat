import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsUseCase } from "./search-gyms"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Featch Nearby Gyms Use Case', () => {

    beforeEach(async ()=> {
        gymsRepository =  new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -23.5668698,
            longitude: -46.6608874
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -23.4996429,
            longitude: -47.4615595
        })

        const { gyms } = await sut.execute({
            userLatitude: -23.5593526,
            userLongitude: -46.6608874
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym'})
        ])
    })

})