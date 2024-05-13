import '~/App.scss';
import '~/components/EventPage/DateButton.module.scss';
import EventPage from '~/components/EventPage';
import useEvents from '~/utils/event-store';
import EventDataSource from './utils/api/Event';

function App() {
    const setEvents = useEvents((state) => state.setEvents);
    EventDataSource.getAllEvents()
        .then((results) => {
            setEvents(results);
        });

    return (
        <>
            <EventPage></EventPage>
        </>
    );
}

export default App;
