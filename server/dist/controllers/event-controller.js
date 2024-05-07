"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.createEvent = exports.getAllEventsForUser = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const getAllEventsForUser = function (_a, response_1) {
    return __awaiter(this, arguments, void 0, function* ({ body }, response) {
        try {
            const { id } = body;
            const events = yield prisma.event.findMany({
                where: {
                    id: {
                        equals: id
                    }
                }
            });
            response.status(200).json(events);
        }
        catch (e) {
            response.status(500).send("The server encountered an error.");
            (0, express_1.default)();
        }
    });
};
exports.getAllEventsForUser = getAllEventsForUser;
const getEvent = function (_a, response_1) {
    return __awaiter(this, arguments, void 0, function* ({ params }, response) {
        try {
        }
        catch (e) {
            console.log(e);
            (0, express_1.default)();
        }
    });
};
const createEvent = function (_a, response_1) {
    return __awaiter(this, arguments, void 0, function* ({ body }, response) {
        try {
            const { userId, description } = body;
            const event = yield prisma.event.create({
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
        }
        catch (e) {
            console.log(e);
            (0, express_1.default)();
            response.status(500).json();
        }
    });
};
exports.createEvent = createEvent;
const deleteEvent = function (_a, response_1) {
    return __awaiter(this, arguments, void 0, function* ({ params }, response) {
        try {
            const eventId = parseInt(params.eventId);
            yield prisma.event.delete({
                where: {
                    id: eventId
                }
            });
            response.status(204).json();
        }
        catch (e) {
            console.log(e);
            (0, express_1.default)();
            response.status(500).json();
        }
    });
};
exports.deleteEvent = deleteEvent;
