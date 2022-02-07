export default function guard ({ next, store }){
    let role = store.state.auth.user.role.name;
    if(role !== "SUPER_ADMIN" && role !== "RSM" && role !== "HOS"  && role !== "ASS"  && role !== "TSO"  && role !== "SALES_REP"){
        return next({
            path: '/unauthorized-url'
        });
    }
    
    return next()
}
