<template>
  <div>
    <div class="row" style="margin-top: 20%">
      <div class="col-md-4 col-md-offset-4" style="text-align: center;">
        <img src="static/img/if_push_up_829672.png" alt="main logo">
        <br/>
        <button class="btn btn-lg btn-primary" @click="openTrainingModal()" style="opacity: 1">Create your first training
        </button>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  export default {
    components: {
      StatsCard,
      ChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {}
    },
    methods: {
      openTrainingModal () {
        this.$store.commit('OPEN_CREATE_TRAINING_MODAL')
      }
    }
  }

</script>
<style>

</style>
