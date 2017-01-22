/**
 * Created by marina on 1/15/17.
 */
var centerX=1920/2;
var centerY=1080/2;
var mountain,stars_bg,silhouette,ground;
var speed=6;
var velocity=700;
var cursors;
//var blocksLayer,snakesLayer;
var hitAnEnemy=0;
var score=0;
var owls,bugs;
demo.stat1=function(){};
demo.stat1.prototype={

preload:function(){


    game.load.image('bg-without-mountain','assets/backgrounds/bg-without-mountain.png');
    game.load.image('stars','assets/backgrounds/stars.png');
    game.load.image('moon','assets/backgrounds/moon.png');
    //game.load.tilemap('map','assets/tilemap/jsonMaps/mapLevel1.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('mountain','assets/backgrounds/mountain.png');
    game.load.image('silhouette','assets/backgrounds/silhouette.png');
    game.load.image('ground','assets/backgrounds/ground.png');

    //game.load.image('blocks','assets/tilemap/tiles/blocks.png');
    //game.load.image('snake','assets/tilemap/tiles/snake.png');
    game.load.spritesheet('baty','assets/spritesheets/characters/Baty/wings.png',275,193,7,0,2);
    game.load.image('owl','assets/sprites/owl.png');
    game.load.image('bug','assets/sprites/bug.png');
},
create:function(){
    hitAnEnemy=0;
    score=0;
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //images are loaded on top of each other
    var bg_without_mountain=game.add.sprite(0,0,'bg-without-mountain');
    stars_bg=game.add.tileSprite(0, 0, 1920, 1080, "stars");
    var moon=game.add.sprite(0,0,'moon');

    mountain=game.add.tileSprite(0, 0, 1920, 1080, "mountain");
    silhouette=game.add.tileSprite(0, 0, 1920, 1080, "silhouette");
    ground=game.add.tileSprite(0, 0, 1920, 1080, "ground");





    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor='#000';
    addNumberEventListener();
    game.world.setBounds(0,0,1920,1080);
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;

    baty = game.add.sprite(200, centerY, 'baty');
    baty.anchor.x=0.5;//[===============================]
                         //[ baty.anchor.setTo(0.5,0.5) ]
    baty.anchor.y=0.5;//[===============================]
    baty.scale.setTo(0.7,0.7);// the size is 40% of actual size

    ////40% of actual size

    game.physics.enable(baty);
    baty.body.collideWorldBounds=true;
    //3shan el camera t follow baty
    game.camera.follow(baty);
    game.camera.deadzone=new Phaser.Rectangle(centerX-300,0,600,1080);
    baty.animations.add('fly',[0,1,2,3,4,5,6]);



    cursors= game.input.keyboard.createCursorKeys();

    owls= game.add.group();
    owls.enableBody = true;
    owls.physicsBodyType = Phaser.Physics.ARCADE;
    owls.createMultiple(30, 'owl');
    owls.setAll('outOfBoundsKill', true);
    owls.setAll('checkWorldBounds', true);

    bugs= game.add.group();
    bugs.enableBody = true;
    bugs.physicsBodyType = Phaser.Physics.ARCADE;
    bugs.createMultiple(30, 'bug');
    bugs.setAll('outOfBoundsKill', true);
    bugs.setAll('checkWorldBounds', true);



},

update:function(){
    /**
     *===============================
     *        bg animation
     *===============================
     **/
    stars_bg.tilePosition.x -= 0.4;
    mountain.tilePosition.x -= 1;
    silhouette.tilePosition.x -= 1.6;
    ground.tilePosition.x -= 1.6;


    moveBaty();
    moveOwls();
}

};
function checkEnemy()
{
    //console.log('No of enemies you hit : '+hitAnEnemy);
    if(hitAnEnemy>=3)
    {
        console.log('GameOver ');
        changeStateByMe('GameOver');
    }

}
function checkBug()
{
    score+=5;
    //console.log('No of Bugs you hit : '+hitAnEnemy);
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

    if(baty.body.x <centerY){
        baty.body.velocity.x =50;
    }
    baty.animations.play('fly',30,true );
}

function moveOwls()
{
    // If there are fewer than MAX_MISSILES, launch a new one
    if (owls.countLiving() < 2) {
        var rand=game.rnd.integerInRange(200, game.height-200);
        owls.forEachAlive(function(m) {
            if (game.math.difference(rand, m.y) <100) {
                rand=game.rnd.integerInRange(200, game.height-200);
            }
        });
        var lunchingOwl=owls.getFirstDead();
        lunchingOwl.reset( 1500, rand);
        //move left and right
        lunchingOwl.body.velocity.x =-300;
    }

    game.physics.arcade.overlap(owls,baty,function(theMainChar,owlHit){
        hitAnEnemy+=1;
        dizzyBaty();
        owlHit.kill();
    });
    checkEnemy();

}

function moveBugs()
{



}
function dizzyBaty()
{
    //todo baty dizzy
}