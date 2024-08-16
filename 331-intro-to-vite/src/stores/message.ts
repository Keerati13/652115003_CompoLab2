import type { MessagesState } from '@/types'
import { defineStore } from 'pinia'
export const useMessageStore = defineStore('message', {
    state: (): MessagesState => ({
        message: ''
    }),
    actions: {
        updateMessage(message: string): void {
            this.message = message
        },
        resetMessage(): void {
            this.message = ''
        }
    }
})