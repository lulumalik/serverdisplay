<template>
    <div class="bg-gray-100">
        <div class="fixed left-0 flex items-center justify-center right-0 w-full h-full"
            style="z-index:1000;background: rgba(0,0,0,0.5)" v-if="popup">
            <div class="bg-white rounded-lg p-5" style="height: 80vh; width: 80vw">
                <div class="pb-3 flex">
                    <div class="flex-grow uppercase">
                        <b>{{ reportselected.name }}</b>
                    </div>

                    <div class="text-red-500 cursor-pointer text-2xl flex-none " @click="popup = false">
                        &times;
                    </div>
                </div>
                <div class="flex space-x-8 w-full">
                    <div class="w-80">
                        <div>
                            <div>
                                Select Category
                            </div>
                            <select class="py-1 mt-3 px-1 w-full border border-gray-300 rounded" v-model="categoryselected">
                                <option v-for="(c, i) in category" :value="c" :key="i">
                                    {{ moreCategory[c] }}
                                </option>
                            </select>
                            <div class="mt-6">Description</div>
                            <textarea rows="7" v-model="descreport" class="border p-2 mt-3 w-full border-gray-300">
                </textarea>
                            <div class="mt-4 text-right">
                                <button @click="submitreport"
                                    class="text-white bg-blue-500 px-4 py-1 font-bold rounded-md">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="font-semibold flex w-full mb-3">
                            <div class="flex-grow">Uploaded Report</div>

                        </div>
                        <div class="overflow-auto">
                            <div style="height:65vh;">
                                <div v-for="(u, i) in uploadedreport" :key="i"
                                    class="border border-gray-200 shadow-md p-3 rounded-md">
                                    <div class="mt-1">
                                        Category
                                        <select class="py-1 px-1 w-full border border-gray-300 rounded"
                                            v-model="savedReportCat[u._id]">
                                            <option v-for="(c, i) in category" :value="c" :key="i">
                                                {{ moreCategory[c] }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="mt-3">
                                        Description
                                    </div>
                                    <div>
                                        <textarea v-model="savedReportDesc[u._id]"
                                            class="border p-2 w-full border-gray-300">
                                    </textarea>
                                    </div>
                                    <div class="text-right mt-3 mb-1">
                                        <button @click="deleteReport(u)"
                                            class="text-white bg-red-500 px-4 py-1 font-bold rounded-md">Delete</button>
                                        <button @click="updateReport(u)"
                                            class="text-white bg-blue-500 px-4 py-1 font-bold rounded-md">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Navbar class="w-full" />
        <div class="flex w-full" style="height: calc(100vh - 65.5px)">
            <Sidebar class="flex-none" />
            <client-only>
                <div class="p-8 relative">
                    <div class="mb-6 flex space-x-6 absolute top-6 right-8">
                        <div class="flex space-x-4">
                            <div>
                                <button @click="downloaddata"
                                    class="rounded-full bg-green-500 w-72 py-2 text-white font-semibold px-4 border border-green-600">Download
                                    Display Report</button>
                            </div>
                            <select v-model="yearly" class="border border-gray-500 rounded-full px-4">
                                <option value="1">1 Day</option>
                                <option value="7">7 Day</option>
                                <option value="14">14 Day</option>
                                <option value="30">1 Month</option>
                                <option value="91">3 Month</option>
                                <option value="182">6 Month</option>
                                <option value="365">1 Years</option>
                            </select>
                        </div>
                        <div class="relative">
                            <input type="text" v-model="searchname" placeholder="Search by name"
                                class="rounded-full w-56 py-2 px-4 border border-sky-400" />
                            <div class="absolute right-4 top-3.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    class="text-sky-400">
                                    <path fill="currentColor"
                                        d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="text-xl mb-4 font-bold text-sky-500">List Display</div>
                        <div class="flex space-x-4">
                            <div style="height: calc(100vh - 240px);width: calc(100vw - 740px)"
                                class="overflow-auto flex-grow">
                                <table class="bg-white w-full font-bold rounded shadow-xl">
                                    <tr>
                                        <td>
                                            Display Name
                                        </td>
                                        <td>
                                            Display ID
                                        </td>
                                        <td>
                                            Status
                                        </td>
                                    </tr>
                                    <tbody v-for="(db, i) in templateDB" :key="i" class="
                                        rounded
                                        w-auto
                                        font-normal
                                        cursor-pointer
                                        relative
                                        hover:bg-gray-200
                                        border-b border-gray-200
                                    
                                    " :class="selectedTable == db.username ? 'bg-gray-200' : 'bg-white'"
                                        @click="selectdata(db, db.username)">
                                        <tr>
                                            <td>
                                                <div class="flex space-x-4 items-center">
                                                    <div class="relative z-50 cursor-pointer">
                                                        <svg clip-rule="evenodd" fill-rule="evenodd" @click="openpopup(db)"
                                                            stroke-linejoin="round" stroke-miterlimit="2"
                                                            viewBox="0 0 24 24" width="20" height="20"
                                                            xmlns="http://www.w3.org/2000/svg" class="text-red-500">
                                                            <path fill="currentColor"
                                                                d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-8c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"
                                                                fill-rule="nonzero" />
                                                        </svg>
                                                    </div>
                                                    <div :id="db.username">{{ db.name }}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex items-center">
                                                    <div>{{ db.username }}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex space-x-3 items-center">

                                                    <div class="w-4 h-4 rounded-full"
                                                        :class="db.status ? 'bg-green-500' : 'bg-red-500'">
                                                    </div>
                                                    <div>
                                                        {{ db.status ? 'Active' : 'Not Active' }}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div v-if="templateDB.length == 0" class="text-center text-xs w-full p-12">
                                    no displays founds.
                                </div>
                            </div>
                            <div style="width: 420px;">
                                <div class="font-bold mt-3 mb-3">Data Display<button
                                        @click="toLink('https://widis.bmkg.go.id/g/' + selectedTable)" target="_blank"
                                        class="uppercase pl-3 underline cursor-pointer text-blue-500">{{ selectedTable
                                        }}</button></div>
                                <div>
                                    <div v-if="selectedCollapse" class="bg-white p-4 rounded-md overflow-auto"
                                        style="height: calc(100vh - 435px)">
                                        <div>
                                            <div v-if="toArrayMonitor(selectedCollapse).length > 0">
                                                <!-- {{ toArrayMonitor(selectedCollapse[db.username]) }} -->
                                                <div v-for="(val, key) in toArrayMonitor(selectedCollapse)" :key="key">
                                                    <div v-if="val.tour" class="mt-2">
                                                        <div v-for="(v, k) in sortir(val.tour)" :key="k">
                                                            <div v-if="v.key.includes('name')" class="font-semibold">
                                                                {{ v.value }}
                                                            </div>
                                                            <div v-else class="grid grid-cols-2 gap-2">
                                                                <div> {{ v.value.subdistrict }}</div>
                                                                <div @click="toNDF(v.value.locationId)"
                                                                    class="underline text-blue-500 cursor-pointer"> {{
                                                                        v.value.locationId }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.stick" class="mt-2">
                                                        <div v-for="(v, k) in sortir(val.stick)" :key="k">
                                                            <div v-if="v.key.includes('kotkab')" class="font-semibold">
                                                                {{ v.value.kotkab }}
                                                            </div>
                                                            <div v-else class="grid grid-cols-2 gap-2">
                                                                <div> {{ v.value.subdistrict }}</div>
                                                                <div @click="toNDF(v.value.locationId)"
                                                                    class="underline text-blue-500 cursor-pointer"> {{
                                                                        v.value.locationId }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.weatherlocation" class="mt-2">
                                                        <div v-for="(v, k) in val.weatherlocation" :key="k">
                                                            <div v-if="v.key.includes('province')" class="font-semibold">
                                                                {{ v.value.provinsi }}
                                                            </div>
                                                            <div v-else class="grid grid-cols-2 gap-2">
                                                                <div> {{ v.value.kotkab }}</div>
                                                                <div @click="toKotkab(v.value._id)"
                                                                    class="underline text-blue-500 cursor-pointer"> {{
                                                                        v.value.kotkab }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.eq" class="mt-2">
                                                        <div class="grid grid-cols-2 items-center">
                                                            <div class="font-bold">
                                                                Latest Earthquake
                                                            </div>
                                                            <div>
                                                                <button @click="toGempa"
                                                                    class="underline ml-1 text-blue-500 cursor-pointer">Link</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.ibf" class="mt-2">
                                                        <div class="grid grid-cols-2 items-center">
                                                            <div class="font-bold">
                                                                IIBF Prakiraan Cuaca
                                                            </div>
                                                            <div>
                                                                <a :href="val.ibf" target="_blank"
                                                                    class="underline ml-1 text-blue-500 cursor-pointer">
                                                                    Link </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.perairan" class="mt-2">
                                                        <div class="grid grid-cols-2 items-center">
                                                            <div class="font-bold">
                                                                Maritim Perairan
                                                            </div>
                                                            <div>
                                                                <a :href="val.perairan" target="_blank"
                                                                    class="underline ml-1 text-blue-500 cursor-pointer">
                                                                    Link </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.penyebrangan" class="mt-2">
                                                        <div class="grid grid-cols-2 items-start">
                                                            <div class="font-bold">
                                                                Maritim Penyebrangan
                                                            </div>
                                                            <div>
                                                                <div v-for="(v, ind) in val.penyebrangan" :key="ind">
                                                                    <button
                                                                        @click="toPelabuhan(v.value.name || v.value.id, !v.value.name ? v.value.id : v.value.name)"
                                                                        class="underline ml-1 text-blue-500">
                                                                        {{ v.value.portname || v.value.name }} </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.pelabuhan" class="mt-2">
                                                        <div class="grid grid-cols-2 items-start">
                                                            <div class="font-bold">
                                                                Maritim Pelabuhan
                                                            </div>
                                                            <div>
                                                                <button @click="toPelabuhan(val.pelabuhan.value.name)"
                                                                    class="underline ml-1 text-blue-500">
                                                                    {{ val.pelabuhan.value.portname }} </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.spartan" class="mt-2">
                                                        <div class="grid grid-cols-2 items-center">
                                                            <div class="font-semibold">
                                                                SPARTAN {{ val.spartan[1].value.name }} <span
                                                                    class="uppercase">{{ val.spartan[0].value.id
                                                                    }}</span>
                                                            </div>
                                                            <img :src="`https://cdn.bmkg.go.id/DataMKG/MEWS/spartan/${val.spartan[1].value.key}_${val.spartan[0].value.id}_${val.spartan[2].value.key}.png`"
                                                                width="150" />
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.deparr" class="mt-2">
                                                        <div class="underline text-blue-500 cursor-pointer">
                                                            <a href="http://aviation.bmkg.go.id/latest/observation.xml.php"
                                                                target="_blank">All reference fo api Departure and
                                                                Arrival
                                                                goes to here</a>
                                                        </div>
                                                        <div class="grid grid-cols-2 items-start"
                                                            v-for="(v, ind) in val.deparr" :key="ind">
                                                            <div class="font-semibold">
                                                                {{ v.key.includes('Departures') ? 'Departures' :
                                                                    'Arrival'
                                                                }}
                                                            </div>
                                                            <div v-if="Array.isArray(v.value)">
                                                                <div v-for="(arrival, ar) in v.value" :key="ar">
                                                                    {{ arrival.value.tagname }} - {{
                                                                        arrival.value.icaoid }}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {{ v.value.tagname }} - {{ v.value.icaoid }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="val.weatherwarning" class="mt-2">
                                                        <div class="grid grid-cols-2 items-center">
                                                            <div class="font-semibold">
                                                                Area {{ val.weatherwarning.area }}
                                                            </div>
                                                            <img :src="val.weatherwarning.img" width="150" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <small>Display not selected</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-2">
                                    <div class="mb-2 font-bold">Display Notes</div>
                                    <div>
                                        <textarea placeholder="Input notes"
                                            class="w-full rounded-md shadow resize-none p-2 text-xs" rows="6"
                                            v-model="notes">
                                        </textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <paginate :page-count="total" v-if="searchname.length == 0" :click-handler="functionName"
                        :prev-text="'Prev'" :next-text="'Next'" :container-class="'flex mt-4 space-x-4'">
                    </paginate>
                </div>
            </client-only>
        </div>
    </div>
</template>
  
<style>
pre[data-lang]::before {
    content: attr(data-lang);
    display: block;
}

td {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
}

table {
    border-radius: 15px !important;
}

ul li {
    text-align: center !important;
    padding: 5px !important;
    border-radius: 5px !important;
    width: auto !important;
    background: white;
}

ul li.active {
    background: #3b82f6 !important;
    color: white;
}
</style>
  
<script>
var axios = require('axios')
export default {
    data() {
        return {
            page: 1,
            total: 10,
            searchname: '',
            templateDB: [],
            selectedCollapse: {},
            selectedTable: null,
            notes: '',
            popup: false,
            descreport: '',
            category: [1, 2, 3, 4, 5, 6, 7],
            yearly: '1',
            moreCategory: {
                1: 'Display rusak',
                2: 'Gangguan Jaringan',
                3: 'Mini PC Rusak',
                4: 'Listrik Mati',
                5: 'Data Tidak Update',
                6: 'Aplikasi Software Trouble',
                7: 'Pemindahan Lokasi'
            },
            categoryselected: 1,
            reportselected: {},
            savedReportDesc: {},
            savedReportCat: {},
            uploadedreport: []
        }
    },
    mounted() {
        this.callAllData()
    },
    watch: {
        searchname(val) {
            if (this.timeoutsearch) {
                clearTimeout(this.timeoutsearch)
            }
            this.timeoutsearch = setTimeout(() => {
                if (val.length == 0) {
                    this.page = 1
                    this.total = 10
                    this.callAllData()
                } else {
                    this.searchData()
                }
            }, 500)
        },
    },
    middleware: ['checkLogin'],
    methods: {
        downloaddata() {
            var settingdate = new Date(new Date().setDate(new Date().getDate() - parseInt(this.yearly)))
            var fromdate = this.yearly == '1' ? '' : `&fromDate=${settingdate.toISOString()}&`
            axios({
                url: this.$axios.defaults.baseURL + `monitor-display/report-display-summary/csv?${fromdate}toDate=${new Date().toISOString()}`,
                methods: 'GET',
                responseType: 'blob',
                headers: {
                    'x-access-token': this.$cookies.get('users')
                }
            }).then(response => {
                // create file link in browser's memory
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'DisplayReport_summary.csv'); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);

                axios({
                    url: this.$axios.defaults.baseURL + `monitor-display/report-per-display/summary/csv?${fromdate}toDate=${new Date().toISOString()}`,
                    methods: 'GET',
                    responseType: 'blob',
                    headers: {
                        'x-access-token': this.$cookies.get('users')
                    }
                }).then(response => {
                    // create file link in browser's memory
                    const href = URL.createObjectURL(response.data);

                    // create "a" HTML element with href to file & click
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'DisplayReport_exportdata.csv'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    // clean up "a" element & remove ObjectURL
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);

                    axios({
                        url: this.$axios.defaults.baseURL + `monitor-display/report-per-display/bycategory/csv?${fromdate}toDate=${new Date().toISOString()}`,
                        methods: 'GET',
                        responseType: 'blob',
                        headers: {
                            'x-access-token': this.$cookies.get('users')
                        }
                    }).then(response => {
                        // create file link in browser's memory
                        const href = URL.createObjectURL(response.data);

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', 'DisplayReport_exportdata_bycategory.csv'); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                    })
                })
            })
        },
        deleteReport(db) {
            this.$axios.$delete('report-display/delete/' + db._id).then((res) => {
                this.$axios.$get('report-display/findbydisplay/' + db.display.id).then((res) => {
                    // console.log(res)
                    this.uploadedreport = res.data
                    this.uploadedreport.forEach(el => {
                        this.savedReportCat[el._id] = el.category
                        this.savedReportDesc[el._id] = el.description
                    })
                })
                this.$toast.open({
                    message: 'Report deleted',
                    type: 'success',
                    duration: 2000,
                })
            })
        },
        updateReport(db) {
            this.$axios.$put('report-display/update/' + db._id, {
                category: this.savedReportCat[db._id],
                description: this.savedReportDesc[db._id],
                display: db.display._id
            }).then((res) => {
                this.$axios.$get('report-display/findbydisplay/' + db.display.id).then((res) => {
                    // console.log(res)
                    this.uploadedreport = res.data
                    this.uploadedreport.forEach(el => {
                        this.savedReportCat[el._id] = el.category
                        this.savedReportDesc[el._id] = el.description
                    })
                })
                this.$toast.open({
                    message: 'Report saved',
                    type: 'success',
                    duration: 2000,
                })
            })
        },
        openpopup(db) {
            this.reportselected = db
            // console.log(db)
            this.$axios.$get('report-display/findbydisplay/' + db.id).then((res) => {
                // console.log(res)

                this.uploadedreport = res.data
                this.uploadedreport.forEach(el => {
                    this.savedReportCat[el._id] = el.category
                    this.savedReportDesc[el._id] = el.description
                })
                this.popup = true
            })
        },
        submitreport() {
            this.$axios.$post('report-display/create', {
                category: this.categoryselected,
                description: this.descreport,
                display: this.reportselected.id
            }).then((res) => {
                this.$axios.$get('report-display/findbydisplay/' + this.reportselected.id).then((res) => {
                    // console.log(res)
                    this.uploadedreport = res.data
                    this.uploadedreport.forEach(el => {
                        this.savedReportCat[el._id] = el.category
                        this.savedReportDesc[el._id] = el.description
                    })
                })
                // console.log(res)
                this.$toast.open({
                    message: 'Report saved',
                    type: 'success',
                    duration: 2000,
                })
            })
        },
        toLink(link) {
            window.open(link, '_blank')
        },
        selectdata(db, data) {
            // this.selectedCollapse = {}
            // console.log(db)
            this.notes = db.note
            if (this.selectedCollapse[db.username]) {
                // this.selectedCollapse = {}
                this.selectedTable = null
            } else {
                this.selectedCollapse = {}
                this.selectedTable = data
                this.selectedCollapse = db.properties
                // this.$set(this.selectedCollapse, db.username, db.properties)
            }
        },
        callAllData() {
            this.$axios.$get('display?row=50&order=desc&sortBy=id&page=' + this.page).then((res) => {
                // parseInt res.count if decimal
                // console.log(res)
                var count = parseInt(res.total / 50)
                this.total = count
                this.templateDB = res.data
            })
        },
        toNDF(data) {
            window.open('https://widis.bmkg.go.id/ndf/cgms/weather/ndf/get?locationId=' + data, '_blank')
        },
        toPelabuhan(data, isID) {
            if (isID) {
                window.open('https://maritim.bmkg.go.id/ajax/bindpopup_penyeberangan?id=' + data, '_blank')
            } else {
                window.open('https://maritim.bmkg.go.id/public_api/pelabuhan/' + data, '_blank')
            }

        },
        toGempa() {
            window.open('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json', '_blank')
        },
        toKotkab(id) {
            window.open('https://widis.bmkg.go.id/ndf/cgms/weather/ndf/location?_id=' + id, '_blank')
        },
        sortir(data) {
            return data.sort((a, b) => {
                const nameA = a.key.toLowerCase();
                const nameB = b.key.toLowerCase();

                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }

                return 0;
            });
        },
        toArrayMonitor(obj) {
            var filtertemplate = obj.allTemplate
            var result = []
            for (var key in filtertemplate) {
                if (filtertemplate[key].name == 'Tour Information' || filtertemplate[key].name == 'Cuaca Wisata 1') {
                    result.push(
                        {
                            tour: obj.allSetting[filtertemplate[key].idtemplate].filter(e => {
                                if (e.key.includes('kecamatan') || e.key.includes('name')) {
                                    return e
                                }
                            })
                        }
                    )
                } else if (filtertemplate[key].name == 'Forecast Stick' || filtertemplate[key].name == 'Prakiraan Cuaca' || filtertemplate[key].name == 'Prakiraan cuaca per 3 jam' || filtertemplate[key].name == 'Wisata ( bawah ) Forecast' || filtertemplate[key].name == 'Wisata Forecast' || filtertemplate[key].name == 'Signifikan Cuaca') {
                    result.push(
                        {
                            stick: obj.allSetting[filtertemplate[key].idtemplate].filter(e => {
                                if (e.key.includes('kecamatan') || e.key.includes('kotkab')) {
                                    return e
                                }

                            })
                        }
                    )
                } else if (filtertemplate[key].name == 'Weather Location' || filtertemplate[key].name == 'Weather Arrow' || filtertemplate[key].name == 'Cuaca Kecamatan' || filtertemplate[key].name == 'Cuaca Kecamatan Blok') {
                    result.push(
                        {
                            weatherlocation: obj.allSetting[filtertemplate[key].idtemplate]
                        }
                    )
                } else if (filtertemplate[key].name == 'Earthquake') {
                    result.push(
                        {
                            eq: obj.allSetting[filtertemplate[key].idtemplate]
                        }
                    )
                } else if (filtertemplate[key].name == 'IBF Prakira') {

                    result.push(
                        {
                            ibf: 'https://signature.bmkg.go.id/storage/output/public-impact/' +
                                obj.allSetting[filtertemplate[key].idtemplate][0].value.name +
                                '/' +
                                new Date().getFullYear() +
                                '/' +
                                this.getZero(new Date().getMonth() + 1) +
                                '/' +
                                this.getZero(new Date().getDate()) +
                                '/00.png'
                        }
                    )
                } else if (filtertemplate[key].name == 'Maritim Penyebrangan' || filtertemplate[key].name == 'Maritim Penyebrangan 2') {
                    var valuedata = obj.allSetting[filtertemplate[key].idtemplate]
                    result.push({
                        penyebrangan: valuedata.filter(e => e.value.name)
                    })
                } else if (filtertemplate[key].name == 'Maritim Pelabuhan') {
                    result.push({
                        pelabuhan: obj.allSetting[filtertemplate[key].idtemplate][0]
                    })
                } else if (filtertemplate[key].name == 'Perairan Maritim') {
                    var valuedata = obj.allSetting[filtertemplate[key].idtemplate][0].value
                    result.push({
                        perairan: 'https://maritim.bmkg.go.id/public_api/perairan/' +
                            valuedata.id + '_' + valuedata.name +
                            '.json'
                    })
                } else if (filtertemplate[key].name == 'Spartan') {
                    var valuedata = obj.allSetting[filtertemplate[key].idtemplate]
                    result.push({
                        spartan: valuedata
                    })
                } else if (filtertemplate[key].name == 'Weather Warning' || filtertemplate[key].name == 'Peringatan Dini Cuaca') {

                    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
                    var area
                    if (obj.allSetting[filtertemplate[key].idtemplate][0].value && obj.allSetting[filtertemplate[key].idtemplate][0].value.area) {
                        area = obj.allSetting[filtertemplate[key].idtemplate][0].value.area
                    } else if (obj.allSetting[filtertemplate[key].idtemplate][0].value && obj.allSetting[filtertemplate[key].idtemplate][0].value.id) {
                        area = obj.allSetting[filtertemplate[key].idtemplate][0].value.id
                    }
                    result.push({
                        weatherwarning: {
                            img: 'https://nowcasting.bmkg.go.id/infografis/' + area + '/' +
                                new Date().getFullYear() +
                                '/' +
                                this.getZero(yesterday.getMonth() + 1) +
                                '/' +
                                this.getZero(yesterday.getDate()) +
                                '/infografis.jpg',
                            area: area
                        }
                    })
                } else if (filtertemplate[key].name == 'Departure, Arrival' || filtertemplate[key].name == 'Departure & Arrival') {
                    result.push({
                        deparr: obj.allSetting[filtertemplate[key].idtemplate]
                    })
                } else {
                    // console.log(filtertemplate[key].name, obj.allSetting[filtertemplate[key].idtemplate])
                }
            }
            return result
        },
        // filterByName(key, val) {
        // https://signature.bmkg.go.id/storage/output/public-impact/SULAWESI%20TENGGARA/2023/06/09/00.png
        //     var locationidbase = 'https://widis.bmkg.go.id/ndf/cgms/weather/ndf/get?locationId='
        //     if (key.includes('WidgetWisataBottombar')) {
        //         return val.filter(e => {
        //             if (e.key.includes('kecamatan')) {
        //                 return e.value.locationId
        //             }
        //         })[0]
        //     } else if (key.includes('WidgetArrival')) {
        //         return ''
        //     } else if (key.includes('WidgetDepartures')) {
        //         return ''
        //     } else if (key.includes('WidgetEarthquake')) {
        //         // const res = await this.$axios.post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
        //         //     url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
        //         // })
        //         return 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'
        //     } else if (key.includes('WidgetForecastStick')) {
        //         return val.filter(e => e.value.ndf)
        //     } else if (key.includes('WidgetForecastWeather')) {
        //         return val.filter(e => e.locationId)[0]
        //     } else if (key.includes('WidgetIbfForecast')) {
        //         return 'https://signature.bmkg.go.id/storage/output/public-impact/' +
        //             val.filter(e => e.value.name)[0] +
        //             '/' +
        //             this.year +
        //             '/' +
        //             this.getZero(this.month) +
        //             '/' +
        //             this.getZero(this.day) +
        //             '/00.png'
        //     } else if (key.includes('WidgetMaritimPelabuhan')) {
        //         return ''
        //     } else if (key.includes('WidgetMaritimPenyebrangan')) {
        //         return ''
        //     } else if (key.includes('WidgetMaritimPenyebrangan2')) {
        //         return ''
        //     } else if (key.includes('WidgetMaritimPerairan')) {
        //         return ''
        //     } else if (key.includes('WidgetMaritimWarning')) {
        //         return ''
        //     } else if (key.includes('WidgetOfsStatic')) {
        //         return ''
        //     } else if (key.includes('WidgetSpartan')) {
        //         return ''
        //     } else if (key.includes('WidgetVisibility')) {
        //         return ''
        //     } else if (key.includes('WidgetWarning3Harian')) {
        //         return ''
        //     } else if (key.includes('WidgetWarningWeather')) {
        //         return ''
        //     } else if (key.includes('WidgetWeatherArrow')) {
        //         return ''
        //     } else if (key.includes('WidgetWeatherHeadline')) {
        //         return ''
        //     } else if (key.includes('WidgetWeatherTable2')) {
        //         return ''
        //     } else if (key.includes('WidgetWisataBanyakLokasi')) {
        //         return ''
        //     } else if (key.includes('WidgetWisataBottombar')) {
        //         return ''
        //     } else if (key.includes('WidgetWisataBottombarForecast')) {
        //         return ''
        //     } else if (key.includes('WidgetWisataForecast')) {
        //         return ''
        //     } else {
        //         return 'not found'
        //     }
        // },
        searchData() {
            this.$axios
                .$get('display?row=10000000&keyword=' + this.searchname.toLowerCase())
                .then((res) => {
                    this.templateDB = res.data
                    this.total = parseInt(res.count / 10000000 + 1)
                })
        },
        functionName(e) {
            this.$axios.$get('display?row=50&order=desc&sortBy=id&page=' + e).then((res) => {
                this.total = parseInt(res.total / 50)
                this.templateDB = res.data
            })
        },
        getZero(numb) {
            return parseInt(numb) < 10 ? '0' + numb : numb
        },
    },
}
</script>