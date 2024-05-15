import { create } from 'zustand';
import { Event } from '~/utils/api/Event';

type EventState = {
    events: Event[],
    isLoading: boolean,
    selectedEventId: number | undefined,
}

type EventAction = {
    setEvents: (newEvents: Event[]) => void,
    updateEvent: (newEvent: Event) => void,
    setSelectedEventId: (newEvent: number) => void,
}

const useEvents = create<EventState & EventAction>((set) => ({
    isLoading: false,
    events: [],
    setEvents: (newEvents) => set(() => ({ events: newEvents })),
    setSelectedEventId: (newEvent) => set(() => ({ selectedEventId: newEvent })),
    updateEvent: (newEvent) => set((state) => {
        // map through existing events and replace the event whose id matches
        const newEvents = state.events.map((event) => {
            return event.id !== newEvent.id ? event : newEvent;
        });
        return ({ events: newEvents });
    }),
    selectedEventId: undefined,
}))

export default useEvents;
