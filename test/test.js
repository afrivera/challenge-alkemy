const request  = require('supertest');
const { expect  } = require('chai');

//TODO: for some reason the app doesn't launch 
// const app = require('../src/loaders'); // 
const app = 'http://localhost:5000/api/v1';

let user, password, token, idMovie, idCharacter;

describe('test in Register /auth/register', () => { 
    
    it('should return a message with register success', async()=> {
        const random = Math.random();
        const postUser = {
            email: `${random}@correo.com`,
            password: '12345',
            username: `${random}`
        }
        const { body } = await request(app).post( '/auth/register' )
                                        .set('Accept', 'application/json')
                                        .send(postUser)
                                        .expect('Content-Type', /json/)
                                        .expect(201)
                                        
        expect( body.status).to.be.a('string');
        expect( body.status).to.equal('ok');
        expect( body.data).to.be.a('object');
        expect( body.data).to.have.property('message');
        expect( body.data.message).to.be.a('string');
        expect( body.data.message).to.be.equal('User registered, you can log In to use API');

        user = postUser.email
        password = postUser.password
        
    })
    it('should return a message with register failed', async()=> {
        const random = Math.random();
        const postUser = {
            email: `${random}@correo.com`,
            password: '12345'
        }
        const { body } = await request(app).post( '/auth/register' )
                                        .set('Accept', 'application/json')
                                        .send(postUser)
                                        .expect('Content-Type', /json/)
                                        .expect(400)
        
                                        
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.have.equal('Validations Errors');
        expect( body.error.detail).to.be.a('array');
    })
 })

describe('test in Login /auth/login', () => { 
    
    it('should return a message with login success', async()=> {
        
        const postUser = {
            email: user,
            password
        }
        const { body } = await request(app).post( '/auth/login' )
                                        .set('Accept', 'application/json')
                                        .send(postUser)
                                        .expect('Content-Type', /json/)
                                        .expect(200)

        // console.log( body);                                
        expect( body.status).to.be.a('string');
        expect( body.status).to.equal('ok');
        expect( body.data).to.be.a('object');
        expect( body.data).to.have.property('token');
        expect( body.data).to.have.property('user');
        expect( body.data).to.have.property('role');
        expect( body.data.token).to.be.a('string');

        token = body.data.token
        
    })

    it('should return a message with login failed', async()=> {
        const random = Math.random();
        const postUser = {
            email: `${random}@correo.com`,
            password: '12345'
        }
        const { body } = await request(app).post( '/auth/login' )
                                        .set('Accept', 'application/json')
                                        .send(postUser)
                                        .expect('Content-Type', /json/)
                                        .expect(401)
        
        // console.log(resp.body);                                
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! email or password is incorrect');
    })
 })

describe('GET /movies', function(){ 
    it('should return a list of movies', async()=> {

        const { body } = await request(app)
                            .get('/movies')
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .set('Authorization-Token', token);

        // console.log(resp.body);
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('count');
        expect(body.data).to.have.property('rows');     
        
    });

    it('should received a message with error unauthorized', async()=> {

        const { body } = await request(app)
                                        .get('/movies')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })
 })

describe('POST /movies', function(){ 
    it('should create a new Movie', async()=> {
        const postMovie = {
            title: `Ironman${Math.random()}`,
            creationDate: "1994-01-12 ",
            calification: 4.6,
            gender: "ACtion",
            contentType: "MOVIES",
            image: "image about Ironman"
        }

        const { body } = await request(app)
                            .post('/movies')
                            .set('Accept', 'application/json')
                            .set('Authorization-Token', token)
                            .send( postMovie)
                            .expect('Content-Type', /json/)
                            .expect(201)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('title');
        expect(body.data).to.have.property('image');
        expect(body.data).to.have.property('creationDate');
        expect(body.data).to.have.property('calification');
        expect(body.data).to.have.property('genderId');     
        expect(body.data).to.have.property('contentType');     

        idMovie = body.data.id;
        
    });

    it('should received a message with error unauthorized for create a Movie', async()=> {

        const postMovie = {
            title: `Ironman${Math.random()}`,
            creationDate: "1994-01-12 ",
            calification: 4.6,
            gender: "ACtion",
            contentType: "MOVIES",
            image: "image about Ironman"
        }
        const { body } = await request(app)
                                        .post('/movies')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .send( postMovie )
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error value required for create a Movie', async()=> {

        const postMovie = {
            // title: `Ironman${Math.random()}`,
            creationDate: "1994-01-12 ",
            calification: 4.6,
            gender: "ACtion",
            contentType: "MOVIES",
            image: "image about Ironman"
        }
        const { body } = await request(app)
                                        .post('/movies')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .send( postMovie )
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })

describe('PUT /movies/:id', function(){ 
    it('should edit a Movie', async()=> {
        const postMovie = {
            title: `Ironman${Math.random()} edit`
        }

        const { body } = await request(app)
                            .put(`/movies/${idMovie}`)
                            .set('Accept', 'application/json')
                            .set('Authorization-Token', token)
                            .send( postMovie)
                            .expect('Content-Type', /json/)
                            .expect(200)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('message');
        expect(body.data.message).to.be.a('string');
        expect(body.data.message).to.equal(`movie with ${ idMovie } was update`);
        
    });

    it('should received a message with error unauthorized for edit a Movie', async()=> {

        const postMovie = {
            title: `Ironman${Math.random()}`
        }
        const { body } = await request(app)
                                        .put(`/movies/${idMovie}`)
                                            .set('Accept', 'application/json')
                                            .send( postMovie)
                                            .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error id does not exist', async()=> {

        const postMovie = {
            title: `Ironman${Math.random()}`
        }
        const { body } = await request(app)
                                        .put(`/movies/${Math.random()}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .send( postMovie )
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })

describe('DELETE /movies/:id', function(){ 
    it('should delete a Movie', async()=> {
        
        const { body } = await request(app)
                                        .delete(`/movies/${idMovie}`)
                                        .set('Accept', 'application/json')
                                        .set('Authorization-Token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('message');
        expect(body.data.message).to.be.a('string');
        expect(body.data.message).to.equal(`movie with ${ idMovie } was remove`);
        
    });

    it('should received a message with error unauthorized for delete a Movie', async()=> {

        const { body } = await request(app)
                                        .delete(`/movies/${idMovie}`)
                                            .set('Accept', 'application/json')
                                            .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error id does not exist', async()=> {

        const { body } = await request(app)
                                        .delete(`/movies/${Math.random()}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })

// ############################################# Characters######################3
describe('GET /characters', function(){ 
    it('should return a list of characters', async()=> {

        const { body } = await request(app)
                            .get('/characters')
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .set('Authorization-Token', token);

        // console.log( body);
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body).to.have.property('data');
        expect(body.data).to.be.a('array');     
        
    });

    it('should received a message with error unauthorized', async()=> {

        const { body } = await request(app)
                                        .get('/characters')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })
 })

describe('POST /characters', function(){ 
    it('should create a new Movie', async()=> {
        const postCharacter = {
            name: `Superman${Math.random()}`,
            image: "Superman Image",
            age: 23,
            weight: 60,
            history: "This is a story about Superman"
        }

        const { body } = await request(app)
                            .post('/characters')
                            .set('Accept', 'application/json')
                            .set('Authorization-Token', token)
                            .send( postCharacter)
                            .expect('Content-Type', /json/)
                            .expect(201)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('name');
        expect(body.data).to.have.property('image');
        expect(body.data).to.have.property('age');
        expect(body.data).to.have.property('weight');
        expect(body.data).to.have.property('history');   

        idCharacter = body.data.id;
        
    });

    it('should received a message with error unauthorized for create a Movie', async()=> {

        const postCharacter = {
            name: `Superman${Math.random()}`,
            image: "Superman Image",
            age: 23,
            weight: 60,
            history: "This is a story about Superman"
        }

        const { body } = await request(app)
                                        .post('/characters')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .send( postCharacter )
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error value required for create a Movie', async()=> {

        const postCharacter = {
            name: `Superman${Math.random()}`,
            image: "Superman Image",
            age: 23,
            weight: 60
        }

        const { body } = await request(app)
                                        .post('/characters')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .send( postCharacter )
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })

describe('PUT /characters/:id', function(){ 
    it('should edit a Character', async()=> {
        const postCharacter = {
            name: `Superman${Math.random()} edit`
        }

        const { body } = await request(app)
                            .put(`/characters/${idCharacter}`)
                            .set('Accept', 'application/json')
                            .set('Authorization-Token', token)
                            .send( postCharacter)
                            .expect('Content-Type', /json/)
                            .expect(200)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('message');
        expect(body.data.message).to.be.a('string');
        expect(body.data.message).to.equal(`character with ${ idCharacter } was update`);
        
    });

    it('should received a message with error unauthorized for edit a Character', async()=> {

        const postCharacter = {
            name: `Superman${Math.random()} edit`
        }
        const { body } = await request(app)
                                        .put(`/characters/${idCharacter}`)
                                            .set('Accept', 'application/json')
                                            .send( postCharacter )
                                            .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error id does not exist', async()=> {

        const postCharacter = {
            name: `Superman${Math.random()} edit`
        }
        const { body } = await request(app)
                                        .put(`/characters/${Math.random()}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .send( postCharacter )
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })

describe('DELETE /characters/:id', function(){ 
    it('should delete a Character', async()=> {
        
        const { body } = await request(app)
                                        .delete(`/characters/${idCharacter}`)
                                        .set('Accept', 'application/json')
                                        .set('Authorization-Token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)


        // console.log( body );
        expect(body.status).to.be.a('string');
        expect(body.status).to.equal('ok');
        expect(body.data).to.have.property('message');
        expect(body.data.message).to.be.a('string');
        expect(body.data.message).to.equal(`character with ${ idCharacter } was remove`);
        
    });

    it('should received a message with error unauthorized for delete a Character', async()=> {

        const { body } = await request(app)
                                        .delete(`/characters/${idCharacter}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .expect(401)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(401);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Authentication failed! Token required');

    })

    it('should received a message with error id does not exist', async()=> {

        const { body } = await request(app)
                                        .delete(`/characters/${Math.random()}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .set('Authorization-Token', token)
                                        .expect(400)

        // console.log(body);
        expect( body.error.code).to.be.a('number');
        expect( body.error.code).to.equal(400);
        expect( body.error.message).to.be.a('string');
        expect( body.error.message).to.be.equal('Validations Errors');
        expect( body.error).to.have.property('detail');

    })
 })