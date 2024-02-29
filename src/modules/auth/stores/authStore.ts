import {defineStore} from 'pinia';
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: <string> null,
        logged: <boolean> false,
        modalActive: <boolean> false
    }),
    actions: {
        isLogged(): boolean {
            return this.logged;
        },
        setLogged(logged: boolean): void {
            this.logged = logged;
            if (this.logged) {
                window.emitter.emit('user.logged');
            }
        },
        setAccessToken(token: string): void {
            localStorage.setItem('mc_access_token', token);
            this.loadAccessToken(token);
        },
        clearAccessToken() {
            this.accessToken = null;
            localStorage.removeItem('mc_access_token');
        },
        loadAccessToken(token: string): void {
            this.accessToken = token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        },
        logout(): void {
            this.clearAccessToken();
            this.logged = false;
            window.emitter.emit('user.logout');
        },
        setModalActive(active: boolean): void {
            this.modalActive = active;
        },
        isModalActive(): boolean {
            return this.modalActive;
        }
    },
    getters: {
        getAccessToken(state): string {
            return state.accessToken;
        }
    }
});

