import Screen from './Screen';
import Element from './Element';
import utils from '../utils/utils';

export default class Game {
  constructor (props = {}) {
    this._start = false;
    this.screen = this.createScreen(0);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  createScreen (idx){
    let arrowButtonBase = [10,5];
    let game = this;
    let screen = new Screen({
      id:idx,
      elements:[
        new Element({
          x:1,
          y:1,
          color:'red',
          pressedColor:'green',
          onPressed(){
            screen.subScreen = game.createScreen(idx+1);
          }
        }),
        new Element({
          x:15,
          y:6,
          speed:0.04,
          zIndex:10,
          color:'blue',
          pressedColor:'green',
          onCalNextTick(currentScreen){
            this.moveWithAction(currentScreen.getCurrentActionButton(),currentScreen);
            game.calculateButtonPress(this,currentScreen.elements);
          }
        }),
        new Element({    // left
          isShow:()=>{
            return !!screen.subScreen;
          },
          x:arrowButtonBase[0],
          y:arrowButtonBase[1],
          color:'#333',
          pressedColor:'green',
          onPressed(){
            screen.subScreen.pressButton('left');
          },
          onReleased(){
            screen.subScreen.releaseButton('left');
          },
        }),
        new Element({    // down
          isShow:()=>{
            return !!screen.subScreen;
          },
          x:arrowButtonBase[0]+1,
          y:arrowButtonBase[1],
          color:'#333',
          pressedColor:'green',
          onPressed(){
            screen.subScreen.pressButton('down');
          },
          onReleased(){
            screen.subScreen.releaseButton('down');
          },
        }),
        new Element({  // right
          isShow:()=>{
            return !!screen.subScreen;
          },
          x:arrowButtonBase[0]+2,
          y:arrowButtonBase[1],
          color:'#333',
          pressedColor:'green',
          onPressed(){
            screen.subScreen.pressButton('right');
          },
          onReleased(){
            screen.subScreen.releaseButton('right');
          },
        }),
        new Element({    //up
          isShow:()=>{
            return !!screen.subScreen;
          },
          x:arrowButtonBase[0]+1,
          y:arrowButtonBase[1] - 1,
          color:'#333',
          pressedColor:'green',
          onPressed(){
            screen.subScreen.pressButton('up');
          },
          onReleased(){
            screen.subScreen.releaseButton('up');
          },
        }),
      ]
    });
    return screen;
  }

  calculateButtonPress(mainElement,allElements=[]){
    allElements.forEach((el)=>{
      if(el===mainElement)return;
      if(!el.isShow())return;
      if(utils.isCovered(mainElement,el)){
        el.setPressed(true);
      }else{
        el.setPressed(false);
      }
    });
  }

  onKeyDown(e){
    this.screen.pressButton(this.getKeyAction(e.keyCode)||null);
  }
  onKeyUp(e){
    this.screen.releaseButton( this.getKeyAction(e.keyCode)||null);
  }

  getKeyAction(keyCode){
    return {
      38:'up',
      40:'down',
      37:'left',
      39:'right'
    }[keyCode];
  }

  bindEvents(){
    window.addEventListener('keydown',this.onKeyDown);
    window.addEventListener('keyup',this.onKeyUp);
  }

  onRender(){
    if(!this._start)return;
    this.screen.runNextTick();
    setTimeout(()=>{
      this.onRender()
    },16);
  }

  start(){
    this.bindEvents();
    this._start = true;
    this.onRender();
  }
}