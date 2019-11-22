const db = require('../data/dbConfig.js');
const Strains = require('../strains/strains.model.js');

const strains = [
  {
    strain_id: 1,
    strain: 'Og Kush',
    type: 'Sativa',
    rating: 4.0,
    description: 'A great weed',
    effects: ['boosting', 'exciting', 'uplifting'],
    flavors: ['spicy', 'earthy', 'full-bodied'],
  },

  {
    strain_id: 2,
    strain: 'purple Haze',
    type: 'indica',
    rating: 4.0,
    description: 'A great weed',
    effects: ['boosting', 'exciting', 'uplifting'],
    flavors: ['spicy', 'earthy', 'full-bodied'],
  },

  {
    strain_id: 3,
    strain: 'Slam Donk',
    type: 'Sativa',
    rating: 4.0,
    description: 'A great weed',
    effects: ['boosting', 'exciting', 'uplifting'],
    flavors: ['spicy', 'earthy', 'full-bodied'],
  },

  {
    strain_id: 4,
    strain: 'Sanic Screamer',
    type: 'Sativa',
    rating: 4.0,
    description: 'A great weed',
    effects: ['boosting', 'exciting', 'uplifting'],
    flavors: ['spicy', 'earthy', 'full-bodied'],
  },
];

describe('strains model', () => {
  beforeEach(async () => {
    await db('strains').truncate();
  });

  // describe('find', () => {

  // })

  describe('add', () => {
    it('adds strains to the database', async () => {
      let strainsCount;
      strainsCount = await db('strains');
      expect(strainsCount).toHaveLength(0);
      strains.forEach(async s => {
        await Strains.add(s);
      });
      strainsCount = await db('strains');
      expect(strainsCount).toHaveLength(strains.length);
    });

    it('adds the provided strain to the database', async () => {
      let strain;
      strain = await Strains.add(strains[0]);
      expect(strain.strain).toBe('Og Kush');
      strain = await Strains.add(strains[1]);
      expect(strain.strain).toBe('purple Haze');
    });
  });
});
