import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Home from 'src/components/Dashboard/Views/Home.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import SignIn from 'src/components/User/SignIn.vue'
import SignUp from 'src/components/User/SignUp.vue'

const routes = [
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Home
      },
      {
        path: 'user',
        name: 'user',
        component: UserProfile
      },
      {
        path: 'trainings',
        name: 'trainings',
        component: TableList
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
