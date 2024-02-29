// @ts-ignore
import {useAuthStore} from "{modules}/auth/stores/authStore";
// @ts-ignore
import {useUserStore} from "{modules}/user/stores/userStore";

export default {
    async loadUser(): Promise<any> {
        try {
            const {data} = await window.axios.get(window.config.endpoints.api.user.user);

            useUserStore().setUser(data.data);
            useAuthStore().setLogged(true);

        } catch (error) {
            useAuthStore().logout();
        }
    }
}
