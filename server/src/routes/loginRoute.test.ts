import app from "app";
import request from "supertest";

export const loginMock = () => ({
  login: "test@test.com",
  password: "password",
});
describe("POST /api/v1/login", () => {
  it("should return all products", async () => {
    (loginMock as jest.Mock).mockReturnValue("Mocked Hello!");
    return request(app)
      .post("/api/v1/login")
      .send({})
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: "it is login" });
      });
  });
});
