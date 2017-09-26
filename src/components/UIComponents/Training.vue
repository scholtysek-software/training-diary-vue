<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{ displayDate(training.date) }}</h4>
        <p class="category">You are awesome</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <tr>
            <th>Exercise</th>
            <th v-for="seriesNo in maxSeries">Series {{seriesNo}}</th>
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
            <td v-for="item in new Array(maxSeries.length - exercise.series.length)"> - </td>
          </tr>
          <tr>
            <td v-for="item in new Array(maxSeries.length + 1)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    props: {
      columns: Array,
      training: Object,
      type: {
        type: String, // striped | hover
        default: 'Striped'
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''

      }
    },
    methods: {
      displayDate (timestamp) {
        return moment(timestamp).format('LL')
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
</style>
