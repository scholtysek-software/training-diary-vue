<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card" v-if="training">
          <paper-table :training="training"></paper-table>
        </div>
        <p class="text-info" v-if="!training">No trainings found</p>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/Training.vue'

  export default {
    mounted: function () {
      if (!this.$store.getters.token) {
        this.$router.push('/')
        return
      }

      this.$store.dispatch('getTrainings')
    },
    components: {
      PaperTable
    },
    data () {
      return {}
    },
    computed: {
      trainings () {
        return this.$store.getters.trainings
      },
      training () {
        if (this.trainings.length) {
          return this.trainings[0]
        }

        return null
      }
    }
  }

</script>
<style>

</style>
