<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th>Exercise</th>
          <th>Series 1</th>
          <th>Series 2</th>
          <th>Series 3</th>
          <th>Series 4</th>
          <th>Series 5</th>
          <th>Series 6</th>
        </thead>
        <tbody>
          <tr v-for="item in data">
            <td>Exercise name</td>
            <td v-for="column in [0, 1, 2, 3, 4, 5]">
              <i class="material-icons md-12">replay</i> 12
              <svg width="5" height="23">
                <line x1="0" y1="100%" x2="100%" y2="0"/>
              </svg>
              <i class="material-icons md-12">fitness_center</i> 23
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      columns: Array,
      data: Array,
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
    computed: {
      tableClass () {
        return `table-${this.type}`
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
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
