class Document {
    constructor(w, h) {
        this.container = new PIXI.Container();
        
        //this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        //this.background.width = w;
        //this.background.height = h;
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, w, h);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.background.interactive = true;
        this.container.addChild(this.background);

        this.background2 = new PIXI.Graphics();
        this.background.beginFill(0xffffff);
        this.background.drawRect(2, 2, w-4, h-4);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.container.addChild(this.background);

        this.dragging = false;
        this.dragAnchor = null;
        
        let self = this;
        this.background
            .on('pointerdown', function(e) {self.onDragStart(e, self)})
            .on('pointerup', function(e) {self.onDragEnd(e, self)})
            .on('pointerupoutside', function(e) {self.onDragEnd(e, self)})
            .on('pointermove', function(e) {self.onDragMove(e, self)});
    }

    addTo(con) {
        con.addChild(this.container);
    }

    removeFrom(con) {
        con.remove(this.container);
    }

    onDragStart(e, self) {
        this.data = e.data;
        this.alpha = 0.5;
        this.dragging = true;
        this.anchor = e.data.getLocalPosition(self.container);
    }
    
    onDragEnd(_, self) {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }
    
    onDragMove(e, self) {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(self.container.parent);
            self.container.x =  Math.min(Math.max(newPosition.x - this.anchor.x, 0), 400-self.container.width);
            self.container.y =  Math.min(Math.max(newPosition.y - this.anchor.y, 0), 600-self.container.height);

            console.log(self.container.x, newPosition.x - this.anchor.x);
        }
    }
}

class Account extends Document {
    constructor(id, name) {
        super(200, 300)

        // add children
        let nameText = new PIXI.Text(name, {fontSize: 20});
        this.container.addChild(nameText);
    }
}

class Transaction extends Document {
    constructor() {
        super(200, 200);
    }
}

// id, name, phone number, risk, credit, currency, address, email, state, credit limit, balance