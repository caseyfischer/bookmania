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
                    <li key={event.id}>
                        <EventCard
                            event={event}
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