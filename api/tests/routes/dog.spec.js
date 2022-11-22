/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: 2,
  weight: 2,
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Breed.sync({ force: true }))

  describe('GET /dogs', () => {
    it('should return 200 when all breeds are requested', () =>
      agent.get('/dogs')
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.length(172)
        })
    );

    it('Should return 200 when name filter is used', () =>
      agent.get('/dogs?name=collie')
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array')
          expect(res.body).to.have.length(2)

        })
    )

    it('Should return 200 when source filter is used', () =>
      agent.get('/dogs?source=api')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.length(172)
        }),


      agent.get('/dogs?source=created')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.length(0)
        })
    )

    it('Should return 200 when temperament filter is used', () =>
      agent.get('/dogs?temp=Alert')
        .expect(200)
        .expect((res) => {
          res.body.forEach(e => {
            expect(e.temperament.includes('Alert')).to.eql(true)
          })
        })
    )
  });

  describe('POST /dogs', () => {
    it('should return 404 when body is empty', () =>
      agent.post('/dogs')
        .send({})
        .expect(404)
    )

    it('should return 201 when body exists', () =>

      agent.get('/dogs?source=created')
        .expect(res => {
          expect(res.body).to.have.length(0)
        }),

      agent.post('/dogs')
        .send({
          weight: 88,
          height: "44-46",
          name: "collie bruses",
          life_span: "7 years",
        })
        .expect(201),

      agent.get('/dogs?source=created')
        .expect(res => {
          expect(res.body).to.have.length(1)
        }),
    )

  })

});





// .then(() => Breed.create(dog)));