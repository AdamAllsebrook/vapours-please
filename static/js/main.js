//import Outside from 'scenes/outside'

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

//app.loader
 //   .add('road', 'static/images/road.png');

function startGame() {
    let outside = new Outside();
    let inside = new Inside();
    inside.addDocuments([new Account(0, 'adam allsebrook'), new Transaction()]);
}

startGame();
