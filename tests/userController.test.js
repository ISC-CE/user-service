const request = require('supertest');
const app = require('../server'); // Adjust the path to where your Express app is exported
const { sequelize } = require('../models/User.model'); // Adjust the path to your Sequelize instance
const User = require('../models/User.model'); // Adjust the path to your User model
const bcrypt = require('bcryptjs');

// Helper to create a user in the database directly
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

describe('User Controller - Create User and Login User', () => {
    // Clear the database before each test
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    describe('POST /users', () => {
        test('should create a new user', async () => {
            const newUser = {
                username: 'testuser',
                password: 'Password123!',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            };

            const response = await request(app)
                .post('/users')
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body.username).toBe(newUser.username);
        });
    });

    describe('POST /users/login', () => {
        test('should login a user and return a JWT token', async () => {
            await createUserInDb('testuser', 'Password123!', 'test@example.com', 'Test', 'User');
            const credentials = {
                username: 'testuser',
                password: 'Password123!'
            };

            const response = await request(app)
                .post('/users/login')
                .send(credentials);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });

    afterAll(async () => {
        await sequelize.sync({ force: true });
    });
});

describe('User Controller - Get User, Update User and Delete User', () => {
    let token;
    let userId;
    // Log in before running the tests and get the token
    beforeAll(async () => {
        const user = await createUserInDb('testuser', 'Password123!', 'test@example.com', 'Test', 'User');
        userId = user.userId;
        token = await loginAndGetToken('testuser', 'Password123!');
    });

    describe('GET /users/:userId', () => {
        test('should retrieve a user by ID with valid token', async () => {
            const response = await request(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.username).toBe('testuser');
        });
    });

    describe('PUT /users/:userId', () => {
        test('should update user details with valid token', async () => {
            const updates = {
                username: 'updatedUser',
                email: 'updated@example.com',
                firstName: 'Updated',
                lastName: 'User',
                isActive: false
            };

            const response = await request(app)
                .put(`/users/${userId}`)
                .send(updates)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User updated successfully');
        });
    });

    describe('DELETE /users/:userId', () => {
        test('should delete a user with valid token', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User deleted successfully');
        });
    });

    afterAll(async () => {
        await sequelize.sync({ force: true });
    });
});