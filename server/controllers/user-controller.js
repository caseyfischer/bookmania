import { PrismaClient } from "@prisma/client";
import next from 'express';

const prisma = new PrismaClient();

const getAllUsers = async function(_, response) {
    try {
        const allUsers = await prisma.user.findMany();
        response.status(200).json(allUsers);
    } catch (e) {
        next(e);
    }
};

export { getAllUsers };
