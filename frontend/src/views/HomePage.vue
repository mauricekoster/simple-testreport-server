<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, watch } from 'vue'

const applications = ref();
const application = ref();

const components = ref();
const component = ref();

const versions = ref();
const version = ref();

const overview = ref();

const reportsUrl = `${import.meta.env.VITE_API_URL}/reports`;

onMounted(async () => {
  let res = await axios.get(`${reportsUrl}/apps`);
  let data = res.data;
  console.log(data);
  applications.value = data.applications;
})

function updateList() {
  if (!!application.value && !!component.value) {
    overview.value = ['test.html'];
  }
}

async function selectApplication(a : string) {
  console.log(`Selected ${a}`);
  let res = await axios.get(`${reportsUrl}/${a}/components`);
  let data = res.data;
  console.log(data);
  components.value = data.components;
}

async function selectComponent(a : string) {
  console.log(`Selected ${a}`);
  let res = await axios.get(`${reportsUrl}/${application.value}/${a}/versions`);
  let data = res.data;
  console.log(data);
  versions.value = data.versions;
}

function selectVersion(a : string) {
  console.log(`Selected ${a}`);
}

watch(application, (newValue) => { console.log('new application', newValue); updateList(); })
watch(component, (newValue) => { console.log('new component', newValue); updateList(); })
watch(version, (newValue) => { console.log('new version', newValue); updateList(); })

</script>

<template>
  <v-container fluid>

    <v-card class="ma-2 pa-2 align-center">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4">
            <h1 class="text-h4">Hello</h1>
            Select application, component, version and test type to retrieve the document list.
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <span> Select application</span>
          <v-select :items="applications" @update:model-value="selectApplication" v-model="application"/>
        </v-col>
        <v-col cols="3">
          <span> Select component</span>
          <v-select :items="components" @update:model-value="selectComponent" v-model="component"/>
        </v-col>
        <v-col cols="3">
          <span> Select version</span>
          <v-select :items="versions" @update:model-value="selectVersion" v-model="version"/>
        </v-col>
        <v-col cols="3">
          <span> Select test type</span>
          <v-select :items="['a', 'b']" />
        </v-col>
      </v-row>

    </v-card>

    <v-card class="ma-2 pa-2">
      <v-row>
        <v-col cols="12">
          <v-table fixed-header height="400px">
            <thead>
              <tr>
                <th class="text-left">
                  Title
                </th>
                <th width="150px" class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in overview" :key="item">
                <td>{{ item }}</td>
                <td><v-btn>Open</v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card>

  </v-container>

</template>

