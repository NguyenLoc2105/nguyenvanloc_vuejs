import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Admin
    {
      // http://localhost:5173/admin
      path: "/admin",
      name: "admin",

      component: () => import("../views/Admin/HomePage.vue"),
      meta:{requireAuth:true , requireAdmin:true},
      children: [
        {
          // http://localhost:5173/admin/dashboard
          path: "",
          name: "dashboardAdmin",
          component: () => import("../views/Admin/Dashboard.vue"),
        },
        {
          // http://localhost:5173/admin/account
          path: "account",
          name: "account",
          component: () => import("../views/Admin/Account/Account.vue"),
        },
        {
          // http://localhost:5173/admin/product
          path: "product",
          name: "product",
          component: () => import("../views/Admin/Product/Product.vue"),
        },
        {
          // http://localhost:5173/admin/addproduct
          path: "addproduct",
          name: "addproduct",
          component: () => import("../views/Admin/Product/AddProduct.vue"),
        },
        {
          // http://localhost:5173/admin/updateproduct
          path: "updateproduct/:id",
          name: "updateproduct",
          component: () => import("../views/Admin/Product/UpdateProduct.vue"),
        },
        {
          // http://localhost:5173/admin/category
          path: "category",
          name: "category",
          component: () => import("../views/Admin/Category/Category.vue"),
        },
        {
          // http://localhost:5173/admin/order
          path: "order",
          name: "order",
          component: () => import("../views/Admin/Order.vue"),
        },
        {
          // http://localhost:5173/admin/order
          path: "/order-detail/:order_id",
          name: "orderDetailAdmin",
          component: () => import("../views/Admin/OrderDetail.vue"),
        },

        {
          // http://localhost:5173/admin/addcategory
          path: "addcategory",
          name: "addcategory",
          component: () => import("../views/Admin/Category/AddCategory.vue"),
        },
        {
          // http://localhost:5173/admin/updatecategory
          path: "updatecategory/:id",
          name: "updatecategory",
          component: () => import("../views/Admin/Category/UpdateCategory.vue"),
        },
        {
          // http://localhost:5173/admin/addaccount
          path: "addaccount",
          name: "addaccount",
          component: () => import("../views/Admin/Account/AddAccount.vue"),
        },
        {
          // http://localhost:5173/admin/updateaccount
          path: "updateaccount/:id",
          name: "updateaccount",
          component: () => import("../views/Admin/Account/UpdateAccount.vue"),
        },
      ],
    },

    // User

    {
      // http://localhost:5173/users
      path: "/",
      name: "users",

      component: () => import("../views/users/HomePage.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/users/Dashboard.vue"),
        },
        {
          //http://localhost:5173/sanpham/:idCategory
          path: "sanpham/:idCategory",
          name: "sanpham",
          component: () => import("../views/users/Product.vue"),
        },
        {
          // http://localhost:5173/users/detail
          path: "detail/:id",
          name: "detail",
          component: () => import("../views/users/Detail.vue"),
        },
        {
          // http://localhost:5173/users/detail
          path: "/giohang",
          name: "giohang",
          component: () => import("../views/users/Cart.vue"),
        },
        {
          // http://localhost:5173/users/detail
          path: "/thanhtoan",
          name: "thanhtoan",
          component: () => import("../views/users/Checkout.vue"),
        },
        {
          // http://localhost:5173/users/detail
          path: "/donhang",
          name: "donhang",
          component: () => import("../views/users/Oder.vue"),
        },
        {
          // http://localhost:5173/users/detail
          path: "/donhang-chi-tiet/:order_id",
          name: "donhang-chi-tiet",
          component: () => import("../views/users/OderDetail.vue"),
        },
      ],
    },

    {
      path:'/login',
      name:"login",
      component: () => import("../views/Login.vue"),
    },
    
    {
      path:'/register',
      name:"register",
      component: () => import("../views/Register.vue"),
    }
  ],
});
router.beforeEach((to,from,next)=>{

  let userLogin=localStorage.getItem('userLogin')

  if(to.meta.requireAuth && userLogin==null ){
    next({path:"/login"})
  }
  else {
    userLogin=JSON.parse(userLogin)
    if(to.meta.requireAdmin && userLogin.role!='admin'){
      next({path:'/'})
    } else{
    next()
    }
  }
})


export default router;
