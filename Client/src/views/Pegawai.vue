

<template>

  <div class="bg-white h-screen">

    <div class="w-full h-[5rem] flex justify-between items-center px-2">

      <button class="relative group flex z-20 w-[2.4rem] h-[2.5rem] bg-white rounded-md focus:animate-jump border border-birut">
  <img src="../assets/sort2.png" alt="" class="w-6 h-6 object-contain m-auto">
  
  <!-- Dropdown utama -->
  <div class="absolute top-2 -right-[8rem] hidden group-focus:flex w-[7rem] h-[6rem] bg-birut p-2 rounded-md">
    <ul class="text-white flex flex-col justify-center items-center m-auto w-[5rem]">
      <li @click="time" class="relative hover:bg-white hover:text-birut w-full ">
        Waktu
        <div  :class=" tim ? 'absolute  top-2 -right-[8rem] bg-birut w-[7rem] p-2 rounded-md animate-ajukan' : 'hidden' ">
          <ul class=" text-white  flex flex-col justify-center items-center">
            <li @click="filterByTime('today')" class="hover:bg-white hover:text-birut w-full">Hari ini</li>
            <li @click="filterByTime('thisWeek')" class="hover:bg-white hover:text-birut w-full">Minggu ini</li>
            <li  @click="filterByTime('thisMonth')" class="hover:bg-white hover:text-birut w-full">Bulan ini</li>
          </ul>
        </div>
      </li>
      
      <!-- Gender dengan submenu -->
      <li @click="gender" class="relative hover:bg-white hover:text-birut w-full ">
        Gender
        <div  :class=" gen ? 'absolute  top-2 -right-[8rem] bg-birut w-[7rem] p-2 rounded-md animate-ajukan' : 'hidden' ">
          <ul class=" text-white  flex flex-col justify-center items-center">
            <li  @click="filterByGender('laki-laki')" class="hover:bg-white hover:text-birut w-full">Laki-Laki</li>
            <li  @click="filterByGender('perempuan')" class="hover:bg-white hover:text-birut w-full">Perempuan</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</button>


      <div class="flex w-[23rem] h-[4rem] justify-center items-center gap-2">
                  
        <button @click="displayAjukan" class=" flex w-[6rem] h-[2.5rem] bg-white rounded-md border-2 border-birut2 hover:bg-birut  focus:animate-jump text-birut2 hover:text-white ">
              <h1 class=" mx-auto text-md font-semibold "> <span class="text-xl">+</span> Tambah</h1>
        </button>

        <div class="w-[15rem] h-[2.5rem] flex ">
            
            <form class=" w-[15rem] h-[3rem] m-auto">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Cari</label>
                <div class="relative z-20">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" v-model="cari" id="default-search" class="block w-full p-[10px] ps-10 text-sm text-biru border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Cari pegawai..." required />
             
                    <div :class="{ 'hidden':!cari , 'block w-[15rem] max-h-[10rem] bg-birut p-2 overflow-auto' : cari}" class="absolute">
                      <div class="flex item fruit" v-for="fruit in filteredList()" :key="fruit">
                        <p class="text-white">{{ fruit.nama }}</p>
                      </div>
                      <div class="item error" v-if="cari&&!filteredList().length">
                        <p>Data tidak ditemukan!</p>
                      </div>
                    </div>
                </div>
            </form>

          </div>



      </div>

    </div>

    <div class="relative overflow-x-auto px-2 pt-5 z-10">

      
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-birut2 uppercase ">
          <tr class="bg-birut3">
            <th scope="col" class="px-4 py-3">No.</th>
            <th 
            scope="col" 
            class="px-5 py-3 cursor-pointer flex justify-start gap-2 items-center"
            @click="sortData('nama')"
          >
            <h1>Nama</h1> <span v-if="sortColumn === 'nama'">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span><span v-if="!sortColumn"><img src="../assets/filter.png" class="w-3 h-3 object-contain " alt=""></span>
          </th>
            <th scope="col" class="px-6 py-3">Gender</th>
            <th scope="col" class="px-6 py-3">Jabatan</th>
            <th scope="col" class="px-6 py-3">NIK</th>
            <th scope="col" class="px-6 py-3">Alamat</th>
            <th scope="col" class="px-6 py-3">No Tlp</th>
        </tr>
        </thead>


        <tbody>

          <tr class="bg-white " v-for="(item, index) in filteredAndSortedPegawaiData" :key="item.id" >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{{ index+1 }}</th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{{ item.nama }}</th>
            <th class="px-4 py-4">{{ item.gender }}</th>
            <th class="px-6 py-4">{{ item.jabatan }}</th>
            <th class="px-6 py-4">{{ item.nik }}</th>
            <th class="px-6 py-4">{{ item.alamat }}</th>
            <th class="px-6 py-4">{{ item.no }}</th>
          </tr>
        </tbody>
      </table>

    </div>
      
      


      <!-- Tambah Data -->
      <figure  v-show="PopAjukan"  class="flex justify-center items-center  z-10 fixed top-[5rem] left-0 md:top-[1rem] md:left-[1rem] w-full  h-[40rem]  animate-ajukan" >
        <div class="flex justify-center items-center  relative w-[23rem] md:w-[44rem] h-[40rem] md:h-[35rem] bg-birut rounded-xl ">
              <button @click="closePopup" class="  w-[2.2rem] h-[2rem] font-bold text-xl absolute rounded-full bg-white right-[.4rem] md:right-3 top-[.5rem] md:top-[1rem] hover:text-red">X</button>
   
              <form @submit.prevent="SubmitService">
                <article v-show="!SlideBerhasil" class="flex flex-col justify-center items-center h-full md:h-[32rem] w-full gap-2 mt-[3rem] md:mt-2">

                  <div class="flex flex-col md:flex-row md:justify-center items-center h-full w-full md:w-[40rem] space-y-2 px-2">
                    
                    <!-- Kiri -->
                    <div class="flex flex-col justify-around items-center  w-full md:w-1/2 gap-2 h-[16rem] md:h-[30rem]">
                      <div class="max-w-sm mx-auto h-">
                        <h1 class="md:w-[20rem] text-center text-white">Masukan Foto Anda</h1>
                      </div>
                      <div class="flex md:flex-col mx-auto p-4 max-h-ms text-white">
                        <div
                          class="flex justify-center items-center drop-area border-2 border-dashed border-gray-600 p-6 text-center cursor-pointer h-[11rem] w-[12rem] md:w-full"
                          :class="{ 'bg-gray-100 border-gray-600 ': isDragging }"
                          @dragenter.prevent="handleDragEnter"
                          @dragover.prevent="handleDragOver"
                          @dragleave.prevent="handleDragLeave"
                          @drop.prevent="handleDrop"
                          @click="triggerFileInput"
                        >
                          <p>Letakan gambar anda disini</p>
                          <input
                            type="file"
                            class="hidden"
                            ref="fileInput"
                            @change="handleFiles"
                            accept="image/*"
                          />
                        </div>
                        <div class="md:mt-4 flex flex-col justify-center items-center md:justify-start md:flex-row gap-4 w-[8rem] md:w-full" v-if="preview.length">
                          <div v-for="(image, index) in preview" :key="index" class="w-1/3">
                            <img :src="image" class="w-full h-auto object-cover" />
                          </div>
                        </div>
                      </div>

                      <div class="text-black flex  ">
                        <button type="submit" class=" px-10 text-xl rounded-md bg-black text-white border-2 border-white focus:animate-jump ">Save</button>
                      </div>
                    </div>

                    <!-- Kanan -->
                    <div class="flex flex-col gap-5 justify-center items-center md:w-[20rem]w-full">
           
                      <div class="w-[15rem] h-[4rem]">
                          <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                          <input v-model="pegawai.nama" type="text" id="nama" class=" text-sm rounded-lg focus:ring-birut focus:border-birut block w-[15rem] p-2.5 " placeholder="" required />
                      </div>
                      <div class="w-[15rem] h-[4rem]">
                          <label for="nik" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK</label>
                          <input v-model="pegawai.nik" type="text" id="nik" class=" text-sm rounded-lg focus:ring-birut focus:border-birut block w-[15rem] p-2.5 " placeholder="" required />
                      </div>
         
                      <div class="w-[15rem] h-[4rem]">
                          <label for="alamat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                          <input v-model="pegawai.alamat" type="text" id="alamat" class=" text-sm rounded-lg focus:ring-birut focus:border-birut block w-[15rem] p-2.5 " placeholder="" required />
                      </div>
                      
                      <div class="w-[15rem] h-[4rem]">
                          <label for="jabatan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan</label>
                          <input v-model="pegawai.jabatan" type="text" id="jabatan" class=" text-sm rounded-lg focus:ring-birut focus:border-birut block w-[15rem] p-2.5 " placeholder="" required />
                      </div>
                      
                      <div class="w-[15rem] h-[4rem]">
                          <label for="no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Telp</label>
                          <input v-model="pegawai.no" type="number" id="no" class=" text-sm rounded-lg focus:ring-birut focus:border-birut block w-[15rem] p-2.5 " placeholder="" required />
                      </div>
    
                      <div class="w-[15rem] h-[4rem]">
                          <label for="nik" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                          <select v-model="pegawai.gender" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
                            <option selected></option>
                            <option value="laki-laki">Laki-Laki</option>
                            <option value="perempuan">Perempuan</option>
                          </select>
                      </div>

                    </div>
                  </div>
                </article>
              </form>


              <article v-show="SlideBerhasil" id="Berhasil"  class="flex flex-col justify-center items-center bg- h-full w-full m-4 gap-10">
                <div class="text-white text-center">
                  <h1 class="text-kuning2 font-Poppins">Barang anda diperoses</h1>
                  
                </div>
                                

                <div class="w-full max-w-[16rem]">
                  <div class="relative">
                    <label for="npm-install-copy-button" class="sr-only">Label</label>
                    <div class="cop">
                      <input 
                      id="npm-install-copy-button"
                      type="text"
                      class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :value='koderahasia'
                      readonly
                    />
                    </div>

                    <button 
                      @click="copyToClipboard"
                      @mouseenter="showTooltip = true"
                      @mouseleave="showTooltip = false"
                      class=" absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                    >
                      <span v-if="!isCopied" id="default-icon">
                        <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                        </svg>
                      </span>
                      <span v-if="isCopied" id="success-icon" class="inline-flex items-center">
                        <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                      </span>
                    </button>
                    <div v-if="showTooltip" role="tooltip" class="  absolute z-10 flex  py-2 text-sm font-medium text-white w-[8rem] -right-10 -top-10
                              transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700" :class="{'opacity-100': showTooltip}">
                      <span v-if="!isCopied" id="" class="mx-auto">Copy to clipboard</span>
                      <span v-if="isCopied" id="" class="mx-auto">Copied!</span>
                     
                    </div>
                  </div>
                  <h1 class="text-center mt-2 text-abu">Berikut code <span class="text-gray-300">REVERASI</span> anda</h1>
                </div>
                
              </article>

        </div>
    </figure>


    </div>




</template>

<script >
import { ref } from 'vue'
import axiosClient from '../axiosClient';
import axiosClient2 from '../axiosClient2';




export default {

  data() {
    return {
      pegawaiData: [],
      datas2: [], // Data dari API kedua
     
      matchedData: [], // Data yang sesuai

      PopAjukan : false,
      SlideBerhasil : false,
      isDragging: false,
      pegawai: {
        nama: '',
        nik: '',
        foto: [],
        gender:'',
        alamat:'',
        no:'',
        jabatan:'',
          
      },
      preview: [],

      cari : '',
      gen: false ,
      tim: false ,
      sortColumn: '',
      sortDirection: 'asc',
      filterTime: '',
      filterGender: '',
    };
  },

  computed : {

    filteredAndSortedPegawaiData() {
      // Filtering berdasarkan waktu
      let filteredData = this.pegawaiData;
      if (this.filterTime === 'today') {
        const today = new Date().toISOString().slice(0, 10);
        filteredData = filteredData.filter(item => item.waktu.startsWith(today));
      } else if (this.filterTime === 'thisWeek') {
        const startOfWeek = this.getStartOfWeek(new Date());
        filteredData = filteredData.filter(item => new Date(item.waktu) >= startOfWeek);
      } else if (this.filterTime === 'thisMonth') {
        const thisMonth = new Date().toISOString().slice(0, 7);
        filteredData = filteredData.filter(item => item.waktu.startsWith(thisMonth));
      }

      if (this.filterGender === 'laki-laki'){
        filteredData = filteredData.filter(item => item.gender === 'laki-laki')
      } else if (this.filterGender === 'perempuan'){
        filteredData = filteredData.filter(item => item.gender === 'perempuan')
      }
      // Sorting berdasarkan kolom yang dipilih
      return filteredData.slice().sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
    }

  }
,
methods : {

  filterByTime(timeFrame) {
      this.filterTime = timeFrame;
    },

  filterByGender(gender) {
    this.filterGender = gender;
  },

  getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Menyesuaikan ke Senin (1)
    return new Date(date.setDate(diff));
  },

  sortData(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },

  closePopup() {
      this.showPopup = false;
      this.PopStatus = false ;
      this.PopAjukan = false ;
      this.SlideBerhasil = false ;
    },

    filterData() {  // Ingat kalo mau filtering Tipe datanya harus sama !
    
    this.matchedData = this.datas2.filter(item2 => 
      this.datas.some(item1 => item1.id === item2.id) 
    );
    console.log('Matched Data', this.matchedData);
  } ,
  
  async SubmitService() {
      try {
        const formData = new FormData();
        formData.append('nama', this.pegawai.nama);
        formData.append('nik', this.pegawai.nik);
        formData.append('gender', this.pegawai.gender);
        formData.append('alamat', this.pegawai.alamat);
        formData.append('jabatan', this.pegawai.jabatan);
        formData.append('no', this.pegawai.no);
        this.pegawai.foto.forEach((file) => {
        formData.append('foto', file); // Nama field harus sesuai dengan yang diharapkan oleh server
      });

        const { data } = await axiosClient2.post("/data", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          
        });

        console.log('datanya', data);
        console.log('Form submitted:', formData);
        
        if (data) {
          alert("Registrasi berhasil");
          // Clear form after submission
          this.pegawai.nama = '';
          this.pegawai.nik = '';
          this.pegawai.foto = [];
          this.pegawai.alamat = '';
          this.pegawai.jabatan = '';
          this.pegawai.no = '';
          this.pegawai.gender = '';        
          this.SlideBerhasil = true;

        } else {
          alert("Registrasi gagal");
        }
      } catch (error) {
        alert("Error, please try again: " + error.msg);
      }
    },

    gender(){
      this.gen = !this.gen;
    },

    time(){
      this.tim = !this.tim;
    },

    handleDragEnter() {
      this.isDragging = true;
    },
    handleDragOver() {
      this.isDragging = true;
    },
    handleDragLeave() {
      this.isDragging = false;
    },
    handleDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      this.handleFiles({ target: { files } });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = event.target.files;
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.preview.push(reader.result); // Simpan URL pratinjau
          this.pegawai.foto.push(file); // Simpan file asli
        };
      });
    },

    displayAjukan() {
      this.PopAjukan =  true
    
    },

  // async DataApi() {
  //   try {
  //     const response = await axiosClient2.get('/data');
  //     this.datas = response.data;
  //     console.log('datas', this.datas);

  //     // Setelah data1 diambil, coba ambil data2
  //     await this.Datafilem();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  async DataPegawai() {
    try {
      const response = await axiosClient2.get('/data');
      this.pegawaiData = response.data;
      console.log('datas', this.pegawaiData);

      // Setelah data1 diambil, coba ambil data2
      // await this.Datafilem();
    } catch (error) {
      console.log(error);
    }
  },
  
  filteredList() {
    return this.pegawaiData.filter( pegawai =>
    pegawai.nama.toLowerCase().includes(this.cari.toLowerCase())
    );
  },




  },


async created () {
  // await this.DataApi();
  await this.DataPegawai();
  // await this.filteredList();
  await this.Datafilem();
   this.filterData();
}

}

</script>