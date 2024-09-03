import { Router } from 'express';
import {
  addUser,
  getUser,
  getUsers,
  isAthenticated,
  login,
} from '../controllers/userController';
import auth from '../middleware/authentication';

const router = Router();

router.get('/user-auth', auth, isAthenticated);
router.get('/users', getUsers);
router.post('/users', addUser);
router.get('/user/:id', getUser);
router.post('/users/login', login);

export default router;
