/**
 * Created by marina on 1/15/17.
 */
var demo={};
var time;
var centerX=1920/2;
var centerY=1080/2;
var bg,speed;
var character,logoName1,logoName2;
demo.statIntro=function(){};
demo.statIntro.prototype={
preload:function(){
    game.load.image('bg','assets/Intro/bg.png');
    game.load.image('character','assets/Intro/character.png');
    game.load.image('logoName1','assets/Intro/logo-name1.png');
    game.load.image('logoName2','assets/Intro/logo-name2.png');
},
create:function(){

    time=game.time.now;
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    bg=game.add.sprite(0,0,'bg');
    character=game.add.sprite(centerX, centerY*2, "character");
    character.anchor.setTo(0.5,0.5);
    logoName1=game.add.sprite(centerX, 0, "logoName1");
    logoName1.anchor.setTo(0.5,0.5);
    logoName2=game.add.sprite(centerX, 0, "logoName2");
    logoName2.anchor.setTo(0.5,0.5);
    addNumberEventListener();

},
update:function(){

    if(character.anchor.y>centerY)
    {
        character.anchor.y -= speed;
    }
    //mountain.tilePosition.y -= 1;

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
