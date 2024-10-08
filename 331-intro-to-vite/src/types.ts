export interface Event {
    id: number
    category: string
    title: string
    description: string
    location: string
    date: string
    time: string
    petsAllowed: boolean
    organizer: string
}
export interface Student {
    id: number
    studentId: string
    name: string
}
export interface MessagesState {
    message: String
}

export interface EventState {
    event: Event | null
}