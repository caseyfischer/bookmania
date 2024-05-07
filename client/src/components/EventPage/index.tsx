import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import EventCard from '~/components/EventPage/EventCard';
import axios from 'axios';
import { Event } from '~/api/Event';

function EventPage() {
    const  [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        axios.get('http://localhost:5173/api/events')
            .then((response) => {
                setEvents(response.data);
            })
    }, []);

    const createNewEvent = () => {
        axios.post('http://localhost:5173/api/events', {
            userId: "6cf7370a-260a-4599-83f9-24df8bbdc771",
            description: "My description here",
        }).then((response) => {
            const newEvent = response.data;
            setEvents([
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
            {events.map((event) => {
                    return <EventCard event={event} key={event.id} deleteEvent={deleteEvent} ></EventCard>
                })}
                <Button variant="outlined"
                    onClick={createNewEvent}
                >
                    New Event
                </Button>
        </>
    );
}

export default EventPage;