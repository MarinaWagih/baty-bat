/**
 * Created by marina on 1/15/17.
 */
var game=new Phaser.Game(1500,1000,Phaser.AUTO);
//stats are sceen in game like levels start end snd so on
game.state.add('stat0',demo.stat0);
game.state.add('stat1',demo.stat1);
game.state.add('statGameOver',demo.statGameOver);
game.state.start('stat0');