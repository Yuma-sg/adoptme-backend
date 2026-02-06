import { faker } from '@faker-js/faker';

export const generatePet = () => {
  return {
    name: faker.animal.petName(),
    specie: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: false
  };
};

export const generatePets = (quantity = 10) => {
  const pets = [];
  for (let i = 0; i < quantity; i++) {
    pets.push(generatePet());
  }
  return pets;
};
