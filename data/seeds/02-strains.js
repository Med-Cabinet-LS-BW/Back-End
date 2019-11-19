const strains = [
  {
    strain_id: 0,
    strain: '100-Og',
    type: 'hybrid',
    rating: 4,
    effects: 'Creative,Energetic,Tingly,Euphoric,Relaxed',
    flavors: 'Earthy,Sweet,Citrus',
    description:
      '$100 OG is a 50/50 hybrid strain that packs a strong punch. The name supposedly refers to both its strength and high price when it first started showing up in Hollywood. As a plant, $100 OG tends to produce large dark green buds with few stems. Users report a strong body effect of an indica for pain relief with the more alert, cerebral feeling thanks to its sativa side.',
  },
  {
    strain_id: 1,
    strain: '98-White-Widow',
    type: 'hybrid',
    rating: 4.7,
    effects: 'Relaxed,Aroused,Creative,Happy,Energetic',
    flavors: 'Flowery,Violet,Diesel',
    description:
      'The ‘98 Aloha White Widow is an especially potent cut of White Widow that has grown in renown alongside Hawaiian legends like Maui Wowie and Kona Gold. This White Widow phenotype reeks of diesel and skunk and has a rich earthy taste with intermittent notes of hash. Its buds are coated in trichomes, giving its dark foliage a lustrous glint to go along with its room-filling odor. This one-hitter-quitter uplifts the mind with mind-bending euphoria that materializes in the body as airy relaxation. ‘98 Aloha White Widow is available from Pua Mana 1st Hawaiian Pakalōlō Seed Bank.  ',
  },
  {
    strain_id: 2,
    strain: '1024',
    type: 'sativa',
    rating: 4.4,
    effects: 'Uplifted,Happy,Relaxed,Energetic,Creative',
    flavors: 'Spicy/Herbal,Sage,Woody',
    description:
      '1024 is a sativa-dominant hybrid bred in Spain by Medical Seeds Co. The breeders claim to guard the secret genetics due to security reasons, but regardless of its genetic heritage, 1024 is a THC powerhouse with a sweet and spicy bouquet. Subtle fruit flavorss mix with an herbal musk to produce uplifting sativa effects. One specific phenotype is noted for having a pungent odor that fills a room, similar to burning incense.',
  },
  {
    strain_id: 3,
    strain: '13-Dawgs',
    type: 'hybrid',
    rating: 4.2,
    effects: 'Tingly,Creative,Hungry,Relaxed,Uplifted',
    flavors: 'Apricot,Citrus,Grapefruit',
    description:
      '13 Dawgs is a hybrid of G13 and Chemdawg genetics bred by Canadian LP Delta 9 BioTech. The two potent strains mix to create a balance between indica and sativa effects. 13 Dawgs has a sweet earthy musk that brings a blend of woody citrus flavorss. The effects of 13 Dawgs induce a happy, relaxed body buzz with a creative and focused mind that counters depression and stimulates the appetite.',
  },
  {
    strain_id: 4,
    strain: '24K-Gold',
    type: 'hybrid',
    rating: 4.6,
    effects: 'Happy,Relaxed,Euphoric,Uplifted,Talkative',
    flavors: 'Citrus,Earthy,Orange',
    description:
      'Also known as Kosher Tangie, 24k Gold is a 60% indica-dominant hybrid that combines the legendary LA strain Kosher Kush with champion sativa Tangie to create something quite unique. Growing tall in its vegetative cycle and very stretchy in flower, this one will need an experienced hand when grown indoors. Most phenotypes will exhibit a sweet orange aroma from the Tangie along with the dark coloration of the Kosher Kush, and will offer a strong citrus flavors when smoked or vaped. THC levels range from 18% to 24%; definitely not for novice users! ',
  },
  {
    strain_id: 5,
    strain: '3-Bears-Og',
    type: 'indica',
    rating: 0,
    effects: 'None',
    flavors: 'None',
    description:
      '3 Bears OG by Mephisto Genetics is an autoflowering cross of Bear OG, Karma’s OG Cut, and Triangle Kush. This indica-dominant strain generates pungent, flavorsful buds in a smaller, more manageable plant size. Mephisto Genetics describes 3 Bears OG as a cornerstone to their artisanal collection, blending the best attributes of the fabled OG Kush with a compact, controllable growth structure. The 3 Bears OG has an approximate 70-day growth cycle and offers effects that stimulate the appetite while leading the body toward sleep.',
  },
  {
    strain_id: 6,
    strain: '3-Kings',
    type: 'hybrid',
    rating: 4.4,
    effects: 'Relaxed,Euphoric,Happy,Uplifted,Hungry',
    flavors: 'Earthy,Sweet,Pungent',
    description:
      'The 3 Kings marijuana strain, a holy trinity of Headband, Sour Diesel, and OG Kush, is a sativa-dominant hybrid and genetic masterpiece. Sour tanginess reek from the sage green buds, and its frosty coat gives you a fair warning of the 3 Kings’ potency. Medical patients will appreciate the versatility of this strain’s medicinal effects as it relieves pain, stress, and nausea without heavy sedation.',
  },
  {
    strain_id: 7,
    strain: '303-Og',
    type: 'indica',
    rating: 4.2,
    effects: 'Relaxed,Happy,Euphoric,Uplifted,Giggly',
    flavors: 'Citrus,Pungent,Earthy',
    description:
      'The indica-dominant 303 OG is a Colorado strain bred by crossing Pre-98 Bubba Kush and Chemdawg. Its parent strains pass on a complex flavors profile of coffee and spice with diesel undertones. Its buzz can be described as social and creative, a dreamy experience perfect for letting off steam at the end of the work day. The happy euphoria induced by 303 OG may help patients treating depression, anxiety, and stress disorders.',
  },
];

exports.seed = function(knex) {
  // Inserts seed entries
  return knex('strains').insert(strains);
};
