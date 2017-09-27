<template>
  <div>
    <div class="row trainings-nav">
      <div class="col-md-12">
        <button class="btn btn-fill btn-wd" @click="previousTraining" :disabled="!hasPreviousTraining"><i class="ti-arrow-left"></i></button>
        <button class="btn btn-fill btn-wd pull-right" @click="nextTraining" :disabled="!hasNextTraining"><i class="ti-arrow-right"></i></button>
      </div>
    </div>
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
        return this.trainings[this.$store.getters.trainingToDisplay]
      },
      hasPreviousTraining () {
        return this.trainings[this.$store.getters.trainingToDisplay - 1] !== undefined
      },
      hasNextTraining () {
        return this.trainings[this.$store.getters.trainingToDisplay + 1] !== undefined
      }
    },
    methods: {
      nextTraining () {
        this.$store.commit('NEXT_TRAINING')
      },
      previousTraining () {
        this.$store.commit('PREVIOUS_TRAINING')
      }
    }
  }

</script>
<style>
  .trainings-nav {
    margin-bottom: 20px;
  }
</style>
