import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Gyms (e2e)', () => {

     beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gyms by title', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
                .post('/gyms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Gym 01',
                    description: 'Gym 01 description',
                    phone: '11999999999',
                    latitude: -23.5874194,
                    longitude: -46.6621978
                })
        
        await request(app.server)
                .post('/gyms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Gym 02',
                    description: 'Gym 02 description',
                    phone: '11999999999',
                    latitude: -23.5874194,
                    longitude: -46.6621978
                })
        
        const response = await request(app.server)
                    .get('/gyms/search')
                    .query({
                        query: '01'
                    })
                    .set('Authorization', `Bearer ${token}`)
                    .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Gym 01'
            })
        ])
    })
})