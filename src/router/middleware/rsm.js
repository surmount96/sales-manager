export default function rsm ({ next, store }){

    if(store.state.auth.user.role.name != 'RSM'){
        return next({
            path: '/unauthorized-url'
        });
    }
    
    return next()
}