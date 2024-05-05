import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllUsers = async (_, response) => {
    // pool.query('SELECT * FROM users', (error, results) => {
    //     if (error) {
    //         throw error;
    //     }
    //     response.status(200).json(results.rows);
    // });
    const allUsers = await prisma.user.findMany()
    response.status(200).json(allUsers);
    prisma.$disconnect()
};

const getAllEvents = (request, response) => {
    // pool.query('SELECT * FROM events');
}

const createEvent = (request, response) => {
    const { description } = request.body;
    // pool.query('INSERT INTO events(description, created_by) VALUES ($1, $2)', [description, id], (error, results) => {
    //     if (error) {
    //         throw error;
    //     }
    //     response.status(200);
    // });
}

export default { getAllUsers, getAllEvents };
