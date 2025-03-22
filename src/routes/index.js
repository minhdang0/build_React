import config from '@/configs';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Product from '@/pages/Product';
import ProductDetail from '@/pages/ProductDetail';
import NoFooterLayout from '@/layouts/NoFooterLayout/NoFooterLayout';
import Introduce from '@/pages/Introduce';
import NoHeaderLayout from '@/layouts/NoHeaderLayout/NoHeaderLayout';
import Login from '@/pages/Login';
import User from '@/pages/User';
import Register from '@/pages/Register';

const routes = [
    {
        path:config.routes.home,
        component: Home
    },
    {
        path:config.routes.login,
        component: Login
    },
    {
        path:config.routes.register,
        component: Register
    },
    {
        path:config.routes.user,
        component:User,
        protected:true
    },
    {
        path:config.routes.products,
        component: Product,
        layout: AdminLayout
    },
    {
        path:config.routes.productDetail,
        component: ProductDetail,
        layout:null
    },
    {
        path:config.routes.contact,
        component:Contact,
        layout:NoFooterLayout
    },
    {
        path: config.routes.introduce,
        component:Introduce,
        layout: NoHeaderLayout
    },
    {
        path:config.routes.notFound,
        component: NotFound
    },    

]

export default routes;