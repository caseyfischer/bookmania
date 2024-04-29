import express from 'express';
import queries from './queries.js';

const router = express.Router();

router.get('/', queries.getAllUsers);

export default router;
