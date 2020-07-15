export default class Element {
  constructor (props = {}) {
    this.isPressed = false;
    this.speed = props.speed || 0.005;
    this.border = props.border || 0.08;
    this.color = props.color || 'red';
    this.pressedColor = props.pressedColor || null;
    this.zIndex = props.zIndex || 0;
    this.isShow = props.isShow || (() => { return true});
    this.onCalNextTick = props.onCalNextTick || (() => {});
    this.onPressed = props.onPressed || (() => {});
    this.onReleased = props.onReleased || (() => {});
    this.setBounds(props);
  }
  setBounds(props){
    this.width = ( v(props.width,1) ) - 2*this.border;
    this.height = ( v(props.height,1) ) - 2*this.border;
    this.x = ( v(props.x,1) ) + this.border;
    this.y = ( v(props.y,1) ) + this.border;
  }
  moveWithAction(action,screen){
    switch (action) {
      case 'up':
        this.y -= this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
    }
    if(this.y<0){
      this.y = 0;
    }
    if(this.x<0){
      this.x = 0;
    }
    if(this.y+this.height>screen.height){
      this.y = screen.height - this.height;
    }
    if(this.x+this.width>screen.width){
      this.x = screen.width - this.width;
    }
  }
  setPressed(pressed){
    let oldValue = this.isPressed;
    if(oldValue!==pressed){
      this.isPressed = pressed;
      if(pressed){
        this.onPressed();
      }else{
        this.onReleased();
      }
    }
  }
}

function v(a,b){
  return typeof a === 'undefined' ? b : a;
}