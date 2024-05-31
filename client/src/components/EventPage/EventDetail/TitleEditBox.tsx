import { TextField } from '@mui/material'
import React from 'react'
import { Event } from '~/utils/api/Event'
import EditBox from './EditBox'

type Props = {
    event: Event,
    handleUpdateDescription: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    className: string,
    onClose: () => void
}

function TitleEditBox({ event, handleUpdateDescription, handleBlur, onClose }: Props) {
    return (
        <EditBox>
            <TextField
                multiline
                placeholder='Description'
                value={event.description}
                onChange={handleUpdateDescription}
                onBlur={handleBlur}
                variant='outlined'
            />
            <button
                onClick={onClose}
            >
                Close
            </button>
        </EditBox>
    )
}

export default TitleEditBox;