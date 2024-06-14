const request = require("supertest");
const app = require('../app')

const sequelize = require('../models')
const { hashPassword} = require('../helpers/bcrypt/bcrypt')
const { signToken } = require('../helpers/jwt/jwt')
const { queryInterface } = sequelize;

const user = {
    username: 'username',
    email: 'email@mail.com',
    password: '1234567'
}

let access_token;

describe("users", () => {
    describe("POST /login", () => {
        describe("Success", () => {
            test('Login should be return access token', async () => {
                let {body, status } = await request(app).post('/login').send(user);

                expect(status).toBe(200);
                expect
            })
        })
    })
})