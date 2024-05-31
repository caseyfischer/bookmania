import classes from '~/components/EventPage/EventDetail/EditBox.module.scss'

type Props = {
    children: React.ReactNode
}

function EditBox({ children }: Props) {
    return (
        <div
            className={classes.editBox}
        >
            {children}
        </div>
    )
}

export default EditBox