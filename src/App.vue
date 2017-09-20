<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
        <li v-if="!user">
          <router-link to="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="ti-user"></i>
              <p>Sign up</p>
          </router-link>
        </li>
        <li v-if="!user">
          <router-link to="sign-in" class="dropdown-toggle" data-toggle="dropdown">
            <i class="ti-user"></i>
            <p>Sign in</p>
          </router-link>
        </li>
        <li v-if="user">
          <a href="#" @click.prevent="logout">
            <i class="ti-user"></i>
            <p>Sign out</p>
          </a>
        </li>
        <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss"></style>
