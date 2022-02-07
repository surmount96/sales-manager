export default function guest ({ next, store }){
    const token = store.state.auth.token;
    const user = store.state.auth.user.role.name;
    // if(token && user == 'ADMIN'){
    //     return next({
    //         path: '/admin/dashboard'
    //     });
    // }

    if(token && (user == 'SUPER_ADMIN' || user == 'HOS' || user == 'ASS' || user == 'TSO' || user == 'RSM' || user == 'SALES_REP')){
        return next({
            path: '/user/dashboard'
        });
    }

    return next()
}
