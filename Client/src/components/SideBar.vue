

<template>
<div class="flex flex-col justify-center items-center  w-[20rem] bg-white m-2  ">
  <h1 class="text-birut2 text-center text-2xl font-bold font-sans w-full h-[4rem]">Data Pegawai</h1>
  
    <div class="flex flex-col justify-around items-center w-[10rem]  h-[8rem] text-xl font-KodeMono font- text-white">

      
      <router-link :to="{ name :'home'}">
        <h1 class="flex bg-birut w-[9rem] h-[3rem] rounded-lg"> <h1 class="m-auto">Home</h1> </h1>
      </router-link>

      <router-link  :to="{  name:'coba'}">
        <h1 class="flex bg-birut w-[9rem] h-[3rem] rounded-lg"> <h1 class="m-auto">Pegawai</h1>  </h1>
      </router-link>
  
    
    </div>


</div>

</template>

<script >



</script>