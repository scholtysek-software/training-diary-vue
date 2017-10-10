<template>
  <div>
    <sweet-modal ref="addSeriesModal" class="create-series-form" title="Add series">
      <form action="#" method="#">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="col-md-12">
                  <label for="form-reps">Reps</label>
                  <input id="form-reps" placeholder="Reps" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('reps') }"
                         v-model="reps" v-validate="'required|numeric|min_value:0'" name="reps">
                  <span v-show="errors.has('reps')" class="text-danger">{{ errors.first('reps') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="col-md-12">
                  <label for="form-weight">Weight</label>
                  <input id="form-weight" placeholder="Weight" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('weight') }"
                         v-model="weight" v-validate="'required|numeric|min_value:0'" name="weight">
                  <span v-show="errors.has('weight')" class="text-danger">{{ errors.first('weight') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sweet-buttons">
          <button class="btn" @click.prevent="closeSeriesModal">Cancel</button>
          <button class="btn btn-fill" @click.prevent="createSeries" :disabled="errors.has('weight') || errors.has('reps') || !weight || !reps">Create</button>
        </div>
      </form>
    </sweet-modal>
    <sweet-modal icon="success" ref="addSeriesSuccess" title="Good job!">
      You successfully created new series!
      <div class="sweet-buttons">
        <button class="btn btn-fill" @click="closeCreateSeriesWizard">Ok</button>
      </div>
    </sweet-modal>
    <!-- Hidden use of computed variable to keep it active -->
    <span style="display: none">{{ isOpenCreateSeriesModal }}</span>
  </div>
</template>
<script>
    import { SweetModal } from 'sweet-modal-vue'

    export default {
      mounted: function () {
        this.$on('sweet-modal-vue-close', () => {
          this.clearFormData()
          this.$store.dispatch('closeCreateSeriesModal')
        })
      },
      props: {
        exercise: {
          type: Object,
          required: true
        }
      },
      components: {
        SweetModal
      },
      data () {
        return {
          weight: '',
          reps: '',
          shouldOpenCreateSeriesModal: false
        }
      },
      computed: {
        isOpenCreateSeriesModal () {
          this.shouldOpenCreateSeriesModal = this.$store.getters.isOpenCreateSeriesModal

          return this.$store.getters.isOpenCreateSeriesModal
        },
        exerciseComputed () {
          return this.exercise
        }
      },
      watch: {
        shouldOpenCreateSeriesModal: function (flag) {
          if (flag) {
            this.$refs.addSeriesModal.open()
          }
        }
      },
      methods: {
        closeSeriesModal () {
          this.$store.commit('CLOSE_CREATE_SERIES_MODAL')
          this.$refs.addSeriesModal.close()
        },
        createSeries () {
          this.$store.dispatch('createSeries', {
            exercise: this.exerciseComputed,
            training: this.$store.getters.trainings[this.$store.getters.trainingToDisplay],
            series: {
              weight: this.weight,
              reps: this.reps
            }
          }).then((training) => {
            this.$refs.addSeriesModal.close()
            this.$refs.addSeriesSuccess.open()

            Promise.resolve()
          })
        },
        closeCreateSeriesWizard () {
          this.$refs.addSeriesSuccess.close()
        },
        clearFormData () {
          this.$validator.reset()
          this.reps = ''
          this.weight = ''
        }
      }
    }
</script>
<style>

  .sweet-modal .sweet-content {
    padding-bottom: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .sweet-buttons {
    border-top: 1px solid #eaeaea;
    margin-top: 24px;
  }

  .sweet-modal .sweet-box-actions .sweet-action-close svg {
    margin-top: -8px !important;
  }

  .sweet-modal .is-error {
    border: 1px solid #B33C12;
  }

  .navbar .btn {
    margin: 0 !important;
  }

  .sweet-modal label {
    margin-top: 5px;
  }

  .create-series-form .row {
    margin-top: 10px;
  }
</style>
