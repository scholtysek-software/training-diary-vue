<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!user">
            <router-link to="sign-up" class="btn-rotate">
              <p>
                Sign up
              </p>
            </router-link>
            </li>
          <li class="open" v-if="!user">
            <router-link to="sign-in" class="btn-rotate">
              <p>
                Sign in
              </p>
            </router-link>
          </li>
          <li v-if="user">
            <a href="#" @click.prevent="openTrainingModal">
              <i class="ti-plus"></i>
              <p>New training</p>
            </a>
          </li>
          <drop-down :title="username" icon="ti-user" v-if="user">
            <li><a href="#" @click.prevent="logout">Logout</a></li>
          </drop-down>
        </ul>
      </div>
    </div>
    <create-training></create-training>
  </nav>
</template>
<script>
  import CreateTraining from './../../UIComponents/CreateTraining.vue'

  export default {
    components: {
      CreateTraining
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      user () {
        return this.$store.getters.user
      },
      username () {
        const username = this.user.email.split('@')

        return username[0]
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      },
      openTrainingModal () {
        this.$store.commit('OPEN_CREATE_TRAINING_MODAL')
      }
    }
  }

</script>
<style>
  .dropdown-toggle {
    cursor: pointer;
    text-transform: capitalize;
  }
</style>
