import {defineStore} from 'pinia'

export interface User {
    id: BigInteger,
    balance: Number,
    email: String,
    created_at: String,
    updated_at: String
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: <User> {},
    }),
    actions: {
        setUser(user): void {
            this.user = user;
        },
        clearUser(): void {
            this.user = {};
        }
    },
    getters: {
        getUser(state): User {
            return state.user;
        }
    }
})
