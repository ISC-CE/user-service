const request = require('supertest');
const app = require('../server'); // Adjust the path to where your Express app is exported
const UserRole = require('../models/UserRole.model');
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const createUserInDb = async (username, password, email, firstName, lastName) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return User.create({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        createdDate: new Date(),
        isActive: true
    });
};

const loginAndGetToken = async (username, password) => {
    const response = await request(app)
        .post('/users/login')
        .send({ username, password });
    return response.body.token; // assuming the token is returned in response.body.token
};

describe('UserRole Controller', () => {
    let token;
    let userId;

    // Create a user and log in before running the tests to get the token and userId
    beforeAll(async () => {
        const user = await createUserInDb('testuser', 'Password123!', 'test@example.com', 'Test', 'User');
        userId = user.userId;
        token = await loginAndGetToken('testuser', 'Password123!');
    });

    // Clear the database after all tests have run
    afterAll(async () => {
        await UserRole.sync({ force: true });// Ensure you close the Sequelize connection after tests
    });

    describe('GET /users/:userId/roles', () => {
        test('should retrieve roles for a user with valid token', async () => {
            // Create role in DB for testing if needed
            const userRole = await UserRole.create({ userId, roleName: 'Buyer' });

            const response = await request(app)
                .get(`/users/${userId}/roles`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        roleName: userRole.roleName,
                    }),
                ])
            );
        });
    });

    describe('POST /users/:userId/roles', () => {
        test('should add a role to a user with valid token', async () => {
            const newRole = {
                roleName: 'Seller'
            };

            const response = await request(app)
                .post(`/users/${userId}/roles`)
                .send(newRole)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('roleName', newRole.roleName);
        });
    });

    describe('DELETE /users/:userId/roles/:roleId', () => {
        test('should delete a role from a user with valid token', async () => {
            // Create role in DB for testing
            const userRole = await UserRole.create({ userId, roleName: 'RoleToDelete' });

            const response = await request(app)
                .delete(`/users/${userId}/roles/${userRole.roleId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(204);
        });
    });
});
