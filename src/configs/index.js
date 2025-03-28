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
        notFound:'*',
        registerOther: '/register_other'
    }
}

export default config;