import { PrismaClient } from "@prisma/client";
import next from 'express';

const prisma = new PrismaClient();

const getAllEventsForUser = async function({ body }, response) {
    try {
        const { id } = body;
        const events = await prisma.event.findMany({
            where: {
                id: {
                    equals: id
                }
            }
        });
        response.status(200).json(events);
    } catch (e) {
        next(e);
    }
}

const createEvent = async function({ body }, response) {
    try {
        const { userId, description } = body;
        await prisma.event.create({
            data: {
                description,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        response.status(200)
    } catch (e) {
        next(e);
    }
}

export { getAllEventsForUser, createEvent };
