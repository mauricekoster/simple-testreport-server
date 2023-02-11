import { defineStore } from 'pinia';

/** Config State */
type AlertState = {
  message: string | null;
  messageType: "success" | "warning" | "error" | "info" | undefined;
};

export default defineStore('alert', {
  state: (): AlertState => ({
    message: null,
    messageType: undefined
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
      this.messageType = undefined
    }
  }
})
