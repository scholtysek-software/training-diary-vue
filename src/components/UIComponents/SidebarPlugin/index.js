import Sidebar from './SideBar.vue'
import UserResource from './../../../resources/user'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'overview',
      icon: 'ti-clipboard',
      path: '/overview',
      restrictedForLoggedIn: false
    },
    {
      name: 'Trainings',
      icon: 'ti-view-list-alt',
      path: '/trainings',
      restrictedForLoggedIn: true
    },
    {
      name: 'User profile',
      icon: 'ti-user',
      path: '/user',
      restrictedForLoggedIn: true
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore,
          user: UserResource.getUser()
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
