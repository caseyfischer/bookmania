import express from 'express';
import users from '~/routes/users';
import events from '~/routes/events';

const router = express.Router();

router.use('/users/', users);
router.use('/events/', events);

export default router;
