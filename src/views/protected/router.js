import auth from '@/router/middleware/auth'
import admin from '@/router/middleware/admin'
import guard from '@/router/middleware/guard'

const protectedRoute = [
    {
        path: '/admin',
        component: () => import('./admin/Layout.vue'),
        meta: {
            middleware: [auth,admin]
        },
        children:[
            {
                path:'dashboard',
                name:'admin-dashboard',
                component: () => import('./admin/Dashboard'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'agent',
                component: () => import('./admin/Agent'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'target',
                component: () => import('./admin/Target'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'create-target',
                component: () => import('./admin/CreateTarget'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'users',
                component: () => import('./admin/Users'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'region',
                component: () => import('./admin/Region'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'/admin/region/:id',
                component: () => import('./admin/regions/Show'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'/admin/region/:id/territory/:territoryId',
                component: () => import('./admin/regions/Territory'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'/admin/region/:id/user',
                component: () => import('./admin/regions/User'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'territories',
                component: () => import('./admin/Territory'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'budgets',
                component: () => import('./admin/Budget'),
                meta: {
                    middleware: [auth,admin]
                },
            },
            {
                path:'budgets/:id/regions/targets',
                component: () => import('./admin/budget/RegionTarget'),
                meta: {
                    middleware: [auth,admin]
                },
            },
            {
                path:'budgets/:budgetId/regions/:regionId/territories/targets',
                component: () => import('./admin/budget/TerritoryTarget'),
                meta: {
                    middleware: [auth,admin]
                },
            },
            {
                path:'budgets/:budgetId/territories/:territoryId/users/targets',
                component: () => import('./admin/budget/UserTarget'),
                meta: {
                    middleware: [auth,admin]
                },
            },
            {
                path:'budgets/:id',
                component: () => import('./admin/Budget'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'budget-types',
                component: () => import('./admin/BudgetTypes'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'permission',
                component: () => import('./admin/Permission'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'profile',
                component: () => import('./admin/Profile'),
                meta: {
                    middleware: [auth,admin]
                }
            },
            {
                path:'user/:id',
                component: () => import('./admin/UserTarget'),
                meta: {
                    middleware: [auth,admin]
                }
            },
        ]
    },
    {
        path:'/user',
        component: () => import('./pages/Layout'),
        meta: {
            middleware: [auth,guard]
        },
        children:[
            {
                path:'dashboard',
                component: () => import('./pages/Index'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'users',
                component: () => import('./pages/Users'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'user/:id',
                component: () => import('./pages/user/Show'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'regions',
                component: () => import('./pages/Region'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'/user/region/:id',
                component: () => import('./pages/regions/Show'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'/user/region/:id/user',
                component: () => import('./pages/regions/User'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'/user/region/:id/territory/:territoryId',
                component: () => import('./pages/regions/Territory'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'agents',
                component: () => import('./pages/Agents'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'profile',
                component: () => import('./pages/Profile'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'budgets',
                component: () => import('./pages/Budget'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'budgets/:id/regions/targets',
                component: () => import('./pages/budget/RegionTarget'),
                meta: {
                    middleware: [auth,guard]
                },
            },
            {
                path:'budgets/:budgetId/regions/:regionId/territories/targets',
                component: () => import('./pages/budget/TerritoryTarget'),
                meta: {
                    middleware: [auth,guard]
                },
            },
            {
                path:'budgets/:budgetId/territories/:territoryId/users/targets',
                component: () => import('./pages/budget/UserTarget'),
                meta: {
                    middleware: [auth,guard]
                },
            },
            {
                path:'budget-types',
                component: () => import('./pages/BudgetTypes'),
                meta: {
                    middleware: [auth,guard]
                }
            },
            {
                path:'permission',
                component: () => import('./pages/Permission'),
                meta: {
                    middleware: [auth,guard,admin]
                }
            },
            {
                path:'files',
                component: () => import('./pages/Files'),
                meta: {
                    middleware: [auth,guard,admin]
                }
            },
        ]
    },

];

export default protectedRoute;
