import { PrismaClient } from "@prisma/client";
import next from 'express';
import Express from 'express';


const prisma = new PrismaClient();

const getAllEventsForUser = async function({ body }: Express.Request, response: Express.Response) {
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
        response.status(500).send("The server encountered an error.");
        next();
    }
}

const getEvent = async function({ params }: Express.Request, response: Express.Response) {
    try {
        const id = parseInt(params.eventId);
        const event = await prisma.event.findFirst({
            where: {
                id: {
                    equals: id
                }
            },
            include: {
                EventBand: true,
                EventDate: true,
                EventVenue: true,
            }
        });
        response.status(200).json(event);
    } catch (e) {
        console.log(e);
        next();
    }
}

const createEvent = async function({ body }: Express.Request, response: Express.Response) {
    try {
        const { userId, description } = body;
        const event = await prisma.event.create({
            data: {
                description,
                createdBy: {
                    connect: {
                        id: userId
                    }
                },
            },
            include: {
                EventBand: true,
                EventDate: true,
                EventVenue: true,
            }
        });
        response.status(200).json(event);
    } catch (e) {
        console.log(e);
        next();
        response.status(500).json();
    }
}

const deleteEvent = async function({ params }: Express.Request, response: Express.Response) {
    try {
        const eventId = parseInt(params.eventId);
        await prisma.event.delete({
            where: {
                id: eventId
            }
        });
        response.status(204).json();
    } catch(e) {
        console.log(e);
        next();
        response.status(500).json();
    }
}

export { getAllEventsForUser, getEvent, createEvent, deleteEvent };
