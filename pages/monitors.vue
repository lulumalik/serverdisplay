<template>
    <div class="bg-gray-100">
        <Navbar class="w-full" />
        <div class="flex w-full" style="height: calc(100vh - 65.5px)">
            <Sidebar class="flex-none" />
            <div class="p-6 bg-white overflow-x-hidden overflow-y-auto m-4 rounded-md shadow-md w-full">
                <table class="w-full">
                    <tr>
                        <td colspan="2">
                            <div class="font-bold">
                                Data Type
                            </div>
                        </td>
                        <td>
                            <div class="font-bold">
                                System Active
                            </div>
                        </td>
                        <td>
                            <div class="font-bold">
                                Latest Check
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                NDF Province
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div v-for="(l, i) in listmonitorNDF" :index="i">
                                    {{ l.provinsi }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.ndf ? 'text-green-500' : 'text-red-500'">
                                {{ systemactive.ndf ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.ndf ? 'text-green-500' : 'text-red-500'">
                                {{ systemactive.ndf ? formatReadableDate(systemactive.ndf) : 'Data not updated !' }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Aviation Observation
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div v-for="(l, i) in listmonitorAvobs" :index="i">
                                    {{ l.tagname }} - {{ l.icaoId }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.aviationObs ? 'text-green-500' : 'text-red-500'">
                                {{ systemactive.aviationObs ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.aviationObs ? 'text-green-500' : 'text-red-500'">
                                {{ fors(systemactive.aviationObs) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Earthquake
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2" v-if="listmonitorEq">
                                <div>
                                    {{ listmonitorEq.Wilayah }}
                                </div>
                            </div>
                            <div v-else>
                                Data not updated
                            </div>
                        </td>
                        <td>
                            <div :class="listmonitorEq ? 'text-green-500' : 'text-red-500'">
                                {{ listmonitorEq ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorEq" :class="listmonitorEq ? 'text-green-500' : 'text-red-500'">
                                {{ formatReadableDate(listmonitorEq.DateTime) }}
                            </div>
                            <div v-else class="text-red-500">
                                {{ formatReadableDate(new Date()) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                IBF Forecast
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2" v-if="listmonitorIbf">
                                <div>
                                    Tested on {{ listmonitorIbf }}
                                </div>
                            </div>
                            <div v-else>
                                No data tested
                            </div>
                        </td>
                        <td>
                            <div :class="listmonitorIbf ? 'text-green-500' : 'text-red-500'">
                                {{ listmonitorIbf ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorIbf" :class="listmonitorIbf ? 'text-green-500' : 'text-red-500'">
                                {{ formatReadableDate(new Date()) }}
                            </div>
                            <div v-else>
                                Data not updated !
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Maritim Port
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div v-for="(l, i) in listmonitorPort" :index="i">
                                    {{ l.name }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.port ? 'text-green-500' : 'text-red-500'">
                                {{ systemactive.port ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.port ? 'text-green-500' : 'text-red-500'">
                                {{ fors(systemactive.port) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Maritim Water Area
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div v-for="(l, i) in listmonitorWilpel" :index="i">
                                    {{ l.name }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.wilpel ? 'text-green-500' : 'text-red-500'">
                                {{ systemactive.wilpel ? 'Data Online' : 'Data not updated !' }}
                            </div>
                        </td>
                        <td>
                            <div :class="systemactive.wilpel ? 'text-green-500' : 'text-red-500'">
                                {{ fors(systemactive.wilpel) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Ocean Forecast System
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div class="" v-if="listmonitorOfs">
                                    <div>
                                        Tested on W3G Reg Model
                                    </div>
                                </div>
                                <div v-else>
                                    No data tested
                                </div>
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorOfs" :class="'text-green-500'">
                                {{ 'Data Online' }}
                            </div>
                            <div v-else class="text-red-500">
                                Data not updated !
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorOfs" class="text-green-500">
                                {{ fors(listmonitorOfs.w3g_hires[0]) }}
                            </div>
                            <div v-else class="text-red-500">
                                {{ fors(new Date()) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Fire Danger Rating System (SPARTAN)
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div class="" v-if="listmonitorSpartan">
                                    <div>
                                        Tested on Asean Model
                                    </div>
                                </div>
                                <div v-else>
                                    No data tested
                                </div>
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorSpartan" :class="'text-green-500'">
                                {{ 'Data Online' }}
                            </div>
                            <div v-else class="text-red-500">
                                Data not updated !
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorSpartan" class="text-green-500">
                                {{ fors(listmonitorSpartan) }}
                            </div>
                            <div v-else class="text-red-500">
                                {{ fors(new Date()) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class=" h-full font-bold">
                                Airport Visibility
                            </div>
                        </td>
                        <td>
                            <div class="grid gap-2 grid-cols-2">
                                <div class="" v-if="listmonitorVisibility">
                                    <div>
                                        Tested on Kertajati
                                    </div>
                                </div>
                                <div v-else>
                                    No data tested
                                </div>
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorVisibility" :class="'text-green-500'">
                                {{ 'Data Online' }}
                            </div>
                            <div v-else class="text-red-500">
                                Data not updated !
                            </div>
                        </td>
                        <td>
                            <div v-if="listmonitorVisibility" class="text-green-500">
                                {{ fors(listmonitorVisibility) }}
                            </div>
                            <div v-else class="text-red-500">
                                {{ fors(new Date()) }}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
td {
    vertical-align: top;
    padding: 12px;
}
</style>

<script>
const xml = require('txml')
export default {
    data() {
        return {
            listmonitorNDF: [],
            listmonitorAvobs: [],
            listmonitorEq: null,
            listmonitorIbf: null,
            listmonitorPort: [],
            listmonitorWilpel: [],
            listmonitorOfs: null,
            listmonitorSpartan: null,
            listmonitorVisibility: null,
            systemactive: {
                ndf: false,
                aviationObs: false,
                eq: false,
                wilpel: false
            }
        }
    },
    mounted() {
        this.$axios
            .$get(this.$baseUrlNdf + '/cgms/weather/province')
            .then((res) => {
                // console.log(res)
                this.systemactive.ndf = new Date()
                res.data.forEach(el => {
                    this.listmonitorNDF.push(el)
                })
            }).catch(e => {
                this.systemactive.ndf = false
            })

        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
            })
            .then((res) => {
                // console.log(res)
                const json = xml.parse(res.data)
                if (json[1] && json[1].children) {
                    json[1].children.forEach((el2) => {
                        var icaoId = el2.children[0].children[0]
                        // console.log(el.value, icaoId)

                        var tagname = el2.children[1].children[0]
                        this.systemactive.aviationObs = new Date()
                        this.listmonitorAvobs.push({
                            tagname: tagname,
                            icaoId: icaoId
                        })

                    })
                } else {
                    this.systemactive.aviationObs = false
                }
            }).catch(e => {
                this.systemactive.aviationObs = false
            })

        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'https://maritim.bmkg.go.id/public_api/pelabuhan_list',
            })
            .then((res) => {
                this.systemactive.port = new Date()
                this.listmonitorPort = res.data.files
            }).catch(e => {
                this.systemactive.port = false
            })

        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'https://maritim.bmkg.go.id/ajax_home/select_data/pelayanan',
            })
            .then((res) => {
                this.systemactive.wilpel = new Date()
                this.listmonitorWilpel = res.data
            }).catch(e => {
                this.systemactive.wilpel = false
            })

        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'https://peta-maritim.bmkg.go.id/api21/modelrun',
            })
            .then((res) => {
                this.listmonitorOfs = res.data
            })

        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'https://cdn.bmkg.go.id/DataMKG/MEWS/spartan/35_asean_ffmc_obs.png',
            }).then(res => {
                this.listmonitorSpartan = new Date()
            })   // https://cdn.bmkg.go.id/DataMKG/MEWS/spartan/35_asean_ffmc_obs.png
        // 
        this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'https://rami.bmkg.go.id/api/siam/code/current_or_latest/metar?icaoId=WICA',
            }).then(res => {
                // console.log(res.data)
                var keys = Object.keys(res.data.data)
                // console.log(res.data, keys)
                this.listmonitorVisibility = res.data.data[keys[0]].issuedAt
            })
        // 

        // ibf 
        //
        this.testImage(`https://signature.bmkg.go.id/storage/output/public-impact/JAWA%20BARAT/${new Date().getFullYear()}/${new Date().getMonth().toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}/24.png`)


    },
    methods: {
        fors(str) {
            return str ? this.formatReadableDate(str) : 'Data not updated!'
        },
        formatReadableDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
            return new Date(date).toLocaleDateString('id-ID', options);
        },
        testImage(URL) {
            var tester = new Image()
            tester.onload = this.imageFound
            tester.onerror = this.imageNotFound
            tester.src = URL
        },
        imageFound() {
            this.listmonitorIbf = 'Jawa Barat'

        },
        imageNotFound(e) {

        }
    }
}
</script>