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
        for (let doc of docs) {
            doc.remove(this.container);
        }
        this.documents = [];
    }
}

class Screen {
    constructor(game) {
        this.container = new PIXI.Container();
        this.container.x = SPLIT + 100;
        this.container.y = 60
        app.stage.addChild(this.container);

        this.makeButton('accept', 20, 5, (e) => {
            game.nextDocuments(true)
        })
        this.makeButton('reject', 165, 5, (e) => {
            game.nextDocuments(true)
        })
    }
    
    makeButton(text, x, y, f) {
        let button = new PIXI.Sprite.from('static/images/button.png');
        button.x = x;
        button.y = y;
        button.interactive = true;
        this.container.addChild(button);

        let buttonText = new PIXI.Text(text);
        buttonText.x = 15;
        buttonText.y = 3;
        button.addChild(buttonText);
        button.on('mousedown', f)
    }
}