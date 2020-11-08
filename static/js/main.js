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

    let back = new PIXI.Sprite.from('static/images/start.png')
    menu.addChild(back);

    let play = new PIXI.Sprite.from('static/images/startbutton.png');
    play.x = 161;
    play.y = 325;
    play.interactive = true;
    menu.addChild(play);

    play.on('mousedown', function() {
        app.stage.removeChild(menu);
        startGame();
    });

    app.stage.addChild(menu);
}

startMenu();