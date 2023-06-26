const request = require("supertest");
const app = require("../index");



describe("GET /api/partidos", function () {
    it("Deberia devolver todos los partidos", async function () {
        const res = await request(app)
        .get("/api/partidos")
        .set("content-type","application/json");
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        IdPartido: expect.any(Number),
                        equipo_local_id: expect.any(Number),
                        equipo_visitante_id: expect.any(Number),
                        fecha: expect.any(String),
                        arbitro: expect.any(String),
                        IdEstadio: expect.any(Number),
                }),
            ])
        );
    });
});


describe("GET /api/partidos/:id", function () {
    it("Devolveria un partido especifico con id 1", async function() {
        const res = await request(app)
        .get("/api/partidos/2");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPartido: 2,
                equipo_local_id: expect.any(Number),
                equipo_visitante_id: expect.any(Number),
                fecha: expect.any(String),
                arbitro: expect.any(String),
                IdEstadio: expect.any(Number),
            })   
        );
    });
});


const partidoAlta = {
    equipo_local_id: 3,
    equipo_visitante_id: 6,
    fecha: "2023-01-01",
    arbitro: (( ) => (Math.random() + 1).toString(36).substring(2))(),
    IdEstadio: 5,
};

const partidoModificacion = {
    equipo_local_id: 2,
    equipo_visitante_id: 4,
    fecha: "2023-02-02",
    arbitro: (( )=> (Math.random() + 1).toString(36).substring(2))(),
    IdEstadio: 4,
} ;

describe("POST /api/partidos",() => {
    it("Deberia devolver el partido que acabo de crear", async () =>{
        const res = await request(app)
        .post("/api/partidos")
        .send(partidoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPartido: expect.any(Number),
                equipo_local_id: expect.any(Number),
                equipo_visitante_id: expect.any(Number),
                fecha: expect.any(String),
                arbitro: expect.any(String),
                IdEstadio: expect.any(Number),
            })
        );

    });
});


describe("PUT /api/partidos/:id", () => {
    it("Deberia devolver el partido con el id 7 modificado", async () =>{
        const res = await request(app)
        .put("/api/partidos/7")
        .send(partidoModificacion);
        expect(res.statusCode).toEqual(200);
    });
});

describe("DELETE /api/partidos/:id", () => {
    it("Deberia devolver el partido con el id 10 borrado", async () =>{
        const res = await request(app).delete("/api/partidos/10");
        expect(res.statusCode).toEqual(200);
    });
});