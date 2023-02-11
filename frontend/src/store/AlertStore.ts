import { defineStore } from 'pinia';

/** Config State */
type AlertState = {
  message: string | null;
  messageType: string | null;
};

export default defineStore('alert', {
  state: (): AlertState => ({
    message: null,
    messageType: null
  }),
  actions: {
    success(message: string) {
      this.message = message;
      this.messageType = 'success';
    },
    error(message: string) {
      this.message = message;
      this.messageType = 'error';
    },
    clear() {
      this.message = null
      this.messageType = null
    }
  }
})
