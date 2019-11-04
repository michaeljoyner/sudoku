<template>
  <div class="text-center text-yellow-500 pt-20">
    <div class="flex flex-col items-center justify-center h-full">
      <p class="text-3xl font-black">Well done!</p>
      <p class="my-6">You succesfully solved the puzzle.</p>
      <router-link
        to="/"
        class="w-4/5 py-4 bg-yellow-500 hover:bg-yellow-300 text-xl font-black rounded text-gray-800 mt-12 mx-auto block"
      >New Puzzle</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
