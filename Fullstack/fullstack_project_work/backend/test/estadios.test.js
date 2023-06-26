const request = require("supertest");
const app = require("../index");

describe("GET /api/estadios/", function () {
  it("Devolveria todos los estadios", async function () {
    const res = await request(app)
      .get("/api/estadios/")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdEstadio: expect.any(Number),
          Nombre: expect.any(String),
          FechaCreacion: expect.any(String)
        }),
      ])
    );
  });
});
describe("GET /api/estadios/:id", function () {
  it("respond with json containing a single estadios", async function () {
    const res = await request(app)
      .get("/api/estadios/9");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEstadio: 9,
        Nombre: expect.any(String),
        FechaCreacion: expect.any(String)
      })
    );
  });
});
const estadioAlta = {
    Nombre: "Monumental",
    FechaCreacion: "1910-05-10",
};
const estadioModificado = {
    IdEstadio: 4,
    Nombre: "Bombonera",
    FechaCreacion: "1910-05-11", 
};

describe("POST /api/estadios", () => {
  it("Deberia devolver el estadio que acabo de crear", async () => {
    const res = await request(app).post("/api/estadios/").send(estadioAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEstadio: expect.any(Number),
        Nombre: expect.any(String),
        FechaCreacion: expect.any(String),
      })
    );
  });
});

//test route/estadios/:id PUT
 describe("PUT /api/estadios/:id", () => {
  it("Deberia devolver el estadio con el id 4 modificado", async () => {
    const res = await request(app).put("/api/estadios/4").send(estadioModificado);
     expect(res.statusCode).toEqual(202);
   });
 });

 // test route/estadios/:id DELETE
describe("DELETE /api/estadios/:id", () => {
  it("Deberia devolver el estadio con el id 5 borrado", async () => {
    const res = await request(app).delete("/api/estadios/5");
    expect(res.statusCode).toEqual(202);

  });
});