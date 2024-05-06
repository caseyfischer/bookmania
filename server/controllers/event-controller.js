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
        console.log(`received request ${description}`);
        const event = await prisma.event.create({
            data: {
                description,
                createdBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        response.status(200).json(event);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

const deleteEvent = async function({ params }, response) {
    try {
        const { eventId } = params;
        console.log(`deleting event with id ${eventId}`);
        await prisma.event.delete({
            where: {
                id: eventId
            }
        });
        response.status(204).json();
    } catch(e) {
        console.log(e);
        next(e);
    }
}

export { getAllEventsForUser, createEvent, deleteEvent };
