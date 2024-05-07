import { PrismaClient } from "@prisma/client";
import next from 'express';
import Express from 'express';

const prisma = new PrismaClient();

const getAllUsers = async function(_: Express.Request, response: Express.Response) {
    try {
        const allUsers = await prisma.user.findMany();
        response.status(200).json(allUsers);
    } catch (e) {
        next();
    }
};

export { getAllUsers };
