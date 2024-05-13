import React from 'react';
import { Button } from '@mui/material';
import { Event } from '~/utils/api/Event';
import EventCard from './EventCard';
import classes from '~/components/EventPage/EventsList.module.scss';

type Props = {
    events: Event[],
    deleteEvent: (id: number) => void,
    createNewEvent: () => void
}

function EventsList({ events, deleteEvent, createNewEvent }: Props) {
    return (
        <ul className={classes.eventsList}>
            {events.map((event) => {
                return (
                    <li>
                        <EventCard
                            event={event}
                            key={event.id}
                            deleteEvent={deleteEvent}
                        />
                    </li>
                )
            })}
            <Button variant="outlined"
                onClick={createNewEvent}
            >
                New Event
            </Button>
        </ul>
    )
}

export default EventsList