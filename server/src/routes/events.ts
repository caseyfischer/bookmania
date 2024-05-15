import express from 'express';
import { getAllEventsForUser, getEvent, createEvent, deleteEvent, updateEvent } from '~/controllers/event-controller';
import { createDateForEvent, updateDateForEvent } from '~/controllers/event-date-controller';
const router = express.Router();

router.get('/', getAllEventsForUser);
router.post('/', createEvent);
router.delete('/:eventId', deleteEvent);
router.get('/:eventId', getEvent);
router.put('/:eventId', updateEvent)
router.post('/:eventId/dates', createDateForEvent);
router.put('/:eventId/dates/:eventDateId', updateDateForEvent);

export default router;
