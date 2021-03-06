/**
 * Created by marina on 1/15/17.
 */
demo.statGameOver=function(){};
demo.statGameOver.prototype={
    preload: function () {
        game.load.image('bg', 'assets/Intro/bg.png');
        game.load.image('board', 'assets/sprites/board.png');
        //game.load.image('logoName1', 'assets/Intro/logo-name1.png');
        //game.load.image('logoName2', 'assets/Intro/logo-name2.png');
        game.load.image('back_btn', 'assets/sprites/back-btn.png');
    },
    create: function () {

        time = game.time.now;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        bg = game.add.sprite(0, 0, 'bg');
        character = game.add.sprite(0,0, "board");

        var style = { font: "bold 70px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var txt = game.add.text(centerX-150, centerY , "Game Over",style );


        lets_play = game.add.button(centerX-250, centerY + 315, "back_btn", function () {
            changeStateByMe(1);
        });
        lets_play.anchor.setTo(0.5, 0.5);
        lets_play.scale.setTo(0.7, 0.7);
        addNumberEventListener();

    },
update:function(){}
};
