<template>
  <div>
    <!-- <button @click="nuke">Nuclear Button</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: null
    }
  },
  mounted() {
    
  },
  methods: {
    async nuke() {
      // const res = await this.$axios.$get('role')
      // this.role = res.data
      // console.log(this.role)
      // var akun = [
      //   {
      //   username: 'Stasiun Meteorologi Kelas I Blang Bintang, Banda Aceh',
      //   email: 'blangbintang1@bmkg.go.id',
      //   password: 'blangbintang1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Cut Bau Maimun Saleh - Sabang',
      //   email: 'cutbaumaimunsaleh@bmkg.go.id',
      //   password: 'cutbaumaimunsaleh',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Kualanamu - Medan',
      //   email: 'kualanamu1@bmkg.go.id',
      //   password: 'kualanamu1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Balai Besar Wilayah I Medan',
      //   email: 'wilayah1medan@bmkg.go.id',
      //   password: 'medan111',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Sta. Met. Kelas II Minangkabau - Padang Pariaman',
      //   email: 'padangpariaman2@bmkg.go.id',
      //   password: 'padangpariaman2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Sultan Syarif Kasim II - Pekanbaru',
      //   email: 'sultansyarifkasim2@bmkg.go.id',
      //   password: 'sultansyarifkasim2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi  Kelas III Kijang - Tanjungpinang',
      //   email: 'tanjungpinang3@bmkg.go.id',
      //   password: 'tanjungpinang3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Hang Nadim - Batam',
      //   email: 'Hangnadim1@bmkg.go.id',
      //   password: 'Hangnadim1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas IV Tanjung Balai Karimun',
      //   email: 'Tanjungbalaikarium4@bmkg.go.id',
      //   password: 'Tanjungbalaikarium4',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Klimatologi Kelas I Bengkulu',
      //   email: 'Bengkulukelas1@bmkg.go.id',
      //   password: 'Bengkulukelas1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Sultan M. Badaruddin II - Palembang',
      //   email: 'palembang2@bmkg.go.id',
      //   password: 'palembang2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Sultan Thaha, Jambi',
      //   email: 'Sultanthaha1@bmkg.go.id',
      //   password: 'Sultanthaha1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Radin Inten II - Bandar Lampung',
      //   email: 'Radininten2@bmkg.go.id',
      //   password: 'Radininten2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Depati Amir - Pangkal Pinang',
      //   email: 'Depatiamir1@bmkg.go.id',
      //   password: 'Depatiamir1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Serang',
      //   email: 'Serangkelas1@bmkg.go.id',
      //   password: 'Serangkelas1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Balai Besar Wilayah II Ciputat',
      //   email: 'Ciputat2@bmkg.go.id',
      //   password: 'Ciputat2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Soekarno-Hatta - Cengkareng',
      //   email: 'SoekarnoHatta1@bmkg.go.id',
      //   password: 'SoekarnoHatta1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Maritim Tanjung Priok - Jakarta',
      //   email: 'Maritimtanjungpriok1@bmkg.go.id',
      //   password: 'Maritimtanjungpriok1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Ahmad Yani - Semarang',
      //   email: 'Ahmadyani2@bmkg.go.id',
      //   password: 'Ahmadyani2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Maritim Tanjung Mas - Semarang',
      //   email: 'Maritimtanjungmas2@bmkg.go.id',
      //   password: 'Maritimtanjungmas2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Geofisika Kelas I Yogyakarta',
      //   email: 'Yogyakarta1@bmkg.go.id',
      //   password: 'Yogyakarta1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Rahadi Oesman - Ketapang',
      //   email: 'Rahadioesman3@bmkg.go.id',
      //   password: 'Rahadioesman3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Supadio - Pontianak',
      //   email: 'Supadio1@bmkg.go.id',
      //   password: 'Supadio1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Juwata - Tarakan',
      //   email: 'Juwatatarakan3@bmkg.go.id',
      //   password: 'Juwatatarakan3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Tanjung Harapan - Tanjung Selor',
      //   email: 'Tanjungharapan3@bmkg.go.id',
      //   password: 'Tanjungharapan3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Syamsudin Noor - Banjarmasin',
      //   email: 'Syamsudinnoor2@bmkg.go.id',
      //   password: 'Syamsudinnoor2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Gusti Syamsir Alam - Kotabaru',
      //   email: 'Gustisyamsiralam3@bmkg.go.id',
      //   password: 'Gustisyamsiralam3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Iskandar - Pangkalan Bun',
      //   email: 'Iskandarpangkalanbun3@bmkg.go.id',
      //   password: 'Iskandarpangkalanbun3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Sepinggan - Balikpapan',
      //   email: 'Sepinggan1@bmkg.go.id',
      //   password: 'Sepinggan1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Kalimarau - Tanjung Redeb',
      //   email: 'Kalimarau3@bmkg.go.id',
      //   password: 'Kalimarau3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Temindung',
      //   email: 'Temindung3@bmkg.go.id',
      //   password: 'Temindung3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Juanda - Surabaya',
      //   email: 'Juanda11@bmkg.go.id',
      //   password: 'Juanda11',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Klimatologi Kelas II Karangploso - Malang',
      //   email: 'Karangploso2@bmkg.go.id',
      //   password: 'Karangploso2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Banyuwangi',
      //   email: 'Banyuwangi3@bmkg.go.id',
      //   password: 'Banyuwangi3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Ngurah Rai - Denpasar',
      //   email: 'Ngurahrai1@bmkg.go.id',
      //   password: 'Ngurahrai1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Balai Besar Wilayah III Denpasar',
      //   email: 'Denpasar3@bmkg.go.id',
      //   password: 'Denpasar3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Selaparang, Mataram, Lombok',
      //   email: 'Selaparang2@bmkg.go.id',
      //   password: 'Selaparang2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Sultan Muhammad Salahuddin - Bima',
      //   email: 'Sultanmuhammadsalahuddin3@bmkg.go.id',
      //   password: 'Sultanmuhammadsalahuddin3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II El Tari - Kupang',
      //   email: 'Eltari22@bmkg.go.id',
      //   password: 'Eltari22',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Umbu Mehang Kunda - Waingapu',
      //   email: 'Umbumehangkunda3@bmkg.go.id',
      //   password: 'Umbumehangkunda3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Met.eorologi Kelas III Fransiskus Xaverius Seda - Maumere',
      //   email: 'Fransiskus3@bmkg.go.id',
      //   password: 'Fransiskus3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Balai Besar Wilayah IV Makassar',
      //   email: 'Makassar4@bmkg.go,id',
      //   password: 'Makassar4',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Hasanuddin - Makassar',
      //   email: 'Hasanuddin1@bmkg.go.id',
      //   password: 'Hasanuddin1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas IV Pongtiku - Tana Toraja',
      //   email: 'Pongtiku4@bmkg.go.id',
      //   password: 'Pongtiku4',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Maritim Kelas II Paotere Makassar',
      //   email: 'Paoteremakassar2@bmkg.go.id',
      //   password: 'Paoteremakassar2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Mutiara SIS Al-Jufrie - Palu',
      //   email: 'Mutiara2@bmkg.go.id',
      //   password: 'Mutiara2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Sultan Bantilan - Tolitoli',
      //   email: 'Sultanbantilan3@bmkg.go.id',
      //   password: 'Sultanbantilan3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Maritim Kendari',
      //   email: 'Maritimkendari2@bmkg.go.id',
      //   password: 'Maritimkendari2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Sam Ratulangi - Manado',
      //   email: 'Samratulangi2@bmkg.go.id',
      //   password: 'Samratulangi2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Maritim Bitung',
      //   email: 'Maritimbitung2@bmkg.go.id',
      //   password: 'Maritimbitung2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Djalaluddin - Gorontalo',
      //   email: 'Djalaluddin@bmkg.go.id',
      //   password: 'Djalaluddin',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas II Pattimura - Ambon',
      //   email: 'Pattimura2@bmkg.go.id',
      //   password: 'Pattimura2',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas III Dumatubun - Tual',
      //   email: 'Dumatubun3@bmkg.go.id',
      //   password: 'Dumatubun3',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi  Kelas I Sultan Babullah - Ternate',
      //   email: 'Sultanbabullah1@bmkg.go.id',
      //   password: 'Sultanbabullah1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Geofisika Angkasa Pura Jayapura',
      //   email: 'Angkasapurajayapura@bmkg.go.id',
      //   password: 'Angkasapurajayapura',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'Stasiun Meteorologi Kelas I Frans Kaisiepo - Biak',
      //   email: 'Franskaisiepo1@bmkg.go.id',
      //   password: 'Franskaisiepo1',
      //   role: "62da5b5e86085485a9b60cca",
      // }]

      // var arrayobj = [{
      //   username: 'aceh',
      //   email: 'aceh_upt_1@bmkg.go.id',
      //   password: 'aceh_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // {
      //   username: 'medan',
      //   email: 'medan_upt_1@bmkg.go.id',
      //   password: 'medan_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // sumatera barat
      // {
      //   username: 'sumbar',
      //   email: 'sumbar_upt_1@bmkg.go.id',
      //   password: 'sumbar_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // pekanbaru
      // {
      //   username: 'pekanbaru',
      //   email: 'pekanbaru_upt_1@bmkg.go.id',
      //   password: 'pekanbaru_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tanjung pinang
      // {
      //   username: 'tanjungpinang',
      //   email: 'tanjungpinang_upt_1@bmkg.go.id',
      //   password: 'tanjungpinang_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // batam
      // {
      //   username: 'batam',
      //   email: 'batam_upt_1@bmkg.go.id',
      //   password: 'batam_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tanjungbalaikarimun
      // {
      //   username: 'tanjungbalaikarimun',
      //   email: 'tanjungbalaikarimun_upt_1@bmkg.go.id',
      //   password: 'tanjungbalaikarimun_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // bengkulu
      // {
      //   username: 'bengkulu',
      //   email: 'bengkulu@bmkg.go.id',
      //   password: 'bengkulu_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // palembang
      // {
      //   username: 'palembang',
      //   email: 'palembang_upt_1@bmkg.go.id',
      //   password: 'palembang_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // jambi
      // {
      //   username: 'jambi',
      //   email: 'jambi_upt_1@bmkg.go.id',
      //   password: 'jambi_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // lampung
      // {
      //   username: 'lampung',
      //   email: 'lampung_upt_1@bmkg.go.id',
      //   password: 'lampung_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // bangkabelitung
      // {
      //   username: 'bangkabelitung',
      //   email: 'bangkabelitung_upt_1@bmkg.go.id',
      //   password: 'bangkabelitung_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // banten
      // {
      //   username: 'banten',
      //   email: 'banten_upt_1@bmkg.go.id',
      //   password: 'banten_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // dkijakarta
      // {
      //   username: 'dkijakarta',
      //   email: 'dkijakarta_upt_1@bmkg.go.id',
      //   password: 'dkijakarta_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // semarang
      // {
      //   username: 'semarang',
      //   email: 'semarang_upt_1@bmkg.go.id',
      //   password: 'semarang_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // kalbar
      // {
      //   username: 'kalbar',
      //   email: 'kalbar_upt_1@bmkg.go.id',
      //   password: 'kalbar_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tarakan
      // {
      //   username: 'tarakan',
      //   email: 'tarakan_upt_1@bmkg.go.id',
      //   password: 'tarakan_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tanjungselor
      // {
      //   username: 'tanjungselor',
      //   email: 'tanjungselor_upt_1@bmkg.go.id',
      //   password: 'tanjungselor_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // //  banjarmasin
      // {
      //   username: 'banjarmasin',
      //   email: 'banjarmasin_upt_1@bmkg.go.id',
      //   password: 'banjarmasin_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // kotabaru
      // {
      //   username: 'kotabaru',
      //   email: 'kotabaru_upt_1@bmkg.go.id',
      //   password: 'kotabaru_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // pangkalanbun
      // {
      //   username: 'pangkalanbun',
      //   email: 'pangkalanbun_upt_1@bmkg.go.id',
      //   password: 'pangkalanbun_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // balikpapan
      // {
      //   username: 'balikpapan',
      //   email: 'balikpapan_upt_1@bmkg.go.id',
      //   password: 'balikpapan_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tanjungredeb
      // {
      //   username: 'tanjungredeb',
      //   email: 'tanjungredeb_upt_1@bmkg.go.id',
      //   password: 'tanjungredeb_upt_1',
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // temindung
      // {
      //   username: "temindung",
      //   email: "temindung_upt_1@bmkg.go.id",
      //   password: "temindung_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // surabaya
      // {
      //   username: "surabaya",
      //   email: "surabaya_upt_1@bmkg.go.id",
      //   password: "surabaya_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // malang
      // {
      //   username: "malang",
      //   email: "malang_upt_1@bmkg.go.id",
      //   password: "malang_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // banyuwangi
      // {
      //   username: "banyuwangi",
      //   email: "banyuwangi_upt_1@bmkg.go.id",
      //   password: "banyuwangi_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // denpasar
      // {
      //   username: "denpasar",
      //   email: "denpasar_upt_1@bmkg.go.id",
      //   password: "denpasar_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // lombok
      // {
      //   username: "lombok",
      //   email: "lombok_upt_1@bmkg.go.id",
      //   password: "lombok_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // bima
      // {
      //   username: "bima",
      //   email: "bima_upt_1@bmkg.go.id",
      //   password: "bima_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // kupang
      // {
      //   username: "kupang",
      //   email: "kupang_upt_1@bmkg.go.id",
      //   password: "kupang_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // waingpu
      // {
      //   username: "waingpu",
      //   email: "waingpu_upt_1@bmkg.go.id",
      //   password: "waingpu_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // maumere
      // {
      //   username: "maumere",
      //   email: "maumere_upt_1@bmkg.go.id",
      //   password: "maumere_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // labuanbajo
      // {
      //   username: "labuanbajo",
      //   email: "labuanbajo_upt_1@bmkg.go.id",
      //   password: "labuanbajo_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // pinrang
      // {
      //   username: "pinrang",
      //   email: "pinrang_upt_1@bmkg.go.id",
      //   password: "pinrang_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // makassar
      // {
      //   username: "makassar",
      //   email: "makassar_upt_1@bmkg.go.id",
      //   password: "makassar_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tanahtoraja
      // {
      //   username: "tanahtoraja",
      //   email: "tanahtoraja_upt_1@bmkg.go.id",
      //   password: "tanahtoraja_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // palu
      // {
      //   username: "palu",
      //   email: "palu_upt_1@bmkg.go.id",
      //   password: "palu_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // tolitoli
      // {
      //   username: "tolitoli",
      //   email: "tolitoli_upt_1@bmkg.go.id",
      //   password: "tolitoli_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // kendari
      // {
      //   username: "kendari",
      //   email: "kendari_upt_1@bmkg.go.id",
      //   password: "kendari_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // manado
      // {
      //   username: "manado",
      //   email: "manado_upt_1@bmkg.go.id",
      //   password: "manado_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // bitung
      // {
      //   username: "bitung",
      //   email: "bitung_upt_1@bmkg.go.id",
      //   password: "bitung_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // gorontalo
      // {
      //   username: "gorontalo",
      //   email: "gorontalo_upt_1@bmkg.go.id",
      //   password: "gorontalo_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // maluku
      // {
      //   username: "maluku",
      //   email: "maluku_upt_1@bmkg.go.id",
      //   password: "maluku_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // malukuutara
      // {
      //   username: "malukuutara",
      //   email: "malukuutara_upt_1@bmkg.go.id",
      //   password: "malukuutara_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // jayapura
      // {
      //   username: "jayapura",
      //   email: "jayapura_upt_1@bmkg.go.id",
      //   password: "jayapura_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // },
      // // biak
      // {
      //   username: "biak",
      //   email: "biak_upt_1@bmkg.go.id",
      //   password: "biak_upt_1",
      //   role: "62da5b5e86085485a9b60cca",
      // }
      // ]


      // akun.forEach( (obj) => {

      //   this.$axios
      //     .$post('user/create', obj)
      //     .then((res) => {
      //       console.log(obj.username)
      //     })
      //     .catch((err) => {
      //       console.log('err', obj)
      //     })

      // })
    }
  }
}
</script>

