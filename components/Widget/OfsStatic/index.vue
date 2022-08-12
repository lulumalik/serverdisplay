<template>
  <div>
    <!-- <div class="font-bold text-3xl text-center">Monitoring</div> -->
    <!-- <div class="font-bold text-3xl text-center flex justify-center space-x-6">
      <div>Ocean Forecast System</div>
    </div> -->
    <div class="pb-6">
      <img :src="imgurl" alt="static" class="mx-auto w-8/12 mt-2" />
    </div>
  </div>
</template>

<script>
import { filterInitialBaru } from '../../../utils/helperOFS.js'
export default {
  data() {
    return {
      rangeData: [],
      sliderWithLabel: {
        value: 1,
        range: [],
        data: [],
      },
      allModel: null,
      selected: {
        model: 'w3g_hires',
        timeZone: 'UTC',
        parameter: 'ws',
        area: 'indonesia',
        initialtime: '',
        timeSelected: '',
      },
      imgurl: '',
    }
  },
  watch: {
    selected: {
      handler() {
        this.getData()
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      if (
        parent.obj &&
        this.$store.state.displayWidget.widgetSaved[
          parent.obj._id + '_WidgetOfsStatic'
        ]
      ) {
        this.selected.area =
          this.$store.state.displayWidget.widgetSaved[
            parent.obj._id + '_WidgetOfsStatic'
          ]
      }
      if (parent.currentId) {
        // this.forecast.length = 0

        var ndf = parent.obj.properties.widgetndf
        if (ndf) {
          ndf.forEach((item) => {
            if (item.key == '_WidgetOfsStatic') {
              this.selected.area = item.value
            }
          })
        }
      }
    }

    this.getData()

    setInterval(() => {
      this.getData()
    }, 3600000)
  },
  methods: {
    getData() {
      // this.$axios.get('https://pusmar.id/api21/modelrun').then((res) => {
      this.allModel = this.$store.state.maritimData.modelrun
      if (this.allModel[this.selected.model]) {
        this.selected.initialtime = this.allModel[this.selected.model][0]
        this.initUTCArray(this)
      } else {
        this.$axios.get('https://pusmar.id/api21/modelrun').then((res) => {
          this.allModel = res.data
          this.selected.initialtime = this.allModel[this.selected.model][0]
          this.initUTCArray(this)
        })
      }
      // })
    },
    updateImage() {
      // https://peta-maritim.bmkg.go.id/render-static/w3g/2021/11/2021111712/indonesia/swh_2021111712.png
      this.imgurl = `https://peta-maritim.bmkg.go.id/render-static/${
        this.selected.model.split('_')[0]
      }/${this.selected.initialtime.slice(
        0,
        4
      )}/${this.selected.initialtime.slice(5, 7)}/${filterInitialBaru(
        this.selected.initialtime,
        false,
        true
      )}/${this.selected.area}/${this.selected.parameter}_${filterInitialBaru(
        this.selected.timeSelected,
        false,
        true
      )}.png`
    },
    initDate(element, time) {
      return this.selected.timezone == 'utc'
        ? new Date(
            new Date(time).getFullYear(),
            new Date(time).getMonth(),
            new Date(time).getDate(),
            element,
            0,
            0
          ).getUTCDate()
        : new Date(
            new Date(time).getFullYear(),
            new Date(time).getMonth(),
            new Date(time).getDate(),
            element,
            0,
            0
          ).getDate()
    },
    initUTCArray(_this) {
      var numberData = null,
        selisih = Math.abs(
          (new Date().getTime() -
            new Date(_this.selected.initialtime).getTime()) /
            3600000
        ).toFixed(),
        idxValue = (parseFloat(selisih) / 3).toFixed()

      // offset
      var offset = (-1 * (new Date().getTimezoneOffset() / 60)).toFixed(),
        intOffset =
          parseFloat(offset) +
          (this.selected.timezone == 'wit'
            ? 2
            : this.selected.timezone == 'wita'
            ? 1
            : 0)
      // array utc
      var days = _this.selected.model == 'w3g_hires' ? 9 * 8 * 3 : 3 * 8 * 3
      _this.sliderWithLabel.range = []
      // _this.rangeData = [];
      _this.sliderWithLabel.data = []
      for (
        let i = new Date(_this.selected.initialtime).getUTCHours();
        i <= days;
        i += 3
      ) {
        // push utc yang udah di tambah offset
        _this.sliderWithLabel.data.push(i + intOffset)

        if (
          numberData !=
          _this.initDate(i + intOffset, _this.selected.initialtime)
        ) {
          // push rangeData yang tanggal + bulan
          _this.sliderWithLabel.range.push({
            valueActive: _this.initDate(
              i + intOffset,
              _this.selected.initialtime
            ),
            label:
              _this.initDate(i + intOffset, _this.selected.initialtime) +
              ' ' +
              new Date(
                new Date(_this.selected.initialtime).getUTCFullYear(),
                new Date(_this.selected.initialtime).getUTCMonth(),
                new Date(_this.selected.initialtime).getUTCDate(),
                i + intOffset,
                0,
                0
              )
                .toString()
                .split(' ')
                .splice(0, 6)[1],
          })
        } else {
          _this.sliderWithLabel.range.push({
            label: _this.initDate(i + intOffset, _this.selected.initialtime),
            isHide: true,
          })
        }
        numberData = _this.initDate(i + intOffset, _this.selected.initialtime)
      }

      // nilai active
      _this.sliderWithLabel.value = _this.sliderWithLabel.data[idxValue]

      var date = new Date(
        new Date(_this.selected.initialtime).getUTCFullYear(),
        new Date(_this.selected.initialtime).getUTCMonth(),
        new Date(_this.selected.initialtime).getUTCDate(),
        _this.sliderWithLabel.data[idxValue],
        0,
        0,
        0
      ).toISOString()
      this.selected.timeSelected = date
      this.updateImage()
      // _this.$emit("dateSlide", {date: date, first: true});
    },
  },
}
</script>