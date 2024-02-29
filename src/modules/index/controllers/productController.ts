// @ts-ignore
import {useProductStore} from "{modules}/index/stores/productStore";
// @ts-ignore
import {replaceParams} from "{helpers}/router";
import {useUserStore} from "../../user/stores/userStore";

export default {
    loadCategories(): Promise<any> {
        return window.axios
            .get(window.config.endpoints.api.categories)
            .then(response => {
                useProductStore().setCategories(response.data.data);
            });
    },
    loadProducts(): Promise<any> {
        let productStore = useProductStore();

        let data = {};
        if (productStore.getSelectedCategory != null) {
            // @ts-ignore
            data.category_id = productStore.getSelectedCategory;
        }

        if (productStore.getSelectedCategory != null) {
            // @ts-ignore
            data.page = productStore.getCurrentPage;
        }

        return window.axios
            .get(window.config.endpoints.api.products, {params: data})
            .then(response => {
                if (response.data.data.length > 0) {
                    productStore.addProducts(response.data.data);
                }
                productStore.setCurrentPage(response.data.meta.current_page);
                productStore.setNextPage(response.data.meta.last_page > response.data.meta.current_page);
            });
    },
    buyProduct(product: Number): Promise<any> {
        return window.axios
            .post(replaceParams(window.config.endpoints.api.productBuy, product))
            .then(response => {
                if (response.data.status) {
                    useUserStore().setUser(response.data.user);
                }
            });
    }
}