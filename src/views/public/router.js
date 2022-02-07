import guest from '@/router/middleware/guest';

const publicRoutes = [
    {
        path:'/',
        name:'Login',
        component: () => import('./Login'),
        meta:{
            // middleware: [guest]
        },
    },
    {
        path:'/unauthorized-url',
        component: () => import('@/errors/401'),
    },
    {
        path:'/password-reset',
        component: () => import('./ResetPassword'),
        meta:{
            middleware: [guest]
        },
    },
    {
        path:'/forgot-password',
        component: () => import('./ForgotPassword'),
        meta:{
            middleware: [guest]
        },
    },
];

export default publicRoutes;
