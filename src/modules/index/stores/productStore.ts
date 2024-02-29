import {defineStore} from 'pinia';

export interface Product {
    id: Number,
    name: String,
    category: String,
    price: Number,
    description: String,
    buyable: Boolean
}

export interface ProductCategory {
    id: Number,
    name: String
}

export const useProductStore = defineStore('product', {
    state: () => ({
        products: <Product[]> [],
        categories: <ProductCategory[]> null,
        selectedCategory: <Number> null,
        currentPage: <Number> null,
        nextPage: <Boolean> false,
    }),
    actions: {
        setProducts(products: Product[]): void {
            this.products = products;
        },
        addProducts(products: Product[]): void {
            this.products.push(...products);
        },
        setCategories(categories: ProductCategory[]): void {
            this.categories = categories;
        },
        setCurrentPage(page: Number): void {
            this.currentPage = page;
        },
        setNextPage(nextPage: Boolean): void {
            this.nextPage = nextPage;
        },
        setSelectedCategory(category: Number): void {
            this.selectedCategory = category;
        }
    },
    getters: {
        hasNextPage(): boolean {
            return this.nextPage;
        },
        getProducts(): Product[] {
            return this.products;
        },
        getProductCategories(): ProductCategory[] {
            return this.categories;
        },
        getSelectedCategory(): Number {
            return this.selectedCategory;
        },
        getCurrentPage(): Number {
            return this.currentPage;
        }
    }
});

