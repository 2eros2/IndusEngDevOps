const request = require("supertest");
const app = require("../index");

describe("GET /api/equipos/", function () {
  it("Devolveria todos los equipos", async function () {
    const res = await request(app)
      .get("/api/equipos/")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdEquipo: expect.any(Number),
          Nombre: expect.any(String),
          FechaFun: expect.any(String)
        }),
      ])
    );
  });
});
describe("GET /api/equipos/:id", function () {
  it("respond with json containing a single equipos", async function () {
    const res = await request(app)
      .get("/api/equipos/9");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEquipo: 9,
        Nombre: expect.any(String),
        FechaFun: expect.any(String)
      })
    );
  });
});
const equipoAlta = {
  Nombre: "CA Institut",  
  FechaFun: "1910-05-10",
  
};
const equipoModificado = {
  IdEquipo: 4,
  Nombre: "CA san juan",
  FechaFun: "1910-04-10",
};

describe("POST /api/equipos", () => {
  it("Deberia devolver el equipo que acabo de crear", async () => {
    const res = await request(app).post("/api/equipos/").send(equipoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEquipo: expect.any(Number),
        Nombre: expect.any(String),
        FechaFun: expect.any(String),

      })
    );
  });
});

//test route/equipos/:id PUT
 describe("PUT /api/equipos/:id", () => {
  it("Deberia devolver el equipo con el id 3 modificado", async () => {
    const res = await request(app).put("/api/equipos/4").send(equipoModificado);
     expect(res.statusCode).toEqual(200);
   });
 });

 // test route/articulos/:id DELETE
describe("DELETE /api/equipos/:id", () => {
  it("Deberia devolver el articulo con el id 5 borrado", async () => {
    const res = await request(app).delete("/api/equipos/5");
    expect(res.statusCode).toEqual(200);

  });
});


