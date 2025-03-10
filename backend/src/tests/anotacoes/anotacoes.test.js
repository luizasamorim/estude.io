const mongoose = require("mongoose");
const Anotacoes = require("../../models/anotacoes");
const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");

const req = request(app);

describe("Anotações Test", () => {
  let token;
  let anotacaoId;
  beforeAll(async () => {
    try {
      await mongoose.connect(String(process.env.MONGO_URI_TEST), {
        useNewUrlParser: true,
      });
      console.log("Conectado ao banco de testes!");
    } catch (err) {
      console.error("Erro ao conectar no banco de testes", err);
    }
    //get user token

    await req.post("/auth/cadastrar").send({
      nome: "Teste 2",
      email: "teste2@email.com",
      senha: "teste",
    });
    await req
      .post("/auth/login")
      .send({
        email: "teste2@email.com",
        senha: "teste",
      })
      .then((res) => {
        token = res.body.token;
      });
  });

  afterAll(async () => {
    await Anotacoes.deleteMany({});
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  test("deve criar anotação", async () => {
    const anotacao = {
      titulo: "Teste 1",
      descricao: "Teste de descrição",
    };

    await req
      .post("/api/anotacoes")
      .send(anotacao)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        anotacaoId = res.body.anotacao._id;
        expect(res.body).toHaveProperty("anotacao");
      });
  });

  test("deve listar apenas a anotação do usuário selecionada", async () => {
    await req
      .get(`/api/anotacoes/${anotacaoId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("anotacao");
      });
  });

  test("deve listar todas as anotações do usuário", async () => {
    await req
      .get("/api/anotacoes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("anotacoes");
      });
  });

  test("deve dar erro 401 quando não passa o token de usuário", async () => {
    await req
      .get("/api/anotacoes")
      .expect(401)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("não deve criar anotação enquanto campos estiver vazios", async () => {
    const anotacao = {
      titulo: "",
      descricao: "Teste de descrição",
    };

    await req
      .post("/api/anotacoes")
      .send(anotacao)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("deve alterar anotação selecionada", async () => {
    const anotacao = {
      titulo: "Teste",
      descricao: "Teste de descrição",
    };

    await req
      .put(`/api/anotacoes/${anotacaoId}`)
      .send(anotacao)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("anotacao");
      });
  });

  test("deve remover anotação selecionada", async () => {
    await req
      .delete(`/api/anotacoes/${anotacaoId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
