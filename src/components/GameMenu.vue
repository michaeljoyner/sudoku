<template>
  <div class="screen-container bg-gray-800 text-yellow-500 flex items-center justify-center">
    <div>
      <div>
        <p class="text-xl font-bold text-center mb-4">Choose your difficulty level</p>
        <div class="flex justify-center">
          <button
            @click="setLevel(1)"
            class="mx-4 rounded text-3xl font-black w-16 h-16 bg-gray-800 border border-gray-400"
            :class="{'bg-yellow-500 text-gray-800': level === 1, 'bg-gray-800 text-yellow-500': level !== 1}"
          >1</button>
          <button
            @click="setLevel(2)"
            class="mx-4 rounded text-3xl font-black w-16 h-16 bg-gray-800 border border-gray-400"
            :class="{'bg-yellow-500 text-gray-800': level === 2, 'bg-gray-800 text-yellow-500': level !== 2}"
          >2</button>
          <button
            @click="setLevel(3)"
            class="mx-4 rounded text-3xl font-black w-16 h-16 bg-gray-800 border border-gray-400"
            :class="{'bg-yellow-500 text-gray-800': level === 3, 'bg-gray-800 text-yellow-500': level !== 3}"
          >3</button>
        </div>
        <button
          @click="startGame"
          class="w-4/5 h-12 bg-yellow-500 hover:bg-yellow-300 text-xl font-black rounded text-gray-800 mt-12 mx-auto block"
        >Start New Game</button>
      </div>
      <div v-if="has_ongoing" class="text-center pt-12 text-gray-300">
        <p class="text-xl mb-6">or</p>
        <router-link to="/game">Continue current game</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    level() {
      return this.$store.state.difficulty;
    },

    has_ongoing() {
      return this.$store.state.current.status === "ongoing";
    }
  },

  methods: {
    startGame() {
      this.$store.commit("startGame");
      this.$router.push("/game");
    },

    setLevel(level) {
      console.log(level); // eslint-disable-line no-console
      this.$store.commit("setDifficulty", level);
    }
  }
};
</script>

<style>
.screen-container {
  height: calc(100vh - 3rem);
}
</style>