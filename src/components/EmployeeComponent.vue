<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Employee Dashboard</h1>
    <b-row>
      <b-col>
      <form @submit.prevent="createEmployee">
        <h4>Create Employee</h4>
        <b-form-group>
          <b-form-input type="text" placeholder="First Name..." v-model="model.firstName" required></b-form-input>
        </b-form-group>
         <b-form-group>
          <b-form-input type="text" placeholder="Last Name..." v-model="model.lastName" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" placeholder="Address..." v-model="model.address"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" placeholder="Company..." v-model="model.company" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="number" placeholder="Salary..." v-model="model.salary" required></b-form-input>
        </b-form-group>
        <div>
          <b-button type="submit" variant="success" size="lg">Create</b-button>
        </div>
      </form> 
      </b-col>
      <b-col>
        <h4>Most Recent Employee</h4>
        <b-form-group>
          <b-form-input type="text" readonly v-model="mostRecentEmployee.firstName"></b-form-input>
        </b-form-group>
         <b-form-group>
          <b-form-input type="text" readonly v-model="mostRecentEmployee.lastName"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" readonly v-model="mostRecentEmployee.address"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" readonly v-model="mostRecentEmployee.company"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="number" readonly v-model="mostRecentEmployee.salary"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
        <b-col>
            <p class="error" v-if="error !== null">
                There was a problem:  {{error}}
            </p>
        </b-col>
        <b-col>
            <h4>Cost By Company</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, key) in this.costsByCompany" :key="key">
                      <td>{{key}}</td>
                      <td>{{value.salary}}</td>
                    </tr>
                </tbody>
            </table>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      costsByCompany: {},
      mostRecentEmployee: {},
      model: {},
      error: null
    }
  },
  async created () {
    this.refreshEmployees()
  },
  methods: {
    async refreshEmployees () {
      try {
        var results = await api.getEmployees()
      } catch (err) {
        this.error = err
      }

      if (this.error) {
        return
      }

      this.costsByCompany = {}

      // I would prefer to use an aggregate SUM/GROUP BY on the backing db
      // or sort of map reduce to this manual approach
      results.forEach(e => {
        if (this.costsByCompany[e.company]) {
          var newSalary = this.costsByCompany[e.company]['salary'] += e.salary
          this.costsByCompany[e.company] = {'name': e.company, 'salary': newSalary}
        } else {
          this.costsByCompany[e.company] = {'name': e.company, 'salary': e.salary}
        }
      })

      this.mostRecentEmployee = Object.assign({}, results[results.length - 1])
      this.error = null
    },
    async createEmployee () {
      await api.createEmployee(this.model)
      this.model = {} // reset form
      await this.refreshEmployees()
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>