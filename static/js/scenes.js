class Outside {
    constructor() {
        this.background = PIXI.Sprite.from('static/images/road.png');
        app.stage.addChild(this.background);

        this.car = new Car();
        this.car.addTo(this.background);
    }
}

class Inside {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = 400;
        app.stage.addChild(this.container);

        this.documents = [];
    }

    addDocuments(docs) {
        for (let doc of docs) {
            doc.addTo(this.container);
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