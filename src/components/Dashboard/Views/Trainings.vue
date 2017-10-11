<template>
  <div>
    <div class="row trainings-nav">
      <div class="col-md-4 col-xs-4">
        <button class="btn btn-fill" @click="previousTraining" :disabled="!hasPreviousTraining"><i class="ti-arrow-left"></i></button>
      </div>
      <div class="col-md-4 col-xs-4 text-center">
          <datepicker
            class="form-group"
            input-class="form-control border-input"
            :value="date"
            :disabled="disabledDates"
            v-on:selected="onSelectedDate"
            :format="'MMMM d, yyyy'"
          ></datepicker>
      </div>
      <div class="col-md-4 col-xs-4 text-center">
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
  import Datepicker from 'vuejs-datepicker'

  export default {
    mounted: function () {
      if (!this.$store.getters.token) {
        this.$router.push('/')
        return
      }

      this.$store.dispatch('getTrainings')
    },
    components: {
      TrainingTable,
      Datepicker
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
      lastTrainingIndex () {
        return this.trainings.length - 1
      },
      hasPreviousTraining () {
        return this.indexOfTraining > 0
      },
      hasNextTraining () {
        return this.indexOfTraining < (this.trainings.length - 1)
      },
      date () {
        if (this.training.date) {
          const date = new Date(0)
          date.setUTCSeconds(this.training.date)

          return date
        }

        return new Date()
      },
      disabledDates () {
        if (!this.trainings.length) {
          return {}
        }

        const fromDate = new Date(0)
        fromDate.setUTCSeconds(this.trainings[0].date)

        const toDate = new Date(0)
        toDate.setUTCSeconds(this.trainings[this.lastTrainingIndex].date)

        const ranges = []
        for (let i = this.lastTrainingIndex; i >= 1; i--) {
          const rangeFrom = new Date(0)
          rangeFrom.setUTCSeconds(this.trainings[i].date)

          const rangeTo = new Date(0)
          rangeTo.setUTCSeconds(this.trainings[i - 1].date)

          ranges.push({ from: rangeFrom, to: rangeTo })
        }

        return {
          to: toDate,
          from: fromDate,
          ranges
        }
      }
    },
    methods: {
      nextTraining () {
        this.$store.commit('NEXT_TRAINING')
      },
      previousTraining () {
        this.$store.commit('PREVIOUS_TRAINING')
      },
      onSelectedDate (date) {
        this.$store.dispatch('setTrainingByDate', date.getTime() / 1000)
      }
    }
  }

</script>
<style>
  .trainings-nav {
    margin-bottom: 20px;
  }

  .vdp-datepicker .form-control[readonly] {
    cursor: pointer;
  }
</style>
