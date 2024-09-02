import { Router } from 'express';
import {
  getRegistration,
  addRegistration,
  getRegistrations,
  searchRegistrations,
} from '../controllers/registrationController';

const router = Router();

router.get('/registration/:id', getRegistration);
router.post('/registrations', addRegistration);
router.get('/registrations', getRegistrations);
router.get('/registrations/search', searchRegistrations);

export default router;
