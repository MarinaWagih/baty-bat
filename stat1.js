/**
 * Created by marina on 1/15/17.
 */
var centerX=1920/2;
var centerY=1080/2;
var mountain,stars_bg,silhouette,bg_tress,ground;
var speed=6;
var velocity=700;
var cursors;
//var blocksLayer,snakesLayer;
var hitAnEnemy=0;
var score=0;
var owls,bugs,scene_converter;
demo.stat1=function(){};
demo.stat1.prototype={

preload:function(){


    game.load.image('bg-without-mountain','assets/backgrounds/bg-without-mountain.png');
    game.load.image('stars','assets/backgrounds/stars.png');
    game.load.image('moon','assets/backgrounds/moon.png');
    game.load.image('mountain','assets/backgrounds/mountain.png');
    game.load.image('silhouette','assets/backgrounds/silhouette.png');
    game.load.image('bg_tress','assets/backgrounds/bg-tress.png');
    game.load.image('ground','assets/backgrounds/ground.png');
    game.load.image('scene_converter','assets/sprites/converter-scene.png');

    game.load.spritesheet('baty','assets/spritesheets/characters/Baty/wings.png',275,193,7,0,2);
    game.load.spritesheet('owl','assets/spritesheets/characters/Owl/wings.png',125,115,7,0,2);
    game.load.spritesheet('bug','assets/spritesheets/characters/Food/bug-1-wings.png',121,115,7,0,2);


},
create:function(){

    time=game.time.now+200;

    hitAnEnemy=0;
    score=0;
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    //images are loaded on top of each other
    var bg_without_mountain=game.add.sprite(0,0,'bg-without-mountain');
    stars_bg=game.add.tileSprite(0, 0, 1920, 1080, "stars");
    var moon=game.add.sprite(0,0,'moon');

    mountain=game.add.tileSprite(0, 0, 1920, 1080, "mountain");
    silhouette=game.add.tileSprite(0, 0, 1920, 1080, "silhouette");
    bg_tress=game.add.tileSprite(0,0, 1920, 1080,'bg_tress');
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

    scene_converter = game.add.sprite(centerX*2, centerY, 'scene_converter');
    //scene_converter.x=6000;//[===============================]
    scene_converter.visible = false;
    //                             //[ baty.anchor.setTo(0.5,0.5) ]
    //scene_converter.anchor.y=0.5;//[===============================]
    //scene_converter.scale.setTo(0.7,0.7);// the size is 40% of actual size
    game.physics.enable(scene_converter);
    scene_converter.body.collideWorldBounds=true;
    ////40% of actual size

    game.physics.enable(baty);
    baty.body.collideWorldBounds=true;
    //3shan el camera t follow baty
    game.camera.follow(baty,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    game.camera.deadzone=new Phaser.Rectangle(centerX-300,0,600,1080);
    baty.animations.add('fly',[0,1,2,3,4,5,6]);



    cursors= game.input.keyboard.createCursorKeys();

    owls= game.add.group();
    owls.enableBody = true;
    owls.physicsBodyType = Phaser.Physics.ARCADE;
    owls.createMultiple(50, 'owl');
    owls.setAll('outOfBoundsKill', true);
    owls.setAll('checkWorldBounds', true);

    bugs= game.add.group();
    bugs.enableBody = true;
    bugs.physicsBodyType = Phaser.Physics.ARCADE;
    bugs.createMultiple(50, 'bug');
    bugs.setAll('outOfBoundsKill', true);
    bugs.setAll('checkWorldBounds', true);
    moveOwls();
    moveBugs();
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
    bg_tress.tilePosition.x -=1.6;
    ground.tilePosition.x -= 1.6;
    if(score>50){
        scene_converter.visible = true;
        scene_converter.x = centerX*2-500 ;
        scene_converter.visible = centerY*2-500;
        //scene_converter.x -=5;
    }

    console.log(scene_converter.anchor.x);

    moveBaty();

    if(game.time.now >= time)
    {
        moveOwls();
        moveBugs();
        time+=200;
    }
    game.physics.arcade.overlap(scene_converter,baty,function(scene_converterHit,theMainChar){
        scene_converterHit.kill();
        changeStateByMe('Win');
    });
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
    console.log('No of Bugs you hit : '+score);
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

    if(baty.body.x < centerX){
        baty.body.velocity.x =500;
    }else{
        baty.body.velocity.x =-500;
    }
    baty.animations.play('fly',30,true );
}
function getRand()
{
    var rand=game.rnd.integerInRange(200, game.height-200);
    owls.forEachAlive(function(m) {
        if (game.math.difference(rand, m.y) <320) {
             rand +=320;
        }
    });
    bugs.forEachAlive(function(m) {
        if (game.math.difference(rand, m.y) <100) {
             rand +=100;
        }
    });
    return rand;
}

function moveOwls()
{
    baty.tint=0Xffffff;
    // If there are fewer than MAX_MISSILES, launch a new one
    if (owls.countLiving() < 3) {
       var rand=getRand();
        var lunchingOwl=owls.getFirstDead();
        lunchingOwl.reset( 1920, rand);
        //move left and right
        lunchingOwl.body.velocity.x =-700;
        lunchingOwl.animations.add('owl-fly',[0,1,2,3,4,5,6]);
        lunchingOwl.animations.play('owl-fly',30,true );
    }

    game.physics.arcade.overlap(owls,baty,function(theMainChar,owlHit){
        hitAnEnemy+=1;
        owlHit.kill();
        theMainChar.tint=0Xbbbbbb;
        game.camera.shake(0.05, 500);

    });
    checkEnemy();

}

function moveBugs()
{

    if (bugs.countLiving() < 6) {
        var rand=getRand();
        var lunchingBug=bugs.getFirstDead();
        lunchingBug.reset( 1920, rand);
        //move left and right
        lunchingBug.body.velocity.x =-800;
        lunchingBug.animations.add('bug-fly',[0,1,2,3,4,5,6]);
        lunchingBug.animations.play('bug-fly',30,true );
    }

    game.physics.arcade.overlap(bugs,baty,function(theMainChar,bugHit){
        bugHit.kill();
        checkBug();

    });


}

