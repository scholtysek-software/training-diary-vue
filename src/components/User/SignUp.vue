<template>
  <div class="sign-up">
    <div class="notifications"><span mode="out-in"></span></div>
    <div>
      <nav class="navbar navbar-transparent navbar-absolute">
        <div class="container">
          <notifications>

          </notifications>
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar bar1"></span>
              <span class="icon-bar bar2"></span>
              <span class="icon-bar bar3"></span>
            </button>
          </div>
          <div class="navbar-right-menu">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <router-link to="sign-in" class="btn-rotate">
                  <p>Got account? Sign in here</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="wrapper wrapper-full-page" @click="hideSidebar">
        <div class="full-page">
          <div class="content">
            <div class="container">
              <div class="row">
                <div class="col-md-8 col-md-offset-3">
                  <div class="header-text"><h2>Training diary</h2> <h4>
                    Register for free and start tracking your progress today.</h4>
                    <hr>
                  </div>
                </div>
                <div class="col-md-4 col-md-offset-4">
                  <form method="#" action="#">
                    <div class="form-group">
                      <label>Email</label>
                      <input placeholder="Email"
                             :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('email') }"
                             type="email" v-model="email" v-validate="'required|email'" name="email">
                      <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input placeholder="Password"
                             :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('password') }"
                             type="password" v-model="password" name="password" v-validate="'required|min:6'">
                      <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password')
                        }}</span>
                    </div>
                    <div class="footer text-center">
                      <button type="submit" class="btn btn-fill btn-danger btn-wd"
                              :disabled="!email || !password || errors.has('email') || errors.has('password')" @click.prevent="register"
                      >Create Free Account</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer class="footer footer-transparent">
            <div class="container">
              <div class="copyright">
                &copy;
                {{ year }}
                <a href="https://www.scholtysek.pl">Scholtysek Software</a>, apps for everyone
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        email: '',
        password: '',
        year: new Date().getFullYear()
      }
    },
    methods: {
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
      register () {
        this.$store.dispatch('register', {
          email: this.email,
          password: this.password
        }).then((user) => {
          this.$notifications.notify(
            {
              id: Date.now(),
              message: `Hi, ${user.email}`,
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            })
          this.$router.push('/')
        }).catch(error => {
          if (error.response.data.error) {
            this.$notifications.notify(
              {
                id: Date.now(),
                message: error.response.data.error,
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'danger'
              })
            return
          }

          this.$notifications.notify(
            {
              id: Date.now(),
              message: error.message,
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
            })
        })
      }
    }
  }

</script>
<style>
  .sign-up {
    background-image: url("/static/img/StockSnap_9D4KMEDO84.jpg");
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .full-page .content {
    min-height: calc(100vh - 70px);
  }

  .content {
    padding-top: 20vh;
  }

  @media (max-width: 991px) {
    .wrapper {
      background-color: inherit !important;
    }
  }

  .navbar.navbar-absolute {
    position: absolute;
    width: 100%;
    z-index: 1030;
  }

  .sign-up .form-control {
    background-color: #F3F2EE;
  }

  .sign-up .is-error {
    border: 1px solid #B33C12;
  }

</style>
