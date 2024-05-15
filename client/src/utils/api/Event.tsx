import axios from "axios";

type Event = {
    id: number,
    description: string | undefined,
    // TODO figure out if this type needs to be reworked.
};


class EventDataSource {
    static #PATH = 'http://localhost:5173/api/events';

    static async getAllEvents(): Promise<Event[]> {
        try {
            const response = await axios.get(EventDataSource.#PATH);
            return response.data;
        } catch (e) {
            return [] as Event[];
        }
    }

    static async createEvent(
        userId: string | undefined = "6cf7370a-260a-4599-83f9-24df8bbdc771",
        description: string | undefined = undefined
    ): Promise<Event | undefined> {
        try {
            const response = await axios.post(EventDataSource.#PATH, {
                userId,
                description
            });
            return response.data;
        } catch (e) {
            return undefined;
        }
    }

    static async updateEvent(eventId: number, description: string): Promise<Event | undefined> {
        try {
            const response = await axios.put(`${EventDataSource.#PATH}/${eventId}`, {
                description
            });
            return response.data;
        } catch (e) {
            // gotta be a better way to handle errors here
            return undefined;
        }
    }

    static async deleteEvent(eventId: string): Promise<boolean> {
        try {
            // better way to parameterize this url...?
            const response = await axios.delete(`${EventDataSource.#PATH}/${eventId}`);
            if (response.status === 204) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
}

export type { Event };
export default EventDataSource;
