<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useAlert } from '@/store';
const alertStore = useAlert();
const { message, messageType } = storeToRefs(alertStore);
</script>

<template>
  <v-alert v-if="message && messageType"
  closable
  :text="message"
  :type="messageType" variant="tonal"></v-alert>
</template>
