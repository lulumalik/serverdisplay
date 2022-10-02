<template>
  <div>
    <img
      :src="
        'https://cdn.bmkg.go.id/DataMKG/MEWS/spartan/' +
        province +
        '_' +
        spartan +
        '_' +
        day +
        '.png'
      "
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: '00',
      spartan: 'ffmc',
      province: '36_indonesia',
      idTemplate: '',
    }
  },
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
    if (parentDisplay.production) {
      var setting = parentDisplay.responseDisplay.properties.allSetting
      var obj = parentDisplay.obj.idtemplate
      for (var i = 0; i < setting[obj].length; i++) {
        var el = setting[obj][i]
        var comp = el.key.split('_')[1]
        var key2 = el.key.split('_')[2]
        if (comp == 'WidgetSpartan') {
          if (key2 == 'spartan') {
            this.spartan = el.value.id
          } else if (key2 == 'province') {
            this.province = el.value.key
          } else if (key2 == 'day') {
            this.day = el.value.key
          }
        }
      }
    }
  },
}
</script>