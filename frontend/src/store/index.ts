import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia, type Pinia } from 'pinia';

/** Pinia Store */
const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

// Pinia Stores

import useGlobal from './GlobalStore';
import useConfig from './ConfigStore';
import useAuth from './AuthStore';
import useAlert from './AlertStore';
import useUsers from './UsersStore';

export { useConfig, useGlobal, useAuth, useAlert, useUsers };
