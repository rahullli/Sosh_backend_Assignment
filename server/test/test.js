const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const blogs = require('../models/blogSchema');

describe('Create a blog', () => {
    let token;
    let userId = '1234567890';

    beforeEach(async () => {
        // generate a JWT token for the user
        token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
    });

    it('should create a new blog post', async (done) => {
        const res = await request(app)
            .post('/blogPost')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Blog Title',
                description: 'Test Blog Description'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Test Blog Title');
        expect(res.body.description).toEqual('Test Blog Description');
        expect(res.body.createdBy).toEqual(userId);
        done();
    });
});
