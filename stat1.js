/**
 * Created by marina on 1/15/17.
 */
var centerX=1500/2;
var centerY=1000/2;
var bg;
var speed=6;
var velocity=500;
var cursors;
var blocksLayer,snakesLayer;
var hitAnEnemy=0;
var score=0;
var owl;
demo.stat1=function(){};
demo.stat1.prototype={

preload:function(){
    game.load.image('bg','assets/backgrounds/bg1.png');
    game.load.tilemap('map','assets/tilemap/jsonMaps/mapLevel1.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('blocks','assets/tilemap/tiles/blocks.png');
    game.load.image('snake','assets/tilemap/tiles/snake.png');
    game.load.image('baty','assets/sprites/characters/ssh-askpass-gnome.png');
    game.load.image('baty','assets/sprites/owl.png');
},
create:function(){
    hitAnEnemy=0;
    score=0;
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //images are loaded on top of each other
    bg=game.add.sprite(0,0,'bg');
    //var map = game.add.tilemap('map');
    //map.addTilesetImage('blocks');
    //map.addTilesetImage('snake');
    //blocksLayer=map.createLayer('blocks');
    //snakesLayer=map.createLayer('snakes');
    //map.createLayer('x');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor='#000';
    addNumberEventListener();
    game.world.setBounds(0,0,1950,1000);
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;


    //bg.scale.setTo(2,2);
    baty = game.add.sprite(0, centerY, 'baty');
    baty.anchor.x=0.5;//[===============================]
                         //[ baty.anchor.setTo(0.5,0.5) ]
    baty.anchor.y=0.5;//[===============================]
    baty.scale.setTo(0.7,0.7);// the size is 40% of actual size

    game.physics.enable(baty);
    baty.body.collideWorldBounds=true;
    //3shan el camera t follow baty
    game.camera.follow(baty);
    game.camera.deadzone=new Phaser.Rectangle(centerX-300,0,600,1000);

    cursors= game.input.keyboard.createCursorKeys();
    //map.setCollisionBetween(38,41,true,'blocks');
    //map.setCollisionBetween(1,4,true,'snakes');

},

update:function(){
     //game.physics.arcade.collide(baty,blocksLayer,function(){
     //       //todo shake
     //});
     //game.physics.arcade.collide(baty,snakesLayer, checkEnemy);
    moveBaty();
}
};
function checkEnemy()
{
    hitAnEnemy+=1;
    console.log('No of enemies you hit : '+hitAnEnemy);
    if(hitAnEnemy>=180)
    {
        console.log('GameOver ');
        changeStateByMe('GameOver');
    }

}
function moveBaty()
{
    //move left and right
    if(cursors.up.isDown)
    {
        baty.body.velocity.y= -velocity;
    }
    else if(cursors.down.isDown)
    {
        baty.body.velocity.y=+velocity;
    }
    else
    {
        baty.body.velocity.y= 0;
    }
    baty.body.velocity.x =500;
}