import { PrismaClient } from "@prisma/client";
import Express from 'express';

const prisma = new PrismaClient();

const createDateForEvent = async function({params, body}: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const eventId = parseInt(params.eventId);
        // TODO how to parse status to the corresponding enum?
        const { date, status } = body;
        const retVal = await prisma.eventDate.create({
            data: {
                date: date,
                status: status,
                eventId: eventId
            }
        });
        response.status(201).json(retVal);
    } catch (e) {
        next(e);
    }
}

const updateDateForEvent = async function({params, body}: Express.Request, response: Express.Response, next: Express.NextFunction) {
    try {
        const eventId = parseInt(params.eventId);
        const { eventDateId } = params;
        // TODO how to parse status to the corresponding enum?
        const { date, status } = body;
        const retVal = await prisma.eventDate.update({
            where: {
                id: eventDateId
            },
            data: {
                date: date,
                status: status
            }
        })
    } catch (e) {
        next(e);
    }
}

export { createDateForEvent, updateDateForEvent };
