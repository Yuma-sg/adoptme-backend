import { Router } from 'express';
import { generatePets } from '../mocks/pets.mock.js';

const router = Router();

router.get('/pets', (req, res) => {
  const pets = generatePets(20);
  res.json({
    status: 'success',
    payload: pets
  });
});

export default router;
