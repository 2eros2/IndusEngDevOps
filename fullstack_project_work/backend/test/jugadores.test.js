const request = require("supertest");
const app = require("../index");

describe("GET /api/jugadores/", function () {
  it("Devolveria todos los jugadores", async function () {
    const res = await request(app)
      .get("/api/jugadores/")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdJugador: expect.any(Number),
          Nombre: expect.any(String),
          FechaNac: expect.any(String),
          IDEquipo: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/jugadores/:id", function () {
    it("respond with json containing a single jugadores", async function () {
      const res = await request(app)
        .get("/api/jugadores/2");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdJugador: 2,
          Nombre: expect.any(String),
          FechaNac: expect.any(String),
          IDEquipo: expect.any(Number),
        })
      );
    });
  });
  

//Alta jugador
const jugadorAlta = {
    Nombre: "Gonzalo Montiel",
    FechaNac: "1978-07-02",
    IDEquipo: 9 
  };

  //Modificacion jugador
  const jugadorModificacion = {
    IdJugador: 4,
    Nombre: "Matias Suarez",
    FechaNac: "22-06-1994",
    IDEquipo: 7
    
  };
  

  describe("POST /api/jugadores/", () => {
    it("Deberia devolver el jugador que acabo de crear", async () => {
      const res = await request(app).post("/api/jugadores").send(jugadorAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdJugador: expect.any(Number),
          Nombre: expect.any(String),
          FechaNac: expect.any(String),
          IDEquipo: expect.any(Number)


        })
      );
    });
  });
  

  describe("PUT /api/jugadores/:id", () => {
    it("Deberia devolver el jugador con el id 2 modificado", async () => {
      const res = await request(app).put("/api/jugadores/2").send(jugadorModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  // test route/jugador/:id DELETE
  describe("DELETE /api/jugadores/:id", () => {
    it("Deberia devolver el jugador con el id 5 borrado", async () => {
      const res = await request(app).delete("/api/jugadores/5");
      expect(res.statusCode).toEqual(200);
    });
});
  