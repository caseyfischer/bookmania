import express from 'express';
import queries from './queries.js';

const router = express.Router();

router.get('/users', queries.getAllUsers);
// router.get('/users', )

export default router;
