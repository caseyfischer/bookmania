import DateButton from '~/components/EventPage/DateButton';
import { Button } from '@mui/material';
import axios from 'axios';
import { Event } from '~/api/Event';

type Props = {
    event: Event,
    deleteEvent: (id: number) => void
}

function EventCard({ event, deleteEvent }: Props) {
    const handleDelete = async () => {
        await axios.delete(`http://localhost:5173/api/events/${event.id}`);
        deleteEvent(event.id);
    }

    return (
        <>
            <div>id: {event.id}</div>
            <DateButton></DateButton>
            <Button variant="outlined"
                    onClick={handleDelete}
            >
                X
            </Button>
        </>
      );
}

export default EventCard;