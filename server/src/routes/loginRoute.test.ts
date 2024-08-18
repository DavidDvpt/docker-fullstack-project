import app from "app";
import dbClient from "lib/prisma/dbClient";
import { prismaMock } from "lib/prisma/singleton";
import request from "supertest";

describe("POST api/v1/login", () => {
  const domain = "/api/v1";
  // Test case for missing login
  it("should return 422 if no login is provided", async () => {
    const response = await request(app)
      .post(domain + "/login")
      .send({ password: "password" });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe("no login found");
  });

  // Test case for missing password
  it("should return 422 if no password is provided", async () => {
    const response = await request(app)
      .post(domain + "/login")
      .send({ login: "user@example.com" });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe("no password found");
  });

  // Test case for successful login
  it("should return 201 if login is successful", async () => {
    (dbClient.user.findUnique as jest.Mock).mockResolvedValue({
      email: "user@example.com",
    });

    const response = await request(app)
      .post(domain + "/login")
      .send({ login: "user@example.com", password: "password" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("it is login");
  });

  // Test case for user not found
  it("should return 401 if no user is found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post(domain + "/login")
      .send({ login: "user@example.com", password: "password" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("user not found");
  });
});
