import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Home from '@/components/Home'
import Modify from '@/components/Modify'
import NewPatient from '@/components/NewPatient'
import NewNurse from '@/components/NewNurse'
import UpdatePatient from '@/components/UpdatePatient'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: 'Search',
      children: [
        {
          path: '/Search',
          name: 'Search',
          component: Search,
        },
        {
          path: '/Modify',
          name: 'Modify',
          component: Modify,
        },
        {
          path: '/NewPatient',
          name: 'NewPatient',
          component: NewPatient,
        },
        {
          path: '/NewNurse',
          name: 'NewNurse',
          component: NewNurse,
        },
        {
          path: '/UpdatePatient',
          name: 'UpdatePatient',
          component: UpdatePatient,
        }
       ]
    },
  ]
});
