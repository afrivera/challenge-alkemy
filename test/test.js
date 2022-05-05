const request  = require('supertest');
const { expect,  } = require('chai');

// const app = require('../src/loaders');
const app = 'http://localhost:5000/api/v1';


describe('get a list of movies /movies', function(){ 
    // this.timeout(40000);
    it('debe retornar lista de peliculas', async()=> {

        const resp = await request(app)
                            .get('/movies')
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .set('Authorization-Token', 'token');
        console.log(resp.body);
       
        // request(app)
        // .get("/api/v1/movies")
        //         .expect("Content-Type", /json/)
        //         .set("Accept", "application/json")
                // .end((err, resp)=> {
                //     if(err) return done(err);
                //     console.log(resp);
                //     done();
                // })
                // .then( res => console.log(res.body))
                // // .timeout(10000)
                // .expect(200, done());

        // done()
    })
 })