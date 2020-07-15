<style lang="less" type="text/less" scoped>

  .self-screen{
    background-color:#eee;
    position:relative;
    border-bottom: 2px solid #aaa;
    .element{
      position:absolute;
    }
    .id{
      position:absolute;
      top:5px;
      left:5px;
      font-weight: bold;
      font-size:20px;
    }
  }
</style>
<template>
  <div class="wrapper" ref="wrapper">
    <div class="self-screen" :style="{width:px(screen.width),height:px(screen.height)}">
      <div class="id">{{ screen.id }}</div>
      <div class="element" v-for="el in screen.elements" v-show="el.isShow()" :style="{
      width:px(el.width),
      height:px(el.height),
      top:px(el.y),
      left:px(el.x),
      backgroundColor: el.isPressed ? (el.pressedColor || el.color) : el.color,
      zIndex:el.zIndex
      }"></div>
    </div>
    <GameRenderer style="width:90%;margin:0 auto;" v-if="screen.subScreen" :screen="screen.subScreen"></GameRenderer>
  </div>
</template>
<script>
export default {
  name: "GameRenderer",
  props: ['screen'],
  data () {
    return {
      unitPx:0,
    }
  },
  methods: {
    px(n){
      return ( this.unitPx * n ) + 'px';
    }
  },
  components: {},
  mounted () {
    this.unitPx = this.$refs.wrapper.offsetWidth / this.screen.width;
  }
}
</script>