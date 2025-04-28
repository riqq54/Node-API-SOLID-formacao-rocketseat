import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', () => {

     beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
                .post('/gyms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Gym 01',
                    description: 'Gym 01 description',
                    phone: '11999999999',
                    latitude: -23.5874194,
                    longitude: -46.6621978
                })
        
        expect(response.statusCode).toEqual(201)
    })
})