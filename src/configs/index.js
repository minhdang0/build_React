const config = {
    routes: {
        home:'/',
        //auth
        register:'/register',
        login:'/login',
        user:'/user',
        //product
        products:'/products',
        productDetail:'/products/:id',
        contact:'/contact',
        introduce:'/introduce',
        notFound:'*'
    }
}

export default config;