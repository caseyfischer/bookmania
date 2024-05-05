import express from 'express';
import { getAllEventsForUser, createEvent } from '../controllers/event-controller.js';
const router = express.Router();

router.get('/', getAllEventsForUser);
router.post('/', createEvent);

export default router;
