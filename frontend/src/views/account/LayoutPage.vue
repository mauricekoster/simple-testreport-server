<script setup lang="ts">

import { useAuth } from '@/store';
import router from '@/router';
import AlertComponent from '@/components/AlertComponent.vue';

// redirect home if already logged in
const authStore = useAuth();
console.log('@@@@')
if (authStore.user) {
    router.push('/');
}
</script>

<template>
  <v-container>
    <AlertComponent />
    <v-row class="col-sm-8 offset-sm-2 mt-5">
      <router-view />
    </v-row>
  </v-container>
</template>
