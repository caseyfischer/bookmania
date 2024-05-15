import { Event } from '~/utils/api/Event';
import classes from '~/components/EventPage/EventCard.module.scss';
import clsx from 'clsx';
import useEvents from '~/utils/event-store';

type Props = {
    event: Event,
    deleteEvent: (id: number) => void
}

function EventCard({ event }: Props) {
    const selectedEventId = useEvents((state) => state.selectedEventId);
    const setSelectedEvent = useEvents((state) => state.setSelectedEventId);
    const isSelected = selectedEventId && selectedEventId === event.id;

    const classString = clsx([
        classes.card,
        event.description ? classes.green : classes.gray, // replace with real color check
        isSelected ? classes.selectedCard : ''
    ]);

    return (
        <button
            className={classString}
            onClick={() => setSelectedEvent(event.id)}
        >
            {event.description || `Event number ${event.id}`}
        </button>
    );
}

export default EventCard;