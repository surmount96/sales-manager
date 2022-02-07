export default function admin ({ next, store }){
    
    if(store.state.auth.user.role.name != 'SUPER_ADMIN'){
        return next({
            path: '/unauthorized-url'
        });
    }
    return next()
}