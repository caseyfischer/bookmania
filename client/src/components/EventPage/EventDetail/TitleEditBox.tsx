import { TextField } from '@mui/material'
import React from 'react'
import { Event } from '~/utils/api/Event'
import classes from '~/components/EventPage/EventDetail/index.module.scss'

type Props = {
    event: Event,
    handleUpdateDescription: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    className: string
}

function TitleEditBox({ event, handleUpdateDescription, handleBlur }: Props) {
    return (
        <div
            className={classes.editBox}
        >
            <TextField
                multiline
                placeholder='Description'
                value={event.description}
                onChange={handleUpdateDescription}
                onBlur={handleBlur}
                variant='outlined'
            />
        </div>
    )
}

export default TitleEditBox