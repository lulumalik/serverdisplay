<template>
    <div class="px-6 py-4 shadow-md bg-white">
        <div @click="toRoute(r)" v-for="(r , i) in routes" :key="i" :class="$route.name == r.pathname ? 'bg-sky-500 rounded text-white' : ''" class="mt-4 px-2 w-44 cursor-pointer py-1 rounded flex space-x-3 items-center font-semibold">
            <div><component :is="r.icon" class="w-4" /></div>
            <div>{{r.name}}</div>
        </div>
    </div>
</template>

<script>
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
            }]
        }
    },
    methods: {
        toRoute(route) {
            window.location.href = route.path
        }
    }
}
</script>