import classes from '~/components/EventPage/EventDetail/index.module.scss';
import EventDataSource, { Event } from '~/utils/api/Event';
import useEvents from '~/utils/event-store';
import { useState } from 'react';
import TitleEditBox from './TitleEditBox';
import clsx from 'clsx';
import { IconButton, Menu, MenuItem } from '@mui/material';

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
    const deleteEvent = useEvents((state) => state.deleteEvent);
    const [editBox, setEditBox] = useState<editBoxes>(editBoxes.none);
    const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);
    const moreMenuOpen = !!moreMenuAnchor;

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

    const handleMoreMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setMoreMenuAnchor(e.currentTarget);
    }

    const handleMoreMenuClose = () => {
        setMoreMenuAnchor(null);
    }

    const handleDelete = () => {
        EventDataSource.deleteEvent(event.id)
            .then(() => {
                deleteEvent(event.id);
            });
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

                    {/* TODO move this into a separate component? or clean it up somehow */}
                    <IconButton
                        className={clsx(classes.moreMenuIcon, moreMenuOpen && classes.open)}
                        aria-label="more"
                        id="long-button"
                        aria-controls={moreMenuOpen ? 'long-menu' : undefined}
                        aria-expanded={moreMenuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleMoreMenuClick}
                    ><p>...</p></IconButton>
                    <Menu
                        className={classes.menu}
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={moreMenuAnchor}
                        open={moreMenuOpen}
                        onClose={handleMoreMenuClose}
                    >
                        <MenuItem
                            selected={false} onClick={handleDelete}
                        >
                            Delete Event
                        </MenuItem>
                    </Menu>

                </div>
                {renderEditBox()}
            </div>
        </>
    );
}

export default EventDetail;
