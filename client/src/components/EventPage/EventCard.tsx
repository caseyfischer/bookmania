import React from 'react';
import DateButton from '~/components/EventPage/DateButton';
import { Button } from '@mui/material';
import axios from 'axios';
import { Event } from '~/api/Event';

function EventCard({ event, deleteEvent }) {
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