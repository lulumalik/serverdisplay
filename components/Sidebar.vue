<template>
    <div class="px-6 py-4 shadow-md bg-white">
        <button v-show="r.name == 'Account' && getUser() && getUser().role.name != 'Admin' ? false : true" @click="toRoute(r)" v-for="(r , i) in routes" :key="i" :class="$route.name == r.pathname ? 'bg-sky-500 rounded text-white' : ''" class="mt-4 px-2 w-44 cursor-pointer py-1 rounded flex space-x-3 items-center font-semibold">
            <div><component :is="r.icon" class="w-4" /></div>
            <div>{{r.name}}</div>
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
                icon: 'SidebarIconHome'
            }, {
                name: 'Template',
                path: '/template',
                pathname: 'template',
                icon: 'SidebarIconTemplate'
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