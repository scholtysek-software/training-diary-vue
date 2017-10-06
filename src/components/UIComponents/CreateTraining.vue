<template>
  <div>
    <sweet-modal ref="addTrainingModal" class="create-training-form" title="New training">
      <form action="#" method="#">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="col-md-12">
                  <label for="form-date">Date</label>
                  <input id="form-date" placeholder="Date" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('date') }"
                         v-model="date" v-validate="'required|date_format:YYYY-MM-DD'" name="date">
                  <span v-show="errors.has('date')" class="text-danger">{{ errors.first('date') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 form-group">
              <div class="col-md-12">
                <label for="form-exercise">Exercises</label>
                <div class="input-group">
                  <input placeholder="Exercises" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('exercise') }"
                         id="form-exercise" v-model="exercise" v-validate="" name="exercise">
                  <span class="input-group-btn">
                    <button class="btn" @click.prevent="addToExercises"><i class="ti-plus"></i></button>
                  </span>
                </div>
                <span v-show="errors.has('exercise')" class="text-danger">{{ errors.first('exercise') }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 exercises-list">
              <div class="form-group">
                <div class="col-md-12">
                  <ul>
                    <li v-for="e in exercises">{{ e }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sweet-buttons">
          <button class="btn" @click.prevent="closeTrainingModal">Cancel</button>
          <button class="btn btn-fill" @click.prevent="createTraining" :disabled="errors.has('date') || !exercises.length || !date">Create</button>
        </div>
      </form>
    </sweet-modal>
    <sweet-modal icon="success" ref="addTrainingSuccess" title="Good job!">
      You successfully created a new training!
      <div class="sweet-buttons">
        <button class="btn btn-fill" @click="closeCreateTrainingWizard">Ok</button>
      </div>
    </sweet-modal>
    <!-- Hidden use of computed variable to keep it active -->
    <span style="display: none">{{ isOpenCreateTrainingModal }}</span>
  </div>
</template>
<script>
    import { SweetModal } from 'sweet-modal-vue'

    export default {
      mounted: function () {
        this.$on('sweet-modal-vue-close', () => {
          this.clearFormData()
          this.$store.dispatch('closeCreateTrainingModal')
        })
      },
      components: {
        SweetModal
      },
      data () {
        return {
          date: '',
          training: null,
          exercises: [],
          exercise: '',
          shouldOpenCreateTrainingModal: false
        }
      },
      computed: {
        isOpenCreateTrainingModal () {
          this.shouldOpenCreateTrainingModal = this.$store.getters.isOpenCreateTrainingModal

          return this.$store.getters.isOpenCreateTrainingModal
        }
      },
      watch: {
        shouldOpenCreateTrainingModal: function (flag) {
          if (flag) {
            this.$refs.addTrainingModal.open()
          }
        }
      },
      methods: {
        openTrainingModal () {
          this.$refs.addTrainingModal.open()
        },
        closeTrainingModal () {
          this.$store.commit('CLOSE_CREATE_TRAINING_MODAL')
          this.$refs.addTrainingModal.close()
        },
        createTraining () {
          this.$store.dispatch('createTraining', this.date)
            .then((training) => {
              const promises = this.exercises.map((exercise, index) => this.$store.dispatch('addExercise', {
                exercise: {
                  name: exercise,
                  order: index + 1
                },
                training
              }))

              Promise.all(promises)
                .then(() => {
                  this.$refs.addTrainingModal.close()
                  this.$refs.addTrainingSuccess.open()

                  Promise.resolve()
                })
                .catch(err => Promise.reject(err))
            })
        },
        addToExercises () {
          if (!this.exercise) {
            return
          }
          this.exercises.push(this.exercise)
          this.exercise = ''
        },
        closeCreateTrainingWizard () {
          this.$refs.addTrainingSuccess.close()
          this.$store.dispatch('getTrainings')
            .then(() => this.$store.commit('LAST_TRAINING'))
          this.$router.push('/trainings')
        },
        clearFormData () {
          this.$validator.reset()
          this.date = ''
          this.exercise = ''
          this.exercises = []
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

  .exercises-list {
    text-align: left;
  }

  .navbar .btn {
    margin: 0 !important;
  }

  .sweet-modal label {
    margin-top: 5px;
  }

  .create-training-form .row {
    margin-top: 10px;
  }
</style>
