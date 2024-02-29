import {defineStore} from 'pinia';

export interface UserProduct {
    id: BigInteger,
    name: String,
    description: String
}

export interface ProductResource {
    uuid: String,
    name: String,
    version: String,
    changelog: String
}

export const useProfileStore = defineStore('profile', {
    state: () => ({
        products: <UserProduct[]> [],
        resources: <ProductResource[]> [],
        archived: false,
    }),
    actions: {
        setProducts(products: UserProduct[]): void {
            this.products = products;
        },
        setResources(resources: ProductResource[]): void {
            this.resources = resources;
        },
        setArchived(archived: Boolean): void {
            this.archived = archived;
        },
        isArchived(): Boolean {
            return this.archived;
        }
    },
    getters: {
        getProducts(): UserProduct[] {
            return this.products;
        },
        getResources(): ProductResource[] {
            return this.resources;
        }
    }
});

