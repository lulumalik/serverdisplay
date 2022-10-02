var baseurl = 'https://spartan.bmkg.go.id/'

export const spartan = [{
    name: 'Fine Fuel Moisture Code',
    id: 'ffmc',
}, {
    name: 'Duff Moisture Code',
    id: 'dmc',
}, {
    name: 'Drought Code',
    id: 'dc',
}, {
    name: 'Build Up Index',
    id: 'bui',
}, {
    name: 'Initial Spread Index',
    id: 'isi',
}, {
    name: 'Fire Weather Index',
    id: 'fwi',
}]

export const idToName = {
    'ffmc': 'Fine Fuel Moisture Code',
    'dmc': 'Duff Moisture Code',
    'dc': 'Drought Code',
    'bui': 'Build Up Index',
    'isi': 'Initial Spread Index',
    'fwi': 'Fire Weather Index',
}

export const penjelasanProduct = {
    "ffmc": 'FFMC menunjukkan tingkat potensi kemudahan terjadinya kebakaran ditinjau dari parameter cuaca pada bahan-bahan ringan mudah terbakar di lapisan atas permukaan tanah. Nilai FFMC mewakili tingkat kekeringan bahan-bahan ringan mudah terbakar (seperti humus permukaan, sampah dedaunan kering, alang-alang, dan bahan ringan lain) yang biasanya menutupi lantai hutan pada kedalaman 1-2 cm.',
    "dmc": "DMC menunjukkan tingkat potensi kemudahan terjadinya kebakaran ditinjau dari parameter cuaca pada bahan organik di lapisan menengah permukaan tanah dan bahan-bahan kayu ringan (ranting-ranting kecil, semak belukar berkayu) di permukaan tanah. Nilai DMC mewakili tingkat kekeringan lapisan tanah organik atau bahan kurang padat lain pada kedalaman 5-10 cm dan bahan-bahan kayu ringan (ranting-ranting kecil, semak belukar berkayu) di permukaan tanah.",
    "dc": "DC menunjukkan tingkat potensi kemudahan terjadinya kebakaran ditinjau dari parameter cuaca pada bahan organik padat di lapisan bawah permukaan tanah dan bahan-bahan kayu berat (seperti gelondongan kayu) di permukaan tanah. Nilai DC mewakili tingkat kekeringan lapisan tanah organik padat yang biasanya berada pada kedalaman >10 cm dan mewakili tingkat kekeringan bahan-bahan kayu berat (seperti gelondongan kayu) di permukaan tanah.",
    "bui": "BUI menunjukkan tingkat ketersediaan bahan organik mudah terbakar yang dihitung dari nilai DMC dan DC, umumnya lebih didominasi nilai DMC. Sedangkan nilai DC hanya berpengaruh ketika lapisan tanah padat di lapisan bawah permukaan tanah mulai kering.",
    "isi": "ISI menunjukkan tingkat kemudahan penyebaran api jika terjadi kebakaran hutan. Nilai ISI meningkat secara eksponensial terhadap kecepatan angin yang menjadi dua kali lipat setiap kenaikan kecepatan angin sebesar 13 km/jam (3.6 m/s). Nilai ISI sangat baik menggambarkan kemudahan penyebaran di area padang rumput atau alang-alang, dimana penyebaran api yang sangat cepat akibat kecepatan angin yang tinggi dapat membentuk pola kepala api (head fire).",
    "fwi": "FWI menunjukan besarnya intensitas api jika terjadi kebakaran hutan. Nilai FWI sangat dipengaruhi nilai ISI dan BUI.",
    "CMAX": "Merupakan produk radar cuaca yang menampilkan citra nilai maximum reflektifitas pada satu kolom udara yang ditampilkan secara horizontal, sehingga dapat terlihat dstribusi reflektifitas di suatu wilayah. Semakin tinggi nilai reflektifitas menandakan adanya partikel uap air yang banyak di atmmsfer.",
    "QPE 1h": "Merupakan produk akumulasi curah hujan di dekat permukaan bumi selama 1 jam, akumulasi ini didapat sesuai dengan resolusi temporal system radar cuaca (umumnya 10 menit). Satuan yang digunakan pada produk ini adalah mm/h, dimana satuan tersebut merupakan turunan dari nilai reflektifitas.",
    "QPE 24h": "Merupakan produk akumulasi curah hujan di dekat permukaan bumi selama 24 jam, akumulasi ini didapat sesuai dengan resolusi temporal system radar cuaca (umumnya 10 menit). Satuan yang digunakan pada produk ini adalah mm/h, dimana satuan tersebut merupakan turunan dari nilai reflektifitas.",
    "HWIND": "Merupakan produk yang menampilkan nilai arah dan kecepatan angin pada suatu ketinggian tertentu dalam bentuk windbarb. Produk ini berkaitan dengan pergerakan uap air di atmosfer selain itu produk ini didapat dari data velocity radar cuaca.",
    "Hotspot Indonesia": "Deteksi Hotspot (titik api) menggunakan sensor VIIRS dan MODIS pada satelit polar (NOAA20, S-NPP, TERRA dan AQUA) memberikan gambaran lokasi wilayah yang mengalami kebakaran hutan. Satelit akan mendeteksi anomali suhu panas dibandingkan dengan sekitarnya. Observasi ini dilakukan pada siang dan malam hari untuk masing-masing satelit. Pada daerah yang tertutup awan atau blank zone, hotspot di wilayah tersebut tidak dapat terdeteksi. Sumber data hotspot diperoleh dari LAPAN.",
    "Hotspot ASEAN": "Deteksi Hotspot (titik api) menggunakan sensor VIIRS dan MODIS pada satelit polar (NOAA20, S-NPP, TERRA dan AQUA) memberikan gambaran lokasi wilayah yang mengalami kebakaran hutan. Satelit akan mendeteksi anomali suhu panas dibandingkan dengan sekitarnya. Observasi ini dilakukan pada siang dan malam hari untuk masing-masing satelit. Pada daerah yang tertutup awan atau blank zone, hotspot di wilayah tersebut tidak dapat terdeteksi.Sumber data hotspot diperoleh dari FIRMS-NASA.",
    "GeoHotspot": "Potensi terjadinya kebakaran hutan dan lahan dapat teramati dengan citra satelit Himawari-8 dengan menggunakan data suhu kecerahan kanal infrared untuk filtering awan, serta menentukan anomali suhu panas yang menunjukkan potensi terjadi kebakaran hutan (titik merah).Informasi ini sebaiknya dibandingkan juga dengan citra Sebaran Asap untuk lebih memastikan didaerah tersebut benar terjadi kebakaran.",
    "Satellite Smoke": "Citra sebaran asap merupakan hasil analisis sebaran asap berdasarkan metode RGB (Red Green Blue) yang di overlay dengan arah dan kecepatan angin lapisan 1000 mb, dan titik panas berdasarkan GeoHotspot. Pada produk ini, wilayah sebaran asap di tandai dengan poligon berwarna merah. Oleh karena penggunaan kanal visibel pada kombinasi RGB, produk ini hanya tersedia pada siang hingga sore hari.",
    "Satellite": "Pada produk Himawari-8 EH menunjukkan suhu puncak awan yang didapat dari pengamatan radiasi pada panjang gelombang 10.4 mikrometer yang kemudian diklasifikasi dengan pewarnaan tertentu, dimana warna hitam atau biru menunjukkan tidak terdapat pembentukan awan yang banyak (cerah), sedangkan semakin dingin suhu puncak awan, dimana warna mendekati jingga hingga merah, menunjukan pertumbuhan awan yang signifikan dan berpotensi terbentuknya awan Cumulonimbus.",
    "24H Precipitation": "Estimasi curah hujan dapat diperoleh dengan memanfaatkan satelit geostasioner (sensor Infrared) dan satelit polar (sensor microwave). Produk ini menunjukan estimasi curah hujan (mm/jam) dalam 1 hari.",
    "Smoke Spread": "Prediksi sebaran asap ditampilkan dalam bentuk garis trayektori dimana asap akan berpotensi menyebar dalam 24 jam berdasarkan data prediksi angin lapisan permukaan, 100m di atas permukaan tanah, 1000 mb, dan 925 mb. Data diperbarui pada jam 07.00, 10.00, 13.00, 16.00, 19.00, 22.00, 01.00, dan 04.00 WIB.",
    "Global Forecast System (GFS)": "GFS merupakan model global yang digunakan BMKG dalam menganalisis kondisi atmosfer. Model GFS adalah model numerik yang diproduksi oleh NOAA dengan resolusi spasial 0.5 derajat dan resolusi temporal 3 jam. Model ini diproduksi setiap jam 00 dan 12 UTC. Waktu yang ditampilkan sebagai validity time adalah batas akhir dari prakiraan 3 jam (24 jam untuk presipitasi) sebelumnya, contoh: validity time adalah 03.00 UTC maka data yang ditampilkan adalah data rata-rata (atau akumulasi jika data presipitasi) antara jam 00 hingga 03 UTC.  ",
    "Wind Speed and Direction": "Parameter angin ditampilkan dalam bentuk nilai kecepatan (kontur berwarna) dalam knots dan arah angin (panah putih bergerak). Semakin panjang dan semakin cepat pergerakan panah putih, maka menandakan kecepatan angin di area tersebut semakin kencang. Parameter angin tersedia dalam berbagai lapisan tekanan atmosfer dari mulai lapisan permukaan hingga 100 milibar.",
    "Relative Humidity": "RH ditampilkan dalam satuan persen (%) yang menunjukkan kecenderungan massa udara untuk menjadi jenuh dan membentuk awan. Jika sebuah area memiliki nilai RH yang semakin mendekati nilai 100%, maka potensi pembentukan awan di area tersebut juga akan semakin besar. Parameter angin tersedia dalam berbagai lapisan tekanan atmosfer dari mulai lapisan permukaan hingga 100 milibar.",
    "Total Precipitation 24 Hour": "Presipitasi ditampilkan dalam bentuk akumulasi selama 24 jam terakhir dalam satuan mm/24 jam. Presipitasi secara sederhana bisa dianalogikan sebagai curah hujan yang kategorinya juga merujuk pada Peraturan BMKG bahwa 5-20 mm/24 jam: hujan ringan, 20-50 mm/24 jam: hujan sedang, 50-100 mm/24 jam: hujan lebat, dan 100 mm/24 jam: hujan ekstrem.",
    "FDRS Gambut BRGM": "Model sistem peringatan dini kebakaran (Fire Danger Rating System ~ FDRS) untuk lahan gambut. Indeks kebakaran untuk model FDRS ini dihitung berdasarkan pendekatan hidrometeorologis  menggunakan model modified Keetch-Bryam Drought Index (mKBDI). Pendekatan model ini mengkombinasikan parameter cuaca dan hidrologi dalam menilai bahaya kebakaran (fire hazard). Nilai mKBDI yang diperoleh kemudian dikelompokkan menjadi empat kategori Aman, Siaga, Bahaya dan Ekstrem di tujuh provinsi prioritas restorasi BRGM yaitu : Jambi, Riau, Sumatera Selatan, Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan dan Papua."
}

export const hari2 = [
    { key: 'obs', name: 'Observasi' },
    { key: '00', name: 'Prediksi H+0' },
    { key: '01', name: 'Prediksi H+1' },
    { key: '02', name: 'Prediksi H+2' },
    { key: '03', name: 'Prediksi H+3' },
    { key: '04', name: 'Prediksi H+4' },
    { key: '05', name: 'Prediksi H+5' },
    { key: '06', name: 'Prediksi H+6' },
    { key: '07', name: 'Prediksi H+7' },
]

export const code = [
    { key: '01_aceh', name: "NANGGROE ACEH DARUSSALAM" },
    { key: '02_sumut', name: "SUMATERA UTARA" },
    { key: '03_sumbar', name: "SUMATERA BARAT" },
    { key: '04_riau', name: "RIAU" },
    { key: '05_kepri', name: "KEPULAUAN RIAU" },
    { key: '06_jambi', name: "JAMBI" },
    { key: '07_bengkulu', name: "BENGKULU" },
    { key: '08_sumsel', name: "SUMATERA SELATAN" },
    { key: '09_babel', name: "KEPULAUAN BANGKA BELITUNG" },
    { key: '10_lampung', name: "LAMPUNG" },
    { key: '11_banten', name: "BANTEN" },
    { key: '12_dkijakarta', name: "DKI JAKARTA" },
    { key: '13_jabar', name: "JAWA BARAT" },
    { key: '14_jateng', name: "JAWA TENGAH" },
    { key: '15_jatim', name: "JAWA TIMUR" },
    { key: '16_yogya', name: "D.I. YOGYAKARTA" },
    { key: '17_bali', name: "BALI" },
    { key: '18_ntb', name: "NUSA TENGGARA BARAT" },
    { key: '19_ntt', name: "NUSA TENGGARA TIMUR" },
    { key: '20_kalbar', name: "KALIMANTAN BARAT" },
    { key: '21_kalsel', name: "KALIMANTAN SELATAN" },
    { key: '22_kalteng', name: "KALIMANTAN TENGAH" },
    { key: '23_kaltim', name: "KALIMANTAN TIMUR" },
    { key: '24_kalatara', name: "KALIMANTAN UTARA" },
    { key: '25_gorontalo', name: "GORONTALO" },
    { key: '26_sulbar', name: "SULAWESI BARAT" },
    { key: '27_sulsel', name: "SULAWESI SELATAN" },
    { key: '28_sultra', name: "SULAWESI TENGGARA" },
    { key: '29_sulteng', name: "SULAWESI TENGAH" },
    { key: '30_sulut', name: "SULAWESI UTARA" },
    { key: '31_maluku', name: "MALUKU" },
    { key: '32_malut', name: "MALUKU UTARA" },
    { key: '33_pabar', name: "PAPUA BARAT" },
    { key: '34_papua', name: "PAPUA" },
    { key: '35_asean', name: "ASEAN" },
    { key: '36_indonesia', name: "INDONESIA" },
    { key: '37_sumatera', name: "SUMATERA" },
    { key: '38_kalimantan', name: "KALIMANTAN" }
]

export const province = [{
        "id": "11",
        "name": "NANGGROE ACEH DARUSSALAM",
        "alt_name": "NANGGROE ACEH DARUSSALAM",
        "db_name": ["Aceh"],
        "latitude": 4.36855,
        "longitude": 97.0253,
        "zoom": 7
    },
    {
        "id": "90",
        "name": "NATIONAL",
        "alt_name": "NATIONAL",
        "db_name": ['NATIONAL'],
        "latitude": -2.5,
        "longitude": 116,
        "zoom": 5
    },
    {
        "id": "12",
        "name": "SUMATERA UTARA",
        "alt_name": "SUMATERA UTARA",
        "db_name": ["Sumatera Utara"],
        "latitude": 2.1153547,
        "longitude": 99.5450974,
        "zoom": 7
    },
    {
        "id": "13",
        "name": "SUMATERA BARAT",
        "alt_name": "SUMATERA BARAT",
        "db_name": ["Sumatera Barat"],
        "latitude": -1.34225,
        "longitude": 100.0761,
        "zoom": 7
    },
    {
        "id": "14",
        "name": "RIAU",
        "alt_name": "RIAU",
        "db_name": ["Riau"],
        "latitude": 0.50041,
        "longitude": 101.54758,
        "zoom": 7
    },
    {
        "id": "15",
        "name": "JAMBI",
        "alt_name": "JAMBI",
        "db_name": ["Jambi"],
        "latitude": -1.61157,
        "longitude": 102.7797,
        "zoom": 8
    },
    {
        "id": "16",
        "name": "SUMATERA SELATAN",
        "alt_name": "SUMATERA SELATAN",
        "db_name": ["Sumatera Selatan"],
        "latitude": -3.12668,
        "longitude": 104.09306,
        "zoom": 7
    },
    {
        "id": "17",
        "name": "BENGKULU",
        "alt_name": "BENGKULU",
        "db_name": ["Bengkulu"],
        "latitude": -3.51868,
        "longitude": 102.53598,
        "zoom": 8
    },
    {
        "id": "18",
        "name": "LAMPUNG",
        "alt_name": "LAMPUNG",
        "db_name": ["Lampung"],
        "latitude": -4.8555,
        "longitude": 105.0273,
        "zoom": 7
    },
    {
        "id": "19",
        "name": "KEPULAUAN BANGKA BELITUNG",
        "alt_name": "KEPULAUAN BANGKA BELITUNG",
        "db_name": ["Kepulauan Bangka Belitung"],
        "latitude": -2.725775,
        "longitude": 107.58394
    },
    {
        "id": "21",
        "name": "KEPULAUAN RIAU",
        "alt_name": "KEPULAUAN RIAU",
        "db_name": ["Kepulauan Riau"],
        "latitude": -0.15478,
        "longitude": 104.58037,
        "zoom": 7
    },
    {
        "id": "31",
        "name": "DKI JAKARTA",
        "alt_name": "DKI JAKARTA",
        "db_name": ["Dki Jakarta"],
        "latitude": -6.200000,
        "longitude": 106.816666,
        "zoom": 10
    }, {
        "id": "98",
        "name": "jabodetabek",
        "alt_name": "JABODETABEK",
        "db_name": ["Dki Jakarta", "Jawa Barat", "Banten"],
        "latitude": -6.3377862468927315,
        "longitude": 106.76165982945834,
        "zoom": 9.5
    },
    {
        "id": "32",
        "name": "JAWA BARAT",
        "alt_name": "JAWA BARAT",
        "db_name": ["Jawa Barat"],
        "latitude": -6.88917,
        "longitude": 107.64047,
        zoom: 9
    },
    {
        "id": "33",
        "name": "JAWA TENGAH",
        "alt_name": "JAWA TENGAH",
        "db_name": ["Jawa Tengah"],
        "latitude": -7.30324,
        "longitude": 110.00441
    },
    {
        "id": "34",
        "name": "D.I. YOGYAKARTA",
        "alt_name": "D.I. YOGYAKARTA",
        "db_name": ["Daerah Istimewa Yogyakarta"],
        "latitude": -7.7956,
        "longitude": 110.3695,
        "zoom": 9
    },
    {
        "id": "35",
        "name": "JAWA TIMUR",
        "alt_name": "JAWA TIMUR",
        "db_name": ["Jawa Timur"],
        "latitude": -7.5360639,
        "longitude": 112.2384017
    },
    {
        "id": "36",
        "name": "BANTEN",
        "alt_name": "BANTEN",
        "db_name": ["Banten"],
        "latitude": -6.44538,
        "longitude": 106.13756,
        "zoom": 9
    },
    {
        "id": "51",
        "name": "BALI",
        "alt_name": "BALI",
        "db_name": ["Bali"],
        "latitude": -8.43566,
        "longitude": 115.12239,
        "zoom": 9
    },
    {
        "id": "52",
        "name": "NUSA TENGGARA BARAT",
        "alt_name": "NUSA TENGGARA BARAT",
        "db_name": ["Nusa Tenggara Barat"],
        "latitude": -8.42179,
        "longitude": 117.63696
    },
    {
        "id": "53",
        "name": "NUSA TENGGARA TIMUR",
        "alt_name": "NUSA TENGGARA TIMUR",
        "db_name": ["Nusa Tenggara Timur"],
        "latitude": -8.56568,
        "longitude": 120.69786
    },
    {
        "id": "61",
        "name": "KALIMANTAN BARAT",
        "alt_name": "KALIMANTAN BARAT",
        "db_name": ["Kalimantan Barat"],
        "latitude": -0.13224,
        "longitude": 111.09689,
        "zoom": 7
    },
    {
        "id": "62",
        "name": "KALIMANTAN TENGAH",
        "alt_name": "KALIMANTAN TENGAH",
        "db_name": ["Kalimantan Tengah"],
        "latitude": -1.49958,
        "longitude": 113.29033,
        "zoom": 7
    },
    {
        "id": "63",
        "name": "KALIMANTAN SELATAN",
        "alt_name": "KALIMANTAN SELATAN",
        "db_name": ["Kalimantan Selatan"],
        "latitude": -2.74348,
        "longitude": 115.37565,
        "zoom": 8
    },
    {
        "id": "64",
        "name": "KALIMANTAN TIMUR",
        "alt_name": "KALIMANTAN TIMUR",
        "db_name": ["Kalimantan Timur"],
        "latitude": 0.38844,
        "longitude": 116.242,
        "zoom": 7
    },
    {
        "id": "65",
        "name": "KALIMANTAN UTARA",
        "alt_name": "KALIMANTAN UTARA",
        "db_name": ["Kalimantan Utara"],
        "latitude": 2.72594,
        "longitude": 116.911,
        "zoom": 7
    },
    {
        "id": "71",
        "name": "SULAWESI UTARA",
        "alt_name": "SULAWESI UTARA",
        "db_name": ["Sulawesi Utara"],
        "latitude": 0.65557,
        "longitude": 124.09015
    },
    {
        "id": "72",
        "name": "SULAWESI TENGAH",
        "alt_name": "SULAWESI TENGAH",
        "db_name": ["Sulawesi Tengah"],
        "latitude": -1.39378,
        "longitude": 120.80886,
        "zoom": 7
    },
    {
        "id": "73",
        "name": "SULAWESI SELATAN",
        "alt_name": "SULAWESI SELATAN",
        "db_name": ["Sulawesi Selatan"],
        "latitude": -3.64467,
        "longitude": 119.94719,
        "zoom": 7
    },
    {
        "id": "74",
        "name": "SULAWESI TENGGARA",
        "alt_name": "SULAWESI TENGGARA",
        "db_name": ["Sulawesi Tenggara"],
        "latitude": -3.84912,
        "longitude": 121.72796,
        "zoom": 8
    },
    {
        "id": "75",
        "name": "GORONTALO",
        "alt_name": "GORONTALO",
        "db_name": ["Gorontalo"],
        "latitude": 0.71862,
        "longitude": 122.45559
    },
    {
        "id": "76",
        "name": "SULAWESI BARAT",
        "alt_name": "SULAWESI BARAT",
        "db_name": ["Sulawesi Barat"],
        "latitude": -2.29745,
        "longitude": 119.3919
    },
    {
        "id": "81",
        "name": "MALUKU",
        "alt_name": "MALUKU",
        "db_name": ["Maluku"],
        "latitude": -3.11884,
        "longitude": 129.42078
    },
    {
        "id": "82",
        "name": "MALUKU UTARA",
        "alt_name": "MALUKU UTARA",
        "db_name": ["Maluku Utara"],
        "latitude": 0.63012,
        "longitude": 127.97202,
        "zoom": 7
    },
    {
        "id": "91",
        "name": "PAPUA BARAT",
        "alt_name": "PAPUA BARAT",
        "db_name": ["Papua Barat"],
        "latitude": -1.88424,
        "longitude": 132.90253,
        "zoom": 7
    },
    {
        "id": "94",
        "name": "PAPUA",
        "alt_name": "PAPUA",
        "db_name": ["Papua"],
        "latitude": -3.98857,
        "longitude": 138.34853,
        "zoom": 6
    },
    {
        "id": "99",
        "name": "PAPUA",
        "alt_name": "PAPUA",
        "db_name": ["Timor Leste"],
        "latitude": -3.98857,
        "longitude": 138.34853,
        "zoom": 6
    }
]

export const legend = {
    "dBZ": {
        "var1": "dBZ",
        "datatype": "only2d"
    },
    "dBZ_iso": {
        "var1": "dBZ",
        "datatype": "mag",
        "dimtype": "2dterbalik",
        "baserunIsDTN": true,
        "levels": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
        "iso_skip_value": 1,
        "sigma": null,
        "epsilon": 0,
        "iso_sv": 7,
        "point": false,
        "color": [
            [5, 1, 209, 248, 255],
            [10, 2, 78, 252, 255],
            [15, 2, 128, 134, 255],
            [20, 0, 230, 0, 255],
            [25, 0, 178, 0, 255],
            [30, 129, 204, 0, 255],
            [35, 255, 225, 3, 255],
            [40, 249, 162, 5, 255],
            [45, 250, 58, 7, 255],
            [50, 222, 0, 0, 255],
            [55, 176, 1, 1, 255],
            [60, 205, 0, 141, 255],
            [65, 196, 0, 255, 255]
        ]
    },
    "EH": {
        "var1": "IR",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [173.15, 233, 63, 51, 255],
            [193.15, 234, 87, 89, 255],
            [198.15, 248, 212, 182, 255],
            [204.15, 246, 194, 140, 255],
            [211.15, 242, 158, 51, 255],
            [217.15, 235, 91, 51, 255],
            [225.15, 206, 155, 41, 255],
            [232.15, 194, 188, 35, 255],
            [239.15, 157, 212, 19, 255],
            [245.15, 132, 242, 1, 255],
            [252.15, 118, 231, 133, 255],
            [260.15, 95, 193, 146, 255],
            [266.15, 68, 175, 251, 255],
            [273.15, 74, 135, 251, 255],
            [281.15, 53, 98, 180, 255],
            [287.15, 16, 72, 128, 255],
            [294.15, 0, 0, 0, 0]
        ]
    },

    "hth": {
        "var1": "hth",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0, 0, 255, 1, 255],
            [0.9, 187, 249, 150, 255],
            [4.9, 249, 251, 56, 255],
            [9.9, 227, 155, 9, 255],
            [19.9, 110, 75, 21, 255],
            [29.9, 254, 185, 188, 255],
            [59.9, 176, 28, 28, 255]
        ]
    },

    "smoke": {
        "color": [
            ['925 mb', 122, 134, 255],
            ['1000 mb', 237, 229, 133],
            ['100 m', 244, 136, 142],
            ['10 m', 239, 106, 179]
        ]
    },

    "visibility": {
        "color": [
            ['> 8 km', 62, 235, 83],
            ['4.8 km - 8 km', 3, 193, 217],
            ['1.6 km - 4.8 km', 243, 221, 47],
            ['< 1.6 km', 240, 0, 1]
        ]
    },

    radar: {
        color: [
            // [0, 255, 255, 255],
            [5, 1, 209, 248],
            [10, 2, 78, 252],
            [15, 2, 128, 134],
            [20, 0, 230, 0],
            [25, 0, 178, 0],
            [30, 129, 204, 0],
            [35, 255, 225, 3],
            [40, 249, 162, 5],
            [45, 250, 58, 7],
            [50, 222, 0, 0],
            [55, 176, 1, 1],
            [60, 205, 0, 141],
            [65, 196, 0, 255],
        ],
        satuan: "dbz",
    },

    "precip": {
        "var1": "precip",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [5, 4, 253, 3, 255],
            [20, 254, 254, 10, 255],
            [50, 255, 158, 0, 255],
            [100, 253, 0, 2, 255],
            [150, 240, 20, 190, 255]
        ]
    },
    "BRG": {
        "var1": "ffmc",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 73],
            [75, 76, 230, 0, 78],
            [150, 255, 255, 1, 82],
            [225, 255, 0, 0, null]
        ]
    },
    "ffmc": {
        "var1": "ffmc",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 73],
            [73, 76, 230, 0, 78],
            [78, 255, 255, 1, 82],
            [82, 255, 0, 0, null]
        ]
    },
    "bui": {
        "var1": "bui",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 7],
            [7, 76, 230, 0, 20],
            [20, 255, 255, 1, 33],
            [33, 255, 0, 0, null]
        ]
    },
    "dc": {
        "var1": "dc",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 141],
            [141, 76, 230, 0, 261],
            [261, 255, 255, 1, 350],
            [350, 255, 0, 0, null]
        ]
    },
    "dmc": {
        "var1": "dmc",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 5],
            [5, 76, 230, 0, 15],
            [15, 255, 255, 1, 29],
            [29, 255, 0, 0, null]
        ]
    },
    "fwi": {
        "var1": "fwi",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 2],
            [2, 76, 230, 0, 7],
            [7, 255, 255, 1, 13],
            [13, 255, 0, 0, null]
        ]
    },
    "isi": {
        "var1": "isi",
        "datatype": "mag",
        "baserunIsDTN": true,
        "color": [
            [0.000001, 0, 111, 255, 2],
            [2, 76, 230, 0, 4],
            [4, 255, 255, 1, 5],
            [5, 255, 0, 0, null]
        ]
    },
    "HIMA_EH": {
        color: [
            // [0, 255, 255, 255],
            [5, 1, 209, 248],
            [10, 2, 78, 252],
            [15, 2, 128, 134],
            [20, 0, 230, 0],
            [25, 0, 178, 0],
            [30, 129, 204, 0],
            [35, 255, 225, 3],
            [40, 249, 162, 5],
            [45, 250, 58, 7],
            [50, 222, 0, 0],
            [55, 176, 1, 1],
            [60, 205, 0, 141],
            [65, 196, 0, 255],

        ],
        interval: 1,
        max: 400,
        min: 0,
        transparent: true
    },
    'QPE24h': {
        "color": [
            [0.1, 0, 0, 199, 255],
            [1, 0, 121, 255, 255],
            [2, 50, 200, 255, 255],
            [5, 120, 235, 255, 255],
            [7, 255, 255, 255, 255],
            [9, 255, 247, 192, 255],
            [10, 255, 22, 0, 255],
            [12, 255, 115, 0, 255],
            [15, 255, 63, 0, 255],
            [20, 200, 0, 0, 255],
            [30, 150, 0, 0, 255]
        ],
        interval: 1,
        max: 400,
        min: 0,
        transparent: true
    },
    'QPE1h': {
        "color": [
            [0.1, 0, 0, 199, 255],
            [1, 0, 121, 255, 255],
            [2, 50, 200, 255, 255],
            [5, 120, 235, 255, 255],
            [7, 255, 255, 255, 255],
            [9, 255, 247, 192, 255],
            [10, 255, 22, 0, 255],
            [12, 255, 115, 0, 255],
            [15, 255, 63, 0, 255],
            [20, 200, 0, 0, 255],
            [30, 150, 0, 0, 255]
        ],
        interval: 1,
        max: 400,
        min: 0,
        transparent: true
    },
}