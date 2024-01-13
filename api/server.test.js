const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

// Write your tests here

//// A minimum of 2 tests per API endpoint ////

describe("[GET] /api/jokes", () => {
  let token;
  beforeAll(async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "1234" });

    const loginRes = await request(server)
      .post("/api/auth/login")
      .send({ username: "foo", password: "1234" });

    token = loginRes.body.token;
  });

  test("(1) returns a 200 OK status code", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", token);

    expect(res.status).toBe(200);
  });

  test("(2) returns a JSON object", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", token);

    expect(res.type).toMatch(/json/i);
  });
});

describe("[POST] /api/auth/register", () => {
  test("(3) returns a 201 OK status code", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "1234" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
  test("(4) returns a JSON object", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "1234" })
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });
});

describe("[POST] /api/auth/login", () => {
  test("(5) returns a 200 OK status code", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "1234" });

    return await request(server)
      .post("/api/auth/login")
      .send({ username: "foo", password: "1234" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("(6) Welcome, ${username}", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "1234" });

    return await request(server)
      .post("/api/auth/login")
      .send({ username: "foo", password: "1234" })
      .then((res) => {
        expect(res.body.message).toBe("Welcome, foo");
      });
  });
});
