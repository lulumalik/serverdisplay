<template>
    <div class="px-6 py-4 shadow-md bg-gray-700 text-white">
        <button v-show="(r.name == 'Account' || r.name == 'Monitoring') && getUser() && getUser().role.name != 'Admin' ? false : true" @click="toRoute(r)" v-for="(r , i) in routes" :key="i" :class="$route.name == r.pathname ? 'bg-sky-500 rounded-full text-white' : ''" class="mt-4 px-4 w-44 cursor-pointer py-1 rounded-full flex space-x-3 items-center font-semibold">
            <div><component :is="r.icon" class="w-4" /></div>
            <div class="whitespace-nowrap">{{r.name}}</div>
        </button>
    </div>
</template>

<script>
import jwtdecode from "jwt-decode"
export default {
    data() {
        return {
            routes: [{
                name: 'Display',
                path: '/display',
                pathname: 'display',
                icon: 'SidebarIconHome',
            }, {
                name: 'Display Request',
                path: '/display/request',
                pathname: 'display-request',
                icon: 'SidebarIconRequest',
            } , {
                name: 'Template',
                path: '/template',
                pathname: 'template',
                icon: 'SidebarIconTemplate'
            },{
                name: 'Monitoring',
                path: '/monitoring',
                pathname: 'monitoring',
                icon: 'SidebarIconMonitor'
            }, {
                name: 'Assets',
                path: '/assets',
                pathname: 'assets',
                icon: 'SidebarIconLogo'
            },{
                name: 'Account',
                path: '/account',
                pathname: 'account',
                icon: 'SidebarIconAccount'
            }]
        }
    },
    methods: {
        toRoute(route) {
            window.location.href = route.path
        },
        getUser() {
            let token = this.$cookies.get("users")
            let decode = jwtdecode(token)
            return decode
        }
    },

}
</script>