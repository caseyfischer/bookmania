import express from 'express';
import { getAllEventsForUser, getEvent, createEvent, deleteEvent } from '~/controllers/event-controller';
const router = express.Router();

router.get('/', getAllEventsForUser);
router.post('/', createEvent);
router.delete('/:eventId', deleteEvent);
router.get('/:eventId', getEvent);

export default router;
