import React from 'react';
import useEvents from '~/utils/event-store';
import EventDataSource from '~/utils/api/Event';
import EventsList from './EventsList';
import EventDetailCard from './EventDetail';

function EventPage() {
    const events = useEvents((state) => state.events);
    const setEvents = useEvents((state) => state.setEvents);
    const selectedEventId = useEvents((state) => state.selectedEventId);
    const selectedEvent = events.find((val) => { return val.id === selectedEventId });

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
            {selectedEvent && <EventDetailCard key={selectedEvent.id} event={selectedEvent}></EventDetailCard>}
        </>
    );
}

export default EventPage;