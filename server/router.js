import express from 'express';
import users from './routes/users.js';
import events from './routes/events.js';

const router = express.Router();

router.use('/users/', users);
router.use('/events/', events);

export default router;
