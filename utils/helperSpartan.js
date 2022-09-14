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

export const province = [{
        "id": "11",
        "name": "ACEH",
        "alt_name": "ACEH",
        "latitude": 4.36855,
        "longitude": 97.0253
    },
    {
        "id": "12",
        "name": "SUMATERA UTARA",
        "alt_name": "SUMATERA UTARA",
        "latitude": 2.19235,
        "longitude": 99.38122
    },
    {
        "id": "13",
        "name": "SUMATERA BARAT",
        "alt_name": "SUMATERA BARAT",
        "latitude": -1.34225,
        "longitude": 100.0761
    },
    {
        "id": "14",
        "name": "RIAU",
        "alt_name": "RIAU",
        "latitude": 0.50041,
        "longitude": 101.54758
    },
    {
        "id": "15",
        "name": "JAMBI",
        "alt_name": "JAMBI",
        "latitude": -1.61157,
        "longitude": 102.7797
    },
    {
        "id": "16",
        "name": "SUMATERA SELATAN",
        "alt_name": "SUMATERA SELATAN",
        "latitude": -3.12668,
        "longitude": 104.09306
    },
    {
        "id": "17",
        "name": "BENGKULU",
        "alt_name": "BENGKULU",
        "latitude": -3.51868,
        "longitude": 102.53598
    },
    {
        "id": "18",
        "name": "LAMPUNG",
        "alt_name": "LAMPUNG",
        "latitude": -4.8555,
        "longitude": 105.0273
    },
    {
        "id": "19",
        "name": "KEPULAUAN BANGKA BELITUNG",
        "alt_name": "KEPULAUAN BANGKA BELITUNG",
        "latitude": -2.75775,
        "longitude": 107.58394
    },
    {
        "id": "21",
        "name": "KEPULAUAN RIAU",
        "alt_name": "KEPULAUAN RIAU",
        "latitude": -0.15478,
        "longitude": 104.58037
    },
    {
        "id": "31",
        "name": "DKI JAKARTA",
        "alt_name": "DKI JAKARTA",
        "latitude": 6.1745,
        "longitude": 106.8227
    },
    {
        "id": "32",
        "name": "JAWA BARAT",
        "alt_name": "JAWA BARAT",
        "latitude": -6.88917,
        "longitude": 107.64047
    },
    {
        "id": "33",
        "name": "JAWA TENGAH",
        "alt_name": "JAWA TENGAH",
        "latitude": -7.30324,
        "longitude": 110.00441
    },
    {
        "id": "34",
        "name": "DI YOGYAKARTA",
        "alt_name": "DI YOGYAKARTA",
        "latitude": 7.7956,
        "longitude": 110.3695
    },
    {
        "id": "35",
        "name": "JAWA TIMUR",
        "alt_name": "JAWA TIMUR",
        "latitude": -6.96851,
        "longitude": 113.98005
    },
    {
        "id": "36",
        "name": "BANTEN",
        "alt_name": "BANTEN",
        "latitude": -6.44538,
        "longitude": 106.13756
    },
    {
        "id": "51",
        "name": "BALI",
        "alt_name": "BALI",
        "latitude": -8.23566,
        "longitude": 115.12239
    },
    {
        "id": "52",
        "name": "NUSA TENGGARA BARAT",
        "alt_name": "NUSA TENGGARA BARAT",
        "latitude": -8.12179,
        "longitude": 117.63696
    },
    {
        "id": "53",
        "name": "NUSA TENGGARA TIMUR",
        "alt_name": "NUSA TENGGARA TIMUR",
        "latitude": -8.56568,
        "longitude": 120.69786
    },
    {
        "id": "61",
        "name": "KALIMANTAN BARAT",
        "alt_name": "KALIMANTAN BARAT",
        "latitude": -0.13224,
        "longitude": 111.09689
    },
    {
        "id": "62",
        "name": "KALIMANTAN TENGAH",
        "alt_name": "KALIMANTAN TENGAH",
        "latitude": -1.49958,
        "longitude": 113.29033
    },
    {
        "id": "63",
        "name": "KALIMANTAN SELATAN",
        "alt_name": "KALIMANTAN SELATAN",
        "latitude": -2.94348,
        "longitude": 115.37565
    },
    {
        "id": "64",
        "name": "KALIMANTAN TIMUR",
        "alt_name": "KALIMANTAN TIMUR",
        "latitude": 0.78844,
        "longitude": 116.242
    },
    {
        "id": "65",
        "name": "KALIMANTAN UTARA",
        "alt_name": "KALIMANTAN UTARA",
        "latitude": 2.72594,
        "longitude": 116.911
    },
    {
        "id": "71",
        "name": "SULAWESI UTARA",
        "alt_name": "SULAWESI UTARA",
        "latitude": 0.65557,
        "longitude": 124.09015
    },
    {
        "id": "72",
        "name": "SULAWESI TENGAH",
        "alt_name": "SULAWESI TENGAH",
        "latitude": -1.69378,
        "longitude": 120.80886
    },
    {
        "id": "73",
        "name": "SULAWESI SELATAN",
        "alt_name": "SULAWESI SELATAN",
        "latitude": -3.64467,
        "longitude": 119.94719
    },
    {
        "id": "74",
        "name": "SULAWESI TENGGARA",
        "alt_name": "SULAWESI TENGGARA",
        "latitude": -3.54912,
        "longitude": 121.72796
    },
    {
        "id": "75",
        "name": "GORONTALO",
        "alt_name": "GORONTALO",
        "latitude": 0.71862,
        "longitude": 122.45559
    },
    {
        "id": "76",
        "name": "SULAWESI BARAT",
        "alt_name": "SULAWESI BARAT",
        "latitude": -2.49745,
        "longitude": 119.3919
    },
    {
        "id": "81",
        "name": "MALUKU",
        "alt_name": "MALUKU",
        "latitude": -3.11884,
        "longitude": 129.42078
    },
    {
        "id": "82",
        "name": "MALUKU UTARA",
        "alt_name": "MALUKU UTARA",
        "latitude": 0.63012,
        "longitude": 127.97202
    },
    {
        "id": "91",
        "name": "PAPUA BARAT",
        "alt_name": "PAPUA BARAT",
        "latitude": -1.38424,
        "longitude": 132.90253
    },
    {
        "id": "94",
        "name": "PAPUA",
        "alt_name": "PAPUA",
        "latitude": -3.98857,
        "longitude": 138.34853
    }
]