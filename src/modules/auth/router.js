export default [
    {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("{modules}/auth/views/ResetPassword.vue"),
        props: route => ({ token: route.query.token })
    }
]
