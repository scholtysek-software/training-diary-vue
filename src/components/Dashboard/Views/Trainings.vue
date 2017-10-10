<template>
  <div>
    <div class="row trainings-nav">
      <div class="col-md-12">
        <button class="btn btn-fill" @click="firstTraining" :disabled="isFirstTraining">First</button>
        <button class="btn btn-fill" @click="previousTraining" :disabled="!hasPreviousTraining"><i class="ti-arrow-left"></i></button>
        <button class="btn btn-fill pull-right" @click="lastTraining" :disabled="isLastTraining">Last</button>
        <button class="btn btn-fill pull-right" style="margin-right: 5px" @click="nextTraining" :disabled="!hasNextTraining"><i class="ti-arrow-right"></i></button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card" v-if="training">
          <training-table :training="training"></training-table>
        </div>
        <p class="text-info" v-if="!training">No trainings found</p>
      </div>
    </div>
  </div>
</template>
<script>
  import TrainingTable from 'components/UIComponents/Training.vue'

  export default {
    mounted: function () {
      if (!this.$store.getters.token) {
        this.$router.push('/')
        return
      }

      this.$store.dispatch('getTrainings')
    },
    components: {
      TrainingTable
    },
    data () {
      return {}
    },
    computed: {
      trainings () {
        return this.$store.getters.trainings
      },
      training () {
        return this.$store.getters.training
      },
      indexOfTraining () {
        return this.trainings.findIndex(t => t._id === this.training._id)
      },
      hasPreviousTraining () {
        return this.indexOfTraining > 0
      },
      hasNextTraining () {
        return this.indexOfTraining < (this.trainings.length - 1)
      },
      isFirstTraining () {
        return this.indexOfTraining === 0
      },
      isLastTraining () {
        return this.indexOfTraining === (this.trainings.length - 1)
      }
    },
    methods: {
      nextTraining () {
        this.$store.commit('NEXT_TRAINING')
      },
      previousTraining () {
        this.$store.commit('PREVIOUS_TRAINING')
      },
      firstTraining () {
        this.$store.commit('FIRST_TRAINING')
      },
      lastTraining () {
        this.$store.commit('LAST_TRAINING')
      }
    }
  }

</script>
<style>
  .trainings-nav {
    margin-bottom: 20px;
  }
</style>
