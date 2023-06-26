const request = require("supertest");
const app = require("../index");

describe("GET /api/goles/", function () {
  it("Devolveria todos los goles", async function () {
    const res = await request(app)
      .get("/api/goles/")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdGol: expect.any(Number),
          IdJugador: expect.any(Number),
          MinutoGol: expect.any(Number),
          FechaGol: expect.any(String),
          clima: expect.any(String)
        }),
      ])
    );
  });
});
describe("GET /api/goles/:id", function () {
  it("respond with json containing a single goles", async function () {
    const res = await request(app)
      .get("/api/goles/9");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdGol: 9,
        IdJugador: expect.any(Number),
        MinutoGol: expect.any(Number),
        FechaGol: expect.any(String),
        clima: expect.any(String)
      })
    );
  });
});
const golAlta = {
    IdJugador: 1,
    MinutoGol: 23,  
    FechaGol: "1910-05-10",
    clima: "Soleado"
  
};
const golModificado = {
  IdGol: 4,
  IdJugador: 1,
  MinutoGol: 24,  
  FechaGol: "1910-05-11",
  clima: "Soleado"
};

describe("POST /api/goles", () => {
  it("Deberia devolver el gol que acabo de crear", async () => {
    const res = await request(app).post("/api/goles/").send(golAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdGol: expect.any(Number),
        IdJugador: expect.any(Number),
        MinutoGol: expect.any(Number),
        FechaGol: expect.any(String),
        clima: expect.any(String)
      })
    );
  });
});

//test route/goles/:id PUT
 describe("PUT /api/goles/:id", () => {
  it("Deberia devolver el gol con el id 4 modificado", async () => {
    const res = await request(app).put("/api/goles/4").send(golModificado);
     expect(res.statusCode).toEqual(202);
   });
 });

 // test route/goles/:id DELETE
describe("DELETE /api/goles/:id", () => {
  it("Deberia devolver el gol con el id 5 borrado", async () => {
    const res = await request(app).delete("/api/goles/5");
    expect(res.statusCode).toEqual(202);

  });
});
