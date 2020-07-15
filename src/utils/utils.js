export default {
  isCovered(a,b){
    let verticalCovered = ( a.y < ( b.y + b.height ) ) && ( b.y < (a.y+a.height) );
    if(!verticalCovered) return false;
    let horizonCovered = ( a.x < ( b.x + b.width ) ) && ( b.x < (a.x+a.width) );
    return horizonCovered;
  }
}