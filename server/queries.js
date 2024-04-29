import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const getAllUsers = (_, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getAllEvents = (request, response) => {
    pool.query('SELECT * FROM events');
}

const createEvent = (request, response) => {
    const { name } = request.body;
    // TODO grab this from the auth context when authentication has been implemented
    const id = "568becb1-5d3e-4aae-9ca7-d6246ef3d77c"; // just hardcoded casey's id for now
    pool.query('INSERT INTO events(name, created_by) VALUES ($1, $2)', [name, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200);
    });
}

export default { getAllUsers, getAllEvents };
