<template> 
  <!-- <img src="../assets/FordarkLogo.png" alt="App Logo" srcset="" class="h-15"  v-if="colorMode.value === 'dark'">   -->
  <img src="../assets/logo.png"   alt="App Logo" class="h-15" >
 

</template>

<script setup>
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
</script>