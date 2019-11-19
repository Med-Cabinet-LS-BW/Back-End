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

  describe('find', () => {
    it('returns at most the first 20 strains in the db', async () => {
      let strainsCount;
      strainsCount = await db('strains');
      expect(strainsCount).toHaveLength(0);
      strains.forEach(async s => {
        await Strains.add(s);
      });
      strainsCount = await Strains.find();
      let strainsCountIsLessThanOrEqaul20 = strainsCount.length <= 20 ? true : false;
      expect(strainsCountIsLessThanOrEqaul20).toBe(true);
    });

    it('returns a number of strains equal to the provided limit', async () => {
      let strainsCount;
      let limit = 2;
      strainsCount = await db('strains');
      expect(strainsCount).toHaveLength(0);
      strains.forEach(async s => {
        await Strains.add(s);
      });
      strainsCount = await Strains.find(limit);
      expect(strainsCount).toHaveLength(limit);
    });

    it('returns a list of strains offset according to the provided offset', async () => {
      let strainsCount;
      let offset = 2;
      strainsCount = await db('strains');
      expect(strainsCount).toHaveLength(0);
      strains.forEach(async s => {
        await Strains.add(s);
      });
      strainsCount = await Strains.find(null, offset);
      expect(strainsCount[0].strain).toBe('Slam Donk');
    });

    it('returns a list of strains ordered by strain_id', async () => {
      strains.forEach(async s => await Strains.add(s));
      const addedStrains = await Strains.find();
      const sequential = addedStrains[0].strain_id < addedStrains[1].strain_id;
      expect(sequential).toBe(true);
    })
  });

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
