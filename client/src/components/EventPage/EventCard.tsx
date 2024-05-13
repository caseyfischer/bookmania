import { Event } from '~/utils/api/Event';
import classes from '~/components/EventPage/EventCard.module.scss';
import clsx from 'clsx';
import useEvents from '~/utils/event-store';

type Props = {
    event: Event,
    deleteEvent: (id: number) => void
}

function EventCard({ event }: Props) {
    const selectedEvent = useEvents((state) => state.selectedEvent);
    const setSelectedEvent = useEvents((state) => state.setSelectedEvent);
    const isSelected = selectedEvent && selectedEvent.id === event.id;

    const classString = clsx([
        classes.card,
        event.id > 20 ? classes.green : classes.gray, // replace with real color check
        isSelected ? classes.selectedCard : ''
    ]);

    return (
        <button
            className={classString}
            onClick={() => setSelectedEvent(event)}
        >
            {event.description || "fake description longer text"}
        </button>
    );
}

export default EventCard;