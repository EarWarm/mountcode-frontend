import {createRouter, createWebHistory} from "vue-router";

// Modules
import indexRouter from "{modules}/index/router";
import profileRouter from "{modules}/profile/router";
import authRouter from "{modules}/auth/router";
import paymentRouter from "{modules}/payment/router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRouter,
        ...indexRouter,
        ...profileRouter,
        ...paymentRouter,
        {
            path: "/:pathMatch(.*)*",
            redirect: {name: "index"},
        }
    ],
});

export {router};