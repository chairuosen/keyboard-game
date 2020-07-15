export default class Screen {
  constructor (props = {}) {
    this.width = props.width || 30;
    this.height = props.height || 8;
    this.elements = props.elements || [];
    this.subScreen = null;
    this.pressedButtons = [];
  }

  getCurrentActionButton(){
    return this.pressedButtons[this.pressedButtons.length-1];
  }

  pressButton(a){
    this.pressedButtons.push(a);
  }

  releaseButton(a){
    this.pressedButtons = this.pressedButtons.filter(b=>b!==a);
  }

  runNextTick(){
    this.elements.forEach(el=>{
      el.onCalNextTick.call(el,this);
    });
    this.subScreen && this.subScreen.runNextTick();
  }
}