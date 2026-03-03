const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {

    it("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                email: `test${Date.now()}@test.com`,
                password: "123456"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("userId");
    })

    it("Should login a registered user", async () => {

        const email = `login${Date.now()}@test.com`;

        //création d'un utilisateur
        await request(app)
            .post("/api/auth/register")
            .send({
                email,
                password: "123456"
            });

        //test login
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("token");
    });

    it("Should access protected route with valid token", async () => {
        const email = `protected${Date.now()}@test.com`;

        //création d'un utilisateur
        await request(app)
            .post("/api/auth/register")
            .send({
                email,
                password: "123456"
            });

        //login pour récupérer le token
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        const token = loginResponse.body.token;

        //appel route protégée
        const response = await request(app)
            .get("/api/protected")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("user");
    });

    it("Should return 401 for invalid password", async () => {
        const email = `invalid${Date.now()}@test.com`;

        //création utilisateur
        await request(app)
            .post("/api/auth/register")
            .send({
                email,
                password: "123456"
            });

        //test login avec mot de passe invalide
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "mauvais_mot_de_passe"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    it("Should return 401 if no token is provided", async () => {
        const response = await request(app)
            .get("/api/protected");

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    it("Should return 403 for invalid token", async () => {
        const response = await request(app)
            .get("/api/protected")
            .set("Authorization", "Bearer invalid_token");

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    it("Should allow ADMIN to create product", async () => {
        const email = `admin${Date.now()}@test.com`;

        //création admin
        await request(app)
            .post("/api/auth/register")
            .send({
                email,
                password: "123456",
            });

        //Mise a jour rôle ADMIN
        const prisma = require("../src/services/prisma");
        const user = await prisma.user.findUnique({ where: { email } });
        await prisma.user.update({
            where: { id: user.id },
            data: { role: "ADMIN" }
        });

        //login admin
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Figurine test",
                description: "Edition Spéciale",
                price: 100,
                stock: 10,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
    });

    it("Should forbid USER from creating product", async () => {
        const email = `user${Date.now()}@test.com`;

        //création user
        await request(app)
            .post("/api/auth/register")
            .send({
                email,
                password: "123456",
            });

        //login user
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Produit Interdit",
                description: "Test",
                price: 20,
                stock: 5,

            });

        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

    it("Should return products list pubicity", async () => {
        const response = await request(app)
            .get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    const prisma = require("../src/services/prisma");
    afterAll(async () => {
        await prisma.$disconnect();
    });

});