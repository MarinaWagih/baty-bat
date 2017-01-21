/**
 * Created by marina on 1/15/17.
 */
var centerX=1500/2;
var centerY=1000/2;
var samakty;
var bg;
var speed=6;
demo.stat1=function(){};
demo.stat1.prototype={

preload:function(){
    game.load.image('bg','assets/backgrounds/bg1.png');
    game.load.tilemap('map','assets/tilemap/jsonMaps/mapLevel1.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('blocks','assets/tilemap/tiles/blocks.png');
    game.load.image('snake','assets/tilemap/tiles/snake.png');
    game.load.image('samakty','assets/sprites/characters/ssh-askpass-gnome.png');
},
create:function(){
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //images are loaded on top of each other
    bg=game.add.sprite(0,0,'bg');
    var map = game.add.tilemap('map');
    map.addTilesetImage('blocks');
    map.addTilesetImage('snake');
    map.createLayer('blocks');
    //map.createLayer('x');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor='#000';
    addNumberEventListener();
    game.world.setBounds(0,0,1950,1000);
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;


    //bg.scale.setTo(2,2);
    samakty=game.add.sprite(centerX,centerY,'samakty');
    samakty.anchor.x=0.5;//[===============================]
                         //[ samakty.anchor.setTo(0.5,0.5) ]
    samakty.anchor.y=0.5;//[===============================]
    samakty.scale.setTo(0.7,0.7);// the size is 40% of actual size

    game.physics.enable(samakty);
    samakty.body.collideWorldBounds=true;
    //3shan el camera t follow samakty
    game.camera.follow(samakty);
    game.camera.deadzone=new Phaser.Rectangle(centerX-300,0,600,1000);
    var map=game.add.tilemap('map');

},

update:function(){

    //move left and right
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        samakty.scale.setTo(0.7,0.7);// set a scale to +ve make img revere to other side
        samakty.x +=speed;
    }else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        samakty.scale.setTo(-0.7,0.7);// set a scale to -ve make img revere to other side
        samakty.x -=speed;
    }
    //move up and down
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        samakty.y -=speed;
        if(samakty.y<460){
            samakty.y=460;
        }
    }else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        samakty.y +=speed;
        if(samakty.y>802){
            samakty.y=802;
        }
    }
}
};
