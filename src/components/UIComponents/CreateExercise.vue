<template>
  <div>
    <sweet-modal ref="addExerciseModal" class="create-exercise-form" title="Add exercise">
      <form action="#" method="#">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="col-md-12">
                  <label for="form-exercise">Exercise</label>
                  <input id="form-exercise" placeholder="Exercise" :class="{ 'form-control': true, 'input-no-border': true, 'is-error': errors.has('exercise') }"
                         v-model="exercise" v-validate="'required'" name="exercise">
                  <span v-show="errors.has('exercise')" class="text-danger">{{ errors.first('exercise') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sweet-buttons">
          <button class="btn" @click.prevent="closeExerciseModal">Cancel</button>
          <button class="btn btn-fill" @click.prevent="createExercise" :disabled="errors.has('exercise') || !exercise">Create</button>
        </div>
      </form>
    </sweet-modal>
    <sweet-modal icon="success" ref="addExerciseSuccess" title="Good job!">
      You successfully created new exercise!
      <div class="sweet-buttons">
        <button class="btn btn-fill" @click="closeCreateExerciseWizard">Ok</button>
      </div>
    </sweet-modal>
    <!-- Hidden use of computed variable to keep it active -->
    <span style="display: none">{{ isOpenCreateExerciseModal }}</span>
  </div>
</template>
<script>
    import { SweetModal } from 'sweet-modal-vue'

    export default {
      mounted: function () {
        this.$on('sweet-modal-vue-close', () => {
          this.clearFormData()
          this.$store.dispatch('closeCreateExerciseModal')
        })
      },
      components: {
        SweetModal
      },
      data () {
        return {
          exercise: '',
          shouldOpenCreateExerciseModal: false
        }
      },
      computed: {
        isOpenCreateExerciseModal () {
          this.shouldOpenCreateExerciseModal = this.$store.getters.isOpenCreateExerciseModal

          return this.$store.getters.isOpenCreateExerciseModal
        }
      },
      watch: {
        shouldOpenCreateExerciseModal: function (flag) {
          if (flag) {
            this.$refs.addExerciseModal.open()
          }
        }
      },
      methods: {
        closeExerciseModal () {
          this.$store.commit('CLOSE_CREATE_EXERCISE_MODAL')
          this.$refs.addExerciseModal.close()
        },
        createExercise () {
          const trainingId = this.$store.getters.training._id

          this.$store.dispatch('addExercise', {
            exercise: {
              name: this.exercise,
              order: 1 // @todo: Fix
            },
            training: this.$store.getters.training
          }).then(() => this.$store.dispatch('getTrainings'))
            .then(() => this.$store.dispatch('setTraining', trainingId))
            .then(() => {
              this.$refs.addExerciseModal.close()
              this.$refs.addExerciseSuccess.open()

              Promise.resolve()
            })
        },
        closeCreateExerciseWizard () {
          this.$refs.addExerciseSuccess.close()
        },
        clearFormData () {
          this.$validator.reset()
          this.exercise = ''
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

  .create-exercise-form .row {
    margin-top: 10px;
  }
</style>
