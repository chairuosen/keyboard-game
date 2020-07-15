<template>
  <div id="app">
    <div class="inner">
      <GameRenderer v-if="game" :screen="game.screen"></GameRenderer>
    </div>
  </div>
</template>

<script>
import GameRenderer from './components/GameRenderer';
import Game from './models/Game';

export default {
  name: 'App',
  data(){
    return {
      game:null
    }
  },
  components: {
    GameRenderer
  },
  mounted () {
    this.game = new Game();
    this.game.start();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.inner{
  width:1000px;
  margin: 0 auto;
}
</style>
