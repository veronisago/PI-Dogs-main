/* eslint-disable import/no-extraneous-dependencies */
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');
const request = require("supertest")

jest.setTimeout(100000)

describe('Dogs routes', () => {
  beforeEach(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Breed.sync({ force: true }))

  describe('GET /dogs', () => {
    it('should return 200 when all breeds are requested', () => {
      return request(app)
        .get('/dogs')
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(typeof res.body).toBe('object')
          expect(res.body.length).toBe(172)
        })
    }
    );

    it('Should return 200 when name filter is used', () => {
      return request(app)
        .get('/dogs?name=collie')
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body.length).toBe(2)
        })
    }
    )

    it('Should return 200 when source filter is used with api', () => {
      return request(app)
        .get('/dogs?source=api')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(172)
        })
    })

    it('Should return 200 when source filter is used with data base', () => {
      return request(app)
        .get('/dogs?source=created')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(0)
        })
    })

    it('Should return 200 when temperament filter is used', () => {
      return request(app)
        .get('/dogs?temp=Alert')
        .expect(200)
        .expect((res) => {
          res.body.forEach(e => {
            expect(e.temperament.includes('Alert')).toBe(true)
          })
        })
    })
  });

  describe('POST /dogs', () => {
    it('should return 404 when body is empty', () => {
      return request(app)
        .post('/dogs')
        .send({})
        .expect(404)
    })

  })

});

