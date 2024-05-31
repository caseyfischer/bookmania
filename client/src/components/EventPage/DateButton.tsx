import classes from '~/components/EventPage/DateButton.module.scss';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateButton() {
    return (
        <>
            <div
                className={classes.box}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={dayjs('2024-05-19')}
                    />
                </LocalizationProvider>
            </div>
        </>
    )
}

export default DateButton;