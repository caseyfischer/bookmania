import classes from '~/components/EventPage/EventDetail/index.module.scss';
import EventDataSource, { Event } from '~/utils/api/Event';
import useEvents from '~/utils/event-store';
import { useState } from 'react';
import TitleEditBox from './TitleEditBox';
import clsx from 'clsx';

type Props = {
    event: Event
}

enum editBoxes {
    none,
    title,
    dates,
    bands,
    venues
}

function EventDetail({ event }: Props) {
    const updateEvent = useEvents((state) => state.updateEvent);
    const [editBox, setEditBox] = useState<editBoxes>(editBoxes.none);

    const toggleEditBox = (kind: editBoxes) => {
        if (editBox === kind) {
            setEditBox(editBoxes.none);
        } else {
            setEditBox(kind);
        }
    }

    const handleUpdateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        // update client state on every change
        const newDescription = e.target.value;
        const newEvent = {
            ...event,
            description: newDescription
        };
        updateEvent(newEvent);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // persist changes to server when element loses focus
        const newDescription = e.target.value;
        EventDataSource.updateEvent(event.id, newDescription);
    }

    const renderEditBox = () => {
        switch (editBox) {
            case editBoxes.title:
                return <TitleEditBox
                    event={event}
                    handleUpdateDescription={handleUpdateDescription}
                    handleBlur={handleBlur}
                    className={classes.editBox}
                />
                break;
            default:
                return <></>
        }
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.card}>

                    <button onClick={() => toggleEditBox(editBoxes.title)} >
                        <h1 className={
                            clsx(
                                classes.title,
                                classes.editable,
                                editBox === editBoxes.title && classes.editing,
                                event.description ? classes.green : classes.gray
                            )
                        }>
                            {event.description || `Event number ${event.id}`}
                        </h1>
                    </button>

                </div>
                {renderEditBox()}
            </div>
        </>
    );
}

export default EventDetail;
