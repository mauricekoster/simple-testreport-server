import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';
import { nextTick } from 'vue';

// Pinia Store
import { useGlobal, useAuth, useAlert } from '@/store';


import accountRoutes from './account';
//import usersRoutes from './users.routes';

// Components
import AboutPage from '@/views/AboutPage.vue';
import HomePage from '@/views/HomePage.vue';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  { ...accountRoutes },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
];

/** Vue Router */
const router: Router = createRouter({
  /**
   * History Mode
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html}
   */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  routes,
});

// Global before guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards}
router.beforeEach(
  async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {

    const alertStore = useAlert();
    const globalStore = useGlobal();

    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(_to.path);
    const authStore = useAuth();

    // Show Loading
    globalStore.setLoading(true);
    // Hide snack bar
    globalStore.setMessage('');
    await nextTick();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = _to.fullPath;
        return next('/account/login');
    }

    next();
  }
);

// Global After Hooks
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks}
router.afterEach(() => {
  const globalStore = useGlobal();
  // Hide Loading
  globalStore.setLoading(false);
});

export default router;
