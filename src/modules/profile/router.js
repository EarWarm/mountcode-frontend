export default [
    {
        path: "/profile",
        name: "profile",
        component: () => import("{modules}/profile/views/Profile.vue"),
        children: [
            {
                path: "products",
                name: "profile-products",
                component: () => import("{modules}/profile/views/children/ProfileProductList.vue"),
            },
            {
                path: "products/:product",
                name: "profile-product-resources",
                component: () => import("{modules}/profile/views/children/ProfileResources.vue"),
            },
            {
                path: "payment",
                name: "profile-payment",
                component: () => import("{modules}/profile/views/children/ProfilePayment.vue"),
            },
            {
                path: "change-password",
                name: "profile-change-password",
                component: () => import("{modules}/profile/views/children/ProfileChangePassword.vue"),
            }
        ]
    }
]