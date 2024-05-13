import React from 'react';
import useEvents from '~/utils/event-store';
import EventDataSource from '~/utils/api/Event';
import EventsList from './EventsList';

function EventPage() {
    const events = useEvents((state) => state.events);
    const setEvents = useEvents((state) => state.setEvents);

    const createNewEvent = () => {
        EventDataSource.createEvent()
            .then((response) => {
                const newEvent = response;
                newEvent && setEvents([
                    ...events,
                    newEvent
                ]);
            });
    }

    const deleteEvent = (id: number) => {
        const newEvents = events.filter((val) => { return val.id !== id; });
        setEvents(newEvents);
    }

    return (
        <>
            <EventsList events={events} deleteEvent={deleteEvent} createNewEvent={createNewEvent}></EventsList>
        </>
    );
}

export default EventPage;