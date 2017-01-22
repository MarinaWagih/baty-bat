/**
 * Created by marina on 1/15/17.
 */
var bg;
var speed=6;
demo.stat0=function(){};
demo.stat0.prototype={
preload:function(){

},
create:function(){
    game.stage.backgroundColor='#000';
    addNumberEventListener();
},
update:function(){


}
};

function changeState(phaserVar,num) {
    game.state.start('stat'+num);
}
function changeStateByMe(num) {
    game.state.start('stat'+num);
}
function addNumberEventListener(){
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(changeState,null,null,0);
    game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState,null,null,1);
}
