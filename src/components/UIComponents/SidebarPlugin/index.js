import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Trainings',
      icon: 'ti-clipboard',
      path: '/admin/overview'
    },
    {
      name: 'Training details',
      icon: 'ti-view-list-alt',
      path: '/admin/table-list'
    },
    {
      name: 'User profile',
      icon: 'ti-user',
      path: '/admin/stats'
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
          sidebarStore: SidebarStore
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
