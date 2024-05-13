import { create } from 'zustand';
import { Event } from '~/utils/api/Event';

type EventState = {
    events: Event[],
    isLoading: boolean,
    selectedEvent: Event | undefined,
}

type EventAction = {
    setEvents: (newEvents: Event[]) => void,
    setSelectedEvent: (newEvent: Event) => void,
}

const useEvents = create<EventState & EventAction>((set) => ({
    isLoading: false,
    events: [],
    setEvents: (newEvents) => set(() => ({events: newEvents})),
    setSelectedEvent: (newEvent) => set(() => ({selectedEvent: newEvent})),
    selectedEvent: undefined,
}))

export default useEvents;
