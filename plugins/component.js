import Vue from 'vue'

import MarqueeText from 'vue-marquee-text-component'

Vue.component('marquee-text', MarqueeText)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

import PictureInput from 'vue-picture-input'
Vue.component('picture-input', PictureInput)

import draggable from 'vuedraggable'

Vue.component('draggable', draggable)

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

Vue.component('vue-slider', VueSlider)

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';


import VueAgile from '../components/Carousel.vue'
Vue.component('agile', VueAgile)



import Layout_1 from '@/components/Template/Layout_1.vue'
import Layout_2_1 from '@/components/Template/Layout_2_1.vue'
import Layout_2_2 from '@/components/Template/Layout_2_2.vue'
import Layout_3_1 from '@/components/Template/Layout_3_1.vue'
import Layout_3_2 from '@/components/Template/Layout_3_2.vue'
import Layout_3_3 from '@/components/Template/Layout_3_3.vue'
import Layout_3_4 from '@/components/Template/Layout_3_4.vue'
import Layout_3_5 from '@/components/Template/Layout_3_5.vue'
import Layout_4_1 from '@/components/Template/Layout_4_1.vue'
import Layout_4_2 from '@/components/Template/Layout_4_2.vue'

Vue.component('Layout_1', Layout_1)
Vue.component('Layout_2_1', Layout_2_1)
Vue.component('Layout_2_2', Layout_2_2)
Vue.component('Layout_3_1', Layout_3_1)
Vue.component('Layout_3_2', Layout_3_2)
Vue.component('Layout_3_3', Layout_3_3)
Vue.component('Layout_3_4', Layout_3_4)
Vue.component('Layout_3_5', Layout_3_5)
Vue.component('Layout_4_1', Layout_4_1)
Vue.component('Layout_4_2', Layout_4_2)