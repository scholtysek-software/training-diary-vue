<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{ displayDate(training.date) }}</h4>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <tr>
            <th></th>
            <th v-for="seriesNo in maxSeries">Series {{seriesNo}}</th>
            <th><!-- Actions header --></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exercise in training.exercises">
            <td>{{ exercise.name }}</td>
            <td v-for="series in exercise.series">
              <i class="material-icons md-12" title="Reps">replay</i>
              <span title="Reps">{{series.repetition}}</span>
              <svg width="5" height="23">
                <line x1="0" y1="100%" x2="100%" y2="0"></line>
              </svg>
              <i class="material-icons md-12" title="Weight">fitness_center</i>
              <span title="Weight">{{series.load}}</span>
            </td>
            <td>
              <a href="#" @click.prevent="openSeriesModal(exercise)">
                Add series
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <create-series :exercise="exercise"></create-series>
  </div>
</template>
<script>
  import moment from 'moment'
  import CreateSeries from './CreateSeries.vue'

  export default {
    components: {
      CreateSeries
    },
    data () {
      return {
        exercise: {}
      }
    },
    props: {
      training: Object,
      type: {
        type: String, // striped | hover
        default: 'Striped'
      }
    },
    methods: {
      displayDate (timestamp) {
        return moment.unix(timestamp).format('LL')
      },
      openSeriesModal (exercise) {
        this.exercise = exercise
        this.$store.commit('OPEN_CREATE_SERIES_MODAL')
      }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      },
      maxSeries () {
        const exercisesLength = this.training.exercises.map(ex => ex.series.length)
        const max = Math.max(...exercisesLength)
        const maxSeries = []

        for (let i = 1; i <= max; i += 1) {
          maxSeries.push(i)
        }

        return maxSeries
      }
    }
  }

</script>
<style>

  .md-12 {
    font-size: 12px;
  }

  svg {
    top: 0;
    left: 0;
    margin-bottom: -8px;
  }

  line {
    opacity: 0.7;
    stroke: #777;
    stroke-width: 2px;
  }

  tbody tr {
    border-top: 1px solid #CCC5B9;
  }
</style>
