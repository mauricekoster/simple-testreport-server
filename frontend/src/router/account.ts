import { Layout, Login, Register } from '@/views/account';
import { useAuth } from '@/store';

export default {
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register },
        { path: 'logout', redirect: () => {
                const authStore = useAuth();
                authStore.logout();
                return 'login'
            }
        }
    ]
};
