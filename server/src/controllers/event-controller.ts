import { PrismaClient } from "@prisma/client";
import Express from 'express';


const prisma = new PrismaClient();

const getAllEventsForUser = async function (request: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const id = "6cf7370a-260a-4599-83f9-24df8bbdc771"; // replace with real id
        if (!id) {
            throw new Error("id is required");
        }
        const events = await prisma.event.findMany({
            where: {
                userId: {
                    equals: id
                }
            }
        });
        response.status(200).json(events);
    } catch (e) {
        next();
    }
}

const getEvent = async function ({ params }: Express.Request, response: Express.Response, next: Express.NextFunction) {
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

const createEvent = async function ({ body }: Express.Request, response: Express.Response, next: Express.NextFunction) {
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

const updateEvent = async function ({ body, params }: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const { description } = body;
        const id = parseInt(params.eventId);
        if (!id) {
            throw new Error("must provide id");
        }

        const event = await prisma.event.update({
            where: {
                id: id
            },
            data: {
                description: description
            }
        })
        response.status(201).json(event);
    } catch (e) {
        next(e);
    }
}

const deleteEvent = async function ({ params }: Express.Request, response: Express.Response, next: Express.NextFunction) {
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
    } catch (e) {
        next(e);
    }
}

export { getAllEventsForUser, getEvent, createEvent, updateEvent, deleteEvent };
