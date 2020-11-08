class Outside {
    constructor() {
        this.background = PIXI.Sprite.from('static/images/road.png');
        app.stage.addChild(this.background);

        this.car = new Car();
        this.car.addTo(this.background);
    }

    addFlyingDocs(side) {
        let f = new FlyingDocument(side);
        f.addTo(this.background);
    }
}

class Inside {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = SPLIT;
        app.stage.addChild(this.container);

        this.background = PIXI.Sprite.from('static/images/inside.png')
        this.container.addChild(this.background);

        this.documents = [];
    }

    addDocuments(docs, side, outside) {
        outside.addFlyingDocs(side);
        for (let doc of docs) {
            doc.addTo(this.container);
            doc.throw(side);
            this.documents.push(doc);
        }
    }

    removeAllDocuments() {
        for (let doc of this.documents) {
            doc.removeFrom(this.container);
        }
        this.documents = [];
    }
}

class Screen {
    constructor(game) {
        this.game = game; 

        this.container = new PIXI.Container();
        this.container.x = SPLIT + 100;
        this.container.y = 60
        app.stage.addChild(this.container);

        this.makeButton('accept', 20, 5, (e) => {
            game.nextDocuments(true)
        })
        this.makeButton(' reject', 165, 5, (e) => {
            game.nextDocuments(true)
        })

        this.scoreText = new PIXI.Text('score: ', {fontSize: 20});
        this.scoreText.x = 180;
        this.scoreText.y = 35;
        this.container.addChild(this.scoreText);

        this.makeScoreNum();
        app.ticker.add((delta) => {
            this.makeScoreNum();
        })
        
        this.scoreText = new PIXI.Text('fuel: ', {fontSize: 20});
        this.scoreText.x = 20;
        this.scoreText.y = 35;
        this.container.addChild(this.scoreText);

        this.makeScoreNum();
        app.ticker.add((delta) => {
            this.makeFuelNum();
        })
    }
    
    makeButton(text, x, y, f) {
        let button = new PIXI.Sprite.from('static/images/button.png');
        button.x = x;
        button.y = y;
        button.interactive = true;
        this.container.addChild(button);

        let buttonText = new PIXI.Text(text, {fontSize: 24});
        buttonText.x = 20;
        buttonText.y = 5;
        button.addChild(buttonText);
        button.on('mousedown', f)
    }

    makeScoreNum() {
        if (this.scoreNum) {
            this.container.removeChild(this.scoreNum);
        }
        this.scoreNum = new PIXI.Text(this.game.score, {fontSize: 20});
        this.scoreNum.x = 240;
        this.scoreNum.y = 35;
        this.container.addChild(this.scoreNum);
    }

    makeFuelNum() {
        if (this.fuelNum) {
            this.container.removeChild(this.fuelNum);
        }
        this.fuelNum = new PIXI.Text(Math.round(this.game.fuel), {fontSize: 20});
        this.fuelNum.x = 60;
        this.fuelNum.y = 35;
        this.container.addChild(this.fuelNum);
    }
}

class FuelStop {
    constructor(game) {
        this.container = new PIXI.Graphics();
        this.container.beginFill(0xC227B9);
        this.container.drawRect(100, 100, 600, 400);
        this.container.endFill();
        this.container.x = 0;
        this.container.y = 0;
        app.stage.addChild(this.container);

        let str = ''
        for (let cond of game.conditions) {
            str += '- ' + cond.desc + '\n'
        }
        if (game.score > 0) {
            str += 'fuel gained: ' + Math.min((game.score - game.scoreAtLastStop) * 10, 100)
        }
        let text = new PIXI.Text(str, {fontSize: 20})
        text.x = 180;
        text.y = 200;
        this.container.addChild(text);
        this.done = false
        
    }

    async wait() {
        await sleep(5000);
        app.stage.removeChild(this.container);
        this.done = true
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }