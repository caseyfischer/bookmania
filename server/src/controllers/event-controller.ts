import { PrismaClient } from "@prisma/client";
import Express from 'express';


const prisma = new PrismaClient();

const getAllEventsForUser = async function({ body }: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const { id } = body;
        if (!id) {
            throw new Error("id is required");
        }
        const events = await prisma.event.findMany({
            where: {
                id: {
                    equals: id
                }
            }
        });
        response.status(200).json(events);
    } catch (e) {
        next();
    }
}

const getEvent = async function({ params }: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const id = parseInt(params.eventId);
        if (!id) {
            throw new Error("must provide an id");
        }
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
        next(e);
    }
}

const createEvent = async function({ body }: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const { userId, description } = body;
        if (!userId) {
            throw new Error("must provide userId");
        }
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
        next(e);
    }
}

const deleteEvent = async function({ params }: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const eventId = parseInt(params.eventId);
        if (!eventId) {
            throw new Error("must provide eventId");
        }
        await prisma.event.delete({
            where: {
                id: eventId
            }
        });
        response.status(204).json();
    } catch(e) {
        next(e);
    }
}

export { getAllEventsForUser, getEvent, createEvent, deleteEvent };
