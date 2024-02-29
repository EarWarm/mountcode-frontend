export default [
    {
        path: "/payment/:query",
        name: "payment",
        component: () => import("{modules}/payment/views/Payment.vue"),
        props: true
    }
]
