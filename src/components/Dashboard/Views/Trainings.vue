<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">

          </paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/Training.vue'
  const tableColumns = ['Exercise', 'Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5', 'Series 6']
  const tableData = [{
    exercise: 'Exercise name',
    'series 1': 'Reps: 23, Load: 12',
    'series 2': 'Reps: 23, Load: 12',
    'series 3': 'Reps: 23, Load: 12',
    'series 4': 'Reps: 23, Load: 12',
    'series 5': 'Reps: 23, Load: 12',
    'series 6': 'Reps: 23, Load: 12'
  }]

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: '2017-01-23',
          subTitle: 'You are awesome!',
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }
  }

</script>
<style>

</style>
