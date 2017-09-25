<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
        <li v-if="!user">
          <router-link to="sign-up" class="dropdown-toggle" data-toggle="dropdown">
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
            <div class="user">
              <div class="photo logo-img">
                <img class="avatar" src="static/img/faces/face-2.jpg">
              </div>
              <p>{{ user.email }}</p>
              <a href="#" @click.prevent="logout">
                <p><span class="sidebar-letter-icon">SO</span> Sign out</p>
              </a>
            </div>

        </li>
        <li v-if="user">

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

<style>
  .photo {
    width: 34px;
    height: 34px;
    overflow: hidden;
    float: left;
    margin-right: 11px;
    z-index: 5;
    border-radius: 50%;
  }

  .photo img {
    width: 100%;
  }

  .user p {
    opacity: 1;
    line-height: 22px;
    display: block;
    position: relative;
    text-transform: none !important;
    color: #BDBDB7;
    font-weight: 200 !important;
  }

  .user a :hover {
    color: #FFF;
  }

  .sidebar-letter-icon {
    margin-left: -8px;
    margin-right: 10px;
  }
</style>
<div class="user">
  <div class="photo"><img src="static/img/faces/face-2.jpg"></div>
  <div class="info">
    <a data-toggle="collapse" href="javascript:void(0)">
      <span>Chet Faker<b class="caret"></b></span>
    </a>
    <div class="clearfix"></div>
    <div>
      <ul class="nav" style="" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="">
        <li><a href="javascript:void(0)">
          <span class="sidebar-mini">Mp</span>
          <span
          class="sidebar-normal">My Profile</span></a></li>
        <!--<li><a href="javascript:void(0)"><span class="sidebar-mini">Ep</span> <span-->
          <!--class="sidebar-normal">Edit Profile</span></a></li>-->
        <!--<li><a href="javascript:void(0)"><span class="sidebar-mini">S</span> <span-->
          <!--class="sidebar-normal">Settings</span></a></li>-->
      </ul>
    </div>
  </div>
</div>
