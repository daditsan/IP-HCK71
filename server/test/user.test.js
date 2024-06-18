const request = require("supertest");
const app = require("../app");

const sequelize = require("../models");
const { hashPassword } = require("../helpers/bcrypt/bcrypt");
const { signToken } = require("../helpers/jwt/jwt");
const { use } = require("../routers");
const { query } = require("express");
const { queryInterface } = sequelize;

const userRegisterInfo = {
  username: "username",
  email: "email@mail.com",
  password: "1234567",
};

const userInfo = {
  email: "email@mail.com",
  password: "1234567",
};

let access_token;

describe("users", () => {
  describe("POST /login", () => {
    describe("Success", () => {
      test("Login should return access token", async () => {
        let { body, status } = await request(app)
          .post("/login")
          .send(userRegisterInfo);

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    });
    describe("Failed", () => {
      test("Login should return error when email is empty", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: "",
          password: "1234567",
        });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email cannot be empty");
      }),
        test("Login should return error when password is empty", async () => {
          let { body, status } = await request(app).post("/login").send({
            email: "email@mail.com",
            password: "",
          });

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password cannot be empty");
        }),
        test("Login should be return error when email is not registered", async () => {
          let { body, status } = await request(app).post("/login").send({
            email: "unregistered@mail.com",
            password: "1234567",
          });

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid login");
        }),
        test("Login should be return error when password is not match", async () => {
          let { body, status } = await request(app).post("/login").send({
            email: "admin@mail.com",
            password: "wrongpassword",
          });

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid login");
        });
    });
  }),
    describe("POST /register", () => {
      describe("Success", () => {
        test("Should add registered new User successfuly", async () => {
          let { body, status } = await request(app)
            .post("/register")
            .set("Authorization", `Bearer ${access_tokenAdmin}`)
            .send(userInfo);

          expect(status).toBe(201);
        });
      });
      describe("Failed", () => {
        test("Register should be return error when Email is not filled", async () => {
          let { body, status } = await request(app)
            .post("/register")
            .set("Authorization", `Bearer ${access_tokenAdmin}`)
            .send({
              username: "newstaff",
              email: "",
              password: "1234567",
            });

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email cannot be empty");
        });
      });
    });
});

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          ...userRegisterInfo,
          password: hashPassword(userRegisterInfo.password),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const user = await sequelize.models.User.findOne({
      where: { email: user },
    });
    access_token = signToken({ email: user.email });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    turncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
