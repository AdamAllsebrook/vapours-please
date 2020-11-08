//import Outside from 'scenes/outside'

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

//app.loader
 //   .add('road', 'static/images/road.png');

function startGame() {
    
    let inside = new Inside();
    let outside = new Outside();
    let docs = [new Transaction(1654054351, '$454.34', 'Merchant name'), new Account(435623786, 'adam allsebrook', '$484.23'), new CreditScore(500)];
    inside.addDocuments(docs, 'l', outside);

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
    })

    app.stage.addChild(menu);
}

startMenu();
