// @ts-ignore
import {useProfileStore} from "{modules}/profile/stores/profileStore";
// @ts-ignore
import {replaceParams} from "{helpers}/router";

export default {
    changePassword(form: Object): Promise<any> {
        return window.axios.post(window.config.endpoints.api.user.changePassword, form);
    },
    payment(form: Object): Promise<any> {
        return window.axios.post(window.config.endpoints.api.user.payment, form)
            .then(response => {
                if (response.data.status) {
                    window.open(response.data.payment_url, '_blank').focus();
                }
            });
    },
    loadProducts(): Promise<any> {
        return window.axios.get(window.config.endpoints.api.user.products)
            .then(response => {
                useProfileStore().setProducts(response.data.data);
            });
    },
    loadResources(id): Promise<any> {
        return window.axios.get(replaceParams(window.config.endpoints.api.user.resources, id))
            .then(response => {
                useProfileStore().setResources(response.data.resources);
                useProfileStore().setArchived(response.data.archived);
            });
    },
    downloadResource(id: string, uuid: string): Promise<any> {
        return window.axios.get(replaceParams(window.config.endpoints.api.user.downloadResource, id, uuid), {
            responseType: 'arraybuffer'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', uuid + '.jar');
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }
}