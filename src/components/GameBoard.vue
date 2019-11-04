<template>
  <div>
    <div class="game-board bg-gray-300 mt-3 mx-auto max-w-sm">
      <div
        v-for="(cell, index) in board"
        :key="index"
        :class="{'bg-yellow-300': index === activeCell, 'bg-gray-800': activeCell !== index}"
        class="cell font-black text-xl text-yellow-500"
        @click="setActive(index)"
      >{{ cell }}</div>
    </div>

    <div class="flex justify-between items-center px-6 max-w-md mx-auto">
      <p class="my-2 text-sm text-center uppercase text-gray-600">
        Difficulty:
        <span class="font-black text-gray-200">{{ level }}</span>
      </p>
      <p class="my-2 text-sm text-center uppercase text-gray-600">
        Moves:
        <span class="font-black text-gray-200">{{ move_count }}</span>
      </p>
    </div>

    <div class="numbers-grid max-w-lg mx-auto px-4 my-12">
      <button
        v-for="num in [1,2,3,4,5,6,7,8,9]"
        :key="num"
        class="text-xl font-black flex items-center justify-center p-2 bg-yellow-500 mx-2 rounded"
        :class="{'opacity-25': !possible_values.includes(num)}"
        :disabled="!possible_values.includes(num)"
        @click="fillActive(num)"
      >{{ num }}</button>
      <button
        class="text-3xl font-black flex items-center justify-center p-2 bg-gray-100 mx-2 rounded"
        :disabled="!position_taken"
        :class="{'opacity-25': !position_taken}"
        @click="clearCell"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 20 20">
          <path
            d="M18 3H8.446c-.44 0-1.071.236-1.402.525L.248 9.473a.682.682 0 0 0 0 1.053l6.796 5.947c.331.289.962.527 1.402.527H18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2.809 11l-2.557-2.557L10.078 14l-1.443-1.443L11.191 10 8.635 7.443 10.078 6l2.557 2.555L15.19 6l1.444 1.443L14.078 10l2.557 2.555L15.191 14z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCell: null,
      number_options: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  computed: {
    board() {
      return this.$store.getters.current_board;
    },

    level() {
      return this.$store.getters.level;
    },

    possible_values() {
      return this.$store.getters.possible_values(this.activeCell);
    },

    position_taken() {
      return this.$store.getters.position_taken(this.activeCell);
    },

    move_count() {
      return this.$store.state.current.moves;
    },

    game_complete() {
      return this.$store.state.current.status;
    }
  },

  watch: {
    game_complete(completed) {
      if (completed === "complete") {
        this.$router.push("/game-over");
      }
    }
  },

  methods: {
    setActive(cell) {
      this.activeCell = cell;
    },

    fillActive(option) {
      this.$store.commit("makeMove", {
        position: this.activeCell,
        value: option
      });
      this.$store.dispatch("putInStorage");
      this.activeCell = null;
    },

    clearCell() {
      this.$store.commit("clearPosition", this.activeCell);
      this.$store.dispatch("putInStorage");
      this.activeCell = null;
    }
  }
};
</script>

<style scoped>
.game-board {
  display: grid;
  max-width: 30rem;
  grid-template-columns: repeat(9, 1fr);
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  padding: 2px;
  width: 90%;
}

.cell {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell::before {
  display: inline-block;
  content: "";
  width: 1px;
  height: 0;
  padding-bottom: 100%;
}

.numbers-grid {
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
}
</style>