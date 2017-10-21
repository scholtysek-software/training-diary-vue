<template>
  <div class="sign-in">
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
          <router-link to="overview" class="navbar-brand">Training diary</router-link>
        </div>
        <div class="navbar-right-menu">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="sign-up" class="btn-rotate">
                  <p>Sign up</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" @click="hideSidebar">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="#" action="#">
                  <div data-background="color" data-color="blue" class="card">
                    <div class="card-header">
                      <h3 class="card-title">Sign in</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Email</label>
                        <input placeholder="Email" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('email') }"
                               type="email" v-model="email" v-validate="'required|email'" name="email">
                        <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input placeholder="Password"
                               :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('password') }"
                               type="password" v-model="password" name="password" v-validate="'required'">
                        <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd " :disabled="!email || !password || errors.has('email') || errors.has('password')" @click.prevent="login">Sign in</button>
                      <div class="forgot">
                        <a href="#" class="">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
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
      login () {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then((user) => {
          const username = user.email.split('@')[0]

          this.$notifications.notify(
            {
              id: Date.now(),
              message: `Hi, ${username.charAt(0).toUpperCase() + username.slice(1)}`,
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            })
          this.$router.push('/')
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            this.$notifications.notify(
              {
                id: Date.now(),
                message: 'You have entered incorrect email or password',
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
  .sign-in {
    background-image: url("/static/img/StockSnap_37CB0NNMNC.jpg");
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .sign-in .footer .copyright a {
    color: #FFFFFF;
  }

  .full-page .content {
    min-height: calc(100vh - 70px);
  }

  .footer .copyright {
    color: #eeeeee;
  }

  .card-header, .card-content {
    padding: 2px 15px 10px;
  }

  .card label {
    font-weight: 700 !important;
    color: #252422 !important;
    font-size: 15px !important;
  }

  .content {
    padding-top: 20vh;
  }

  .card-footer .forgot {
    padding-bottom: 15px;
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

  .forgot a {
    color: #165265;
  }

  .sign-in .form-control {
    background-color: #F3F2EE;
  }

  .sign-in .is-error {
    border: 1px solid #B33C12;
  }

</style>
