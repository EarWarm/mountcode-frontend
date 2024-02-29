// const backendGateway = 'http://localhost:8080';
// const resourcesGetaway = 'http://localhost:8000';
const backendGateway = 'https://mountcode.spacemount.ru';
const resourcesGetaway = 'https://s3mountcode.spacemount.ru';
const apiGateway = backendGateway + '/api'

const api = {
    products: apiGateway + '/products',
    categories: apiGateway + '/categories',
    productBuy: apiGateway + '/products/{0}',
    user: {
        user: apiGateway + '/user',
        changePassword: apiGateway + '/user/change-password',
        payment: apiGateway + '/user/payment',
        products: apiGateway + '/user/products',
        resources: apiGateway + '/user/products/{0}',
        downloadResource: apiGateway + '/user/products/{0}/{1}',
    },
    auth: {
        refresh: apiGateway + '/refresh',
        login: apiGateway + '/login',
        register: apiGateway + '/register',
        logout: apiGateway + '/logout',
        forgotPassword: apiGateway + '/forgot-password',
        resetPassword: apiGateway + '/reset-password',
    }
}

const resources = {
    productImage: resourcesGetaway + '/products/{0}.png',
}

export const endpoints = {
    apiGateway,
    backendGateway,
    resourcesGetaway,
    api,
    resources
}

