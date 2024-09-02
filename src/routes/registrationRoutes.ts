import { Router } from 'express';
import {
  getRegistration,
  addRegistration,
  getRegistrations,
  searchRegistrations,
  deleteRegistration,
} from '../controllers/registrationController';

const router = Router();

router.get('/registration/:id', getRegistration);
router.post('/registrations', addRegistration);
router.get('/registrations', getRegistrations);
router.get('/registrations/search', searchRegistrations);
router.delete('/registration/:id', deleteRegistration);

export default router;
