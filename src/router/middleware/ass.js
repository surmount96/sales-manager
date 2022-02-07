export default function ass ({ next, store }){

    if(store.state.auth.user.role.name != 'ASS'){
        return next({
            path: '/unauthorized-url'
        });
    }
    
    return next()
}