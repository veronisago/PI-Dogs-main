const { Breed, conn } = require('../../src/db.js');

const dog = {
  name: 'Pug',
  height: '2-8',
  weight: 24,
  life_span: '7 years'
};

describe('Dog model', () => {
  beforeEach(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid object', async () => {
        await Breed.create(dog)
        let newDog = await Breed.findOne({ where: { name: dog.name } })
        expect(newDog.name).toEqual(dog.name)
      });
      it('Should work when a name dog is updated', async () => {
        await Breed.create(dog)
        await Breed.update({ name: 'Terry' }, { where: { name: dog.name } })
        let newDog = await Breed.findOne({ where: { name: 'Terry' } })
        expect(newDog.name).toEqual('Terry')
      });
      it('Should work when delete a dog', async () => {
        await Breed.create(dog)
        let newDog = await Breed.findOne({ where: { name: dog.name } })
        expect(newDog.name).toEqual(dog.name)
        await Breed.destroy({ where: { name: dog.name } })
        let removeDog = await Breed.findOne({ where: { name: dog.name } })
        expect(removeDog).toEqual(null)
      })
    });
  });
});
