// @ts-ignore
import {useAuthStore} from "{modules}/auth/stores/authStore";
// @ts-ignore
import {useUserStore} from "{modules}/user/stores/userStore";

export default {
    loadLocalTokens(): void {
        let authStore = useAuthStore();
        if (localStorage.hasOwnProperty("mc_access_token")) {
            let accessToken: string = localStorage.getItem("mc_access_token");
            if (accessToken != null) {
                authStore.loadAccessToken(accessToken);
            }
        }
    },
    login(data): Promise<any> {
        return window.axios
            .post(window.config.endpoints.api.auth.login, data)
            .then(response => {
                if (response.data.status === true) {
                    const authStore = useAuthStore();
                    authStore.setAccessToken(response.data.token);
                    authStore.setLogged(true);
                    useUserStore().setUser(response.data.user);
                    authStore.setModalActive(false);
                }
            });
    },
    register(data): Promise<any> {
        return window.axios
            .post(window.config.endpoints.api.auth.register, data)
            .then(response => {
                if (response.data.status === true) {
                    const authStore = useAuthStore();

                    authStore.setAccessToken(response.data.token);
                    useUserStore().setUser(response.data.user);
                    authStore.setLogged(true);
                    authStore.setModalActive(false);
                }
            });
    },
    logout(): Promise<any> {
        return window.axios
            .post(window.config.endpoints.api.auth.logout)
            .then(response => {
                if (response.data.status === true) {
                    useAuthStore().logout();
                    useUserStore().clearUser();
                }
            });
    },
    forgotPassword(data): Promise<any> {
        return window.axios.post(window.config.endpoints.api.auth.forgotPassword, data);
    },
    resetPassword(data): Promise<any> {
        return window.axios.post(window.config.endpoints.api.auth.resetPassword, data);
    }
}