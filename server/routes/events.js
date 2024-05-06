import express from 'express';
import { getAllEventsForUser, createEvent, deleteEvent } from '../controllers/event-controller.js';
const router = express.Router();

router.get('/', getAllEventsForUser);
router.post('/', createEvent);
router.delete('/:eventId', deleteEvent);

export default router;
