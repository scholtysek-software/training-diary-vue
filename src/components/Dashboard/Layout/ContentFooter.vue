<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav class="pull-left">
        <ul>
          <li>
            <router-link :to="{path:'/'}">Home</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright pull-right">
        &copy;
        {{ year }}
        <a href="https://www.scholtysek.pl">Scholtysek Software</a>, apps for everyone
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        year: new Date().getFullYear()
      }
    }
  }

</script>
<style>

</style>
