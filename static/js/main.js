//import Outside from 'scenes/outside'

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

function startGame() {
    let game = new Game();
}

function startMenu() {
    let menu = new PIXI.Container();

    let play = new PIXI.Graphics();
    play.beginFill(0x333333);
    play.drawRect(0, 0, 300, 100);
    play.endFill();
    play.x = 250;
    play.y = 200;
    play.interactive = true;
    menu.addChild(play);

    playText = new PIXI.Text('Play');
    playText.x = 120;
    playText.y = 30;
    play.addChild(playText);
    play.on('mousedown', function() {
        app.stage.removeChild(menu);
        startGame();
    });

    app.stage.addChild(menu);
}

startMenu();