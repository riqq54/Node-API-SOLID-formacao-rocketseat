import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gyms (e2e)', () => {

     beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
                .post('/gyms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Near Gym',
                    description: 'Near Gym description',
                    phone: '11999999999',
                    latitude: -23.5668698,
                    longitude: -46.6608874
                })
        
        await request(app.server)
                .post('/gyms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Far Gym',
                    description: 'Far Gym description',
                    phone: '11999999999',
                    latitude: -23.4996429,
                    longitude: -47.4615595
                })
        
        const response = await request(app.server)
                    .get('/gyms/nearby')
                    .query({
                        latitude: -23.5593526,
                        longitude: -46.6608874
                    })
                    .set('Authorization', `Bearer ${token}`)
                    .send()
                    
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Near Gym'
            })
        ])
    })
})