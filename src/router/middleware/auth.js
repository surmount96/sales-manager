export default function auth ({ next, store }){

    if(store.state.auth.token === null){
        return window.location.href = '/';
    }

    return next()
}