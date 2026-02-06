import { Router } from 'express';
import { generatePets } from '../mocks/pets.mock.js';
import { generateUsers } from '../mocks/users.mock.js';

import UsersDao from '../dao/Users.dao.js';
import PetsDao from '../dao/Pets.dao.js';

const router = Router();

const usersDao = new UsersDao();
const petsDao = new PetsDao();

/* ----------------------------------
   GET /api/mocks/mockingpets
----------------------------------- */
router.get('/mockingpets', (req, res) => {
  const pets = generatePets(50);
  res.json({ status: 'success', payload: pets });
});

/* ----------------------------------
   GET /api/mocks/mockingusers
----------------------------------- */
router.get('/mockingusers', async (req, res) => {
  const users = await generateUsers(50);
  res.json({ status: 'success', payload: users });
});

/* ----------------------------------
   POST /api/mocks/generateData
----------------------------------- */
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  if (users > 0) {
    const mockUsers = await generateUsers(users);
    await usersDao.save(mockUsers);
  }

  if (pets > 0) {
    const mockPets = generatePets(pets);
    await petsDao.save(mockPets);
  }

  res.json({
    status: 'success',
    message: 'Datos generados e insertados correctamente'
  });
});

export default router;
