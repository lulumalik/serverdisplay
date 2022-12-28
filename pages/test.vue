<template>
  <div>
    <button @click="nuke">Nuclear Button</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: null
    }
  },
  methods: {
    async nuke() {
      // const res = await this.$axios.$get('role')
      // this.role = res.data
      // console.log(this.role)
      var arrayobj = [{
        username: 'aceh',
        email: 'aceh_upt_1@bmkg.go.id',
        password: 'aceh_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      {
        username: 'medan',
        email: 'medan_upt_1@bmkg.go.id',
        password: 'medan_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // sumatera barat
      {
        username: 'sumbar',
        email: 'sumbar_upt_1@bmkg.go.id',
        password: 'sumbar_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // pekanbaru
      {
        username: 'pekanbaru',
        email: 'pekanbaru_upt_1@bmkg.go.id',
        password: 'pekanbaru_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // tanjung pinang
      {
        username: 'tanjungpinang',
        email: 'tanjungpinang_upt_1@bmkg.go.id',
        password: 'tanjungpinang_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // batam
      {
        username: 'batam',
        email: 'batam_upt_1@bmkg.go.id',
        password: 'batam_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // tanjungbalaikarimun
      {
        username: 'tanjungbalaikarimun',
        email: 'tanjungbalaikarimun_upt_1@bmkg.go.id',
        password: 'tanjungbalaikarimun_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // bengkulu
      {
        username: 'bengkulu',
        email: 'bengkulu@bmkg.go.id',
        password: 'bengkulu_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // palembang
      {
        username: 'palembang',
        email: 'palembang_upt_1@bmkg.go.id',
        password: 'palembang_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // jambi
      {
        username: 'jambi',
        email: 'jambi_upt_1@bmkg.go.id',
        password: 'jambi_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // lampung
      {
        username: 'lampung',
        email: 'lampung_upt_1@bmkg.go.id',
        password: 'lampung_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // bangkabelitung
      {
        username: 'bangkabelitung',
        email: 'bangkabelitung_upt_1@bmkg.go.id',
        password: 'bangkabelitung_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // banten
      {
        username: 'banten',
        email: 'banten_upt_1@bmkg.go.id',
        password: 'banten_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // dkijakarta
      {
        username: 'dkijakarta',
        email: 'dkijakarta_upt_1@bmkg.go.id',
        password: 'dkijakarta_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // semarang
      {
        username: 'semarang',
        email: 'semarang_upt_1@bmkg.go.id',
        password: 'semarang_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // kalbar
      {
        username: 'kalbar',
        email: 'kalbar_upt_1@bmkg.go.id',
        password: 'kalbar_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // tarakan
      {
        username: 'tarakan',
        email: 'tarakan_upt_1@bmkg.go.id',
        password: 'tarakan_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // tanjungselor
      {
        username: 'tanjungselor',
        email: 'tanjungselor_upt_1@bmkg.go.id',
        password: 'tanjungselor_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      //  banjarmasin
      {
        username: 'banjarmasin',
        email: 'banjarmasin_upt_1@bmkg.go.id',
        password: 'banjarmasin_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // kotabaru
      {
        username: 'kotabaru',
        email: 'kotabaru_upt_1@bmkg.go.id',
        password: 'kotabaru_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // pangkalanbun
      {
        username: 'pangkalanbun',
        email: 'pangkalanbun_upt_1@bmkg.go.id',
        password: 'pangkalanbun_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // balikpapan
      {
        username: 'balikpapan',
        email: 'balikpapan_upt_1@bmkg.go.id',
        password: 'balikpapan_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // tanjungredeb
      {
        username: 'tanjungredeb',
        email: 'tanjungredeb_upt_1@bmkg.go.id',
        password: 'tanjungredeb_upt_1',
        role: "62da5b5e86085485a9b60cca",
      },
      // temindung
      {
        username: "temindung",
        email: "temindung_upt_1@bmkg.go.id",
        password: "temindung_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // surabaya
      {
        username: "surabaya",
        email: "surabaya_upt_1@bmkg.go.id",
        password: "surabaya_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // malang
      {
        username: "malang",
        email: "malang_upt_1@bmkg.go.id",
        password: "malang_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // banyuwangi
      {
        username: "banyuwangi",
        email: "banyuwangi_upt_1@bmkg.go.id",
        password: "banyuwangi_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // denpasar
      {
        username: "denpasar",
        email: "denpasar_upt_1@bmkg.go.id",
        password: "denpasar_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // lombok
      {
        username: "lombok",
        email: "lombok_upt_1@bmkg.go.id",
        password: "lombok_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // bima
      {
        username: "bima",
        email: "bima_upt_1@bmkg.go.id",
        password: "bima_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // kupang
      {
        username: "kupang",
        email: "kupang_upt_1@bmkg.go.id",
        password: "kupang_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // waingpu
      {
        username: "waingpu",
        email: "waingpu_upt_1@bmkg.go.id",
        password: "waingpu_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // maumere
      {
        username: "maumere",
        email: "maumere_upt_1@bmkg.go.id",
        password: "maumere_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // labuanbajo
      {
        username: "labuanbajo",
        email: "labuanbajo_upt_1@bmkg.go.id",
        password: "labuanbajo_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // pinrang
      {
        username: "pinrang",
        email: "pinrang_upt_1@bmkg.go.id",
        password: "pinrang_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // makassar
      {
        username: "makassar",
        email: "makassar_upt_1@bmkg.go.id",
        password: "makassar_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // tanahtoraja
      {
        username: "tanahtoraja",
        email: "tanahtoraja_upt_1@bmkg.go.id",
        password: "tanahtoraja_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // palu
      {
        username: "palu",
        email: "palu_upt_1@bmkg.go.id",
        password: "palu_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // tolitoli
      {
        username: "tolitoli",
        email: "tolitoli_upt_1@bmkg.go.id",
        password: "tolitoli_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // kendari
      {
        username: "kendari",
        email: "kendari_upt_1@bmkg.go.id",
        password: "kendari_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // manado
      {
        username: "manado",
        email: "manado_upt_1@bmkg.go.id",
        password: "manado_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // bitung
      {
        username: "bitung",
        email: "bitung_upt_1@bmkg.go.id",
        password: "bitung_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // gorontalo
      {
        username: "gorontalo",
        email: "gorontalo_upt_1@bmkg.go.id",
        password: "gorontalo_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // maluku
      {
        username: "maluku",
        email: "maluku_upt_1@bmkg.go.id",
        password: "maluku_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // malukuutara
      {
        username: "malukuutara",
        email: "malukuutara_upt_1@bmkg.go.id",
        password: "malukuutara_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // jayapura
      {
        username: "jayapura",
        email: "jayapura_upt_1@bmkg.go.id",
        password: "jayapura_upt_1",
        role: "62da5b5e86085485a9b60cca",
      },
      // biak
      {
        username: "biak",
        email: "biak_upt_1@bmkg.go.id",
        password: "biak_upt_1",
        role: "62da5b5e86085485a9b60cca",
      }
      ]

      arrayobj.forEach((obj) => {
        this.$axios
          .$post('user/create', obj)
          .then((res) => {
            console.log(obj.username)
          })
          .catch((err) => {
            console.log('err', obj)
          })
      })
    }
  }
}
</script>

