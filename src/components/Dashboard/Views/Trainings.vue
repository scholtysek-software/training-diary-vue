<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :training="training"></paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/Training.vue'

  export default {
    mounted: function () {
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
      }
    }
  }

</script>
<style>

</style>
