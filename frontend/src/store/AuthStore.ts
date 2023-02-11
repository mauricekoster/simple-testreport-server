import { defineStore } from 'pinia';
import router from '@/router';

import { useAlert } from '@/store';
import axios, { AxiosError } from 'axios';

/** Config State */
type User = {
  id: number,
  email: string,
  is_active: boolean,
  is_superuser: boolean,
  full_name: string
};

type AuthState = {
  user: User | null;
  access_token: string | null;
  returnUrl: string | null;
};

const loginUrl = `${import.meta.env.VITE_API_URL}/login`;
const usersUrl = `${import.meta.env.VITE_API_URL}/users`;

/** Config Store */
export default defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    returnUrl: null,
    access_token: JSON.parse(localStorage.getItem('access_token') || 'null'),
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        const res1 = await axios.post(`${loginUrl}/access-token`, params );
        this.access_token = res1.data.access_token;
        localStorage.setItem('access_token', JSON.stringify(this.access_token));
        console.log(`ACCESTOKE: ${this.access_token}`)

        const reqInstance = axios.create({
          headers: {
            Authorization : `Bearer ${this.access_token}`
          }
        });

        const res2 = await reqInstance.get(`${usersUrl}/me`);
        this.user = res2.data;
        localStorage.setItem('user', JSON.stringify(this.user));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/');
      } catch (error) {
        const axiosErr = error as AxiosError
        const status = axiosErr.response ? axiosErr.response.status : 0
        if (status == 400) {
          const alertStore = useAlert();
          const msg : string = axiosErr.response ? axiosErr.response.data.detail : 'No details'
          alertStore.error(msg);
        }
        else {
          console.log(error)
        }

      }
    },
    logout() {
      this.user = null;
      this.access_token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      router.push('/account/login');
    }
  }
});
