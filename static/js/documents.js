class Document {
    constructor(w, h) {
        this.container = new PIXI.Container();
        
        //this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        //this.background.width = w;
        //this.background.height = h;
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000, .8);
        this.background.drawRect(0, 0, w, h);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.background.interactive = true;
        this.container.addChild(this.background);

        this.background2 = new PIXI.Graphics();
        this.background.beginFill(0xffffff, .8);
        this.background.drawRect(2, 2, w-4, h-4);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.container.addChild(this.background);

        this.textPos = 0;
        
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

    addText(text, options) {
        let t = new PIXI.Text(text, options)
        t.y = this.textPos;
        this.textPos += 20;
        this.container.addChild(t);
    }

    onDragStart(e, self) {
        this.data = e.data;
        this.alpha = 0.5;
        this.dragging = true;
        this.anchor = e.data.getLocalPosition(self.container);
        self.velX = 0;
        self.velY = 0;
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
            self.container.x =  Math.min(Math.max(newPosition.x - this.anchor.x, 0), W-SPLIT-self.container.width);
            self.container.y =  Math.min(Math.max(newPosition.y - this.anchor.y, 0), H-self.container.height);
        }
    }

    throw(side) {

        this.timer = 12;
        if (side == 'l') {
            this.container.x = -this.container.width - 100;
            this.velX = 100 + (Math.random() - .5) * 40;
        }
        else {
            this.container.x = W / 2 + 100;
            this.velX = -110 + (Math.random() - .5) * 40;
        }
        this.container.y = Math.random() * (H - this.container.height);
        this.velY = (Math.random() - .5) * 40

        app.ticker.add((delta) => {
            this.timer -= delta;
            if (this.timer < 0) {
                this.container.x += this.velX * delta;
                this.container.y += this.velY * delta;
                this.velX *= .87;
                this.velY *= .87;

                if (this.velX > 0 && this.container.x > W-SPLIT-this.container.width) {
                    this.velX *= -.8;
                }
                else if (this.velX < 0 && this.container.x < 0) {
                    this.velX *= -.8;
                }
                if (this.velY > 0 && this.container.y > H-this.container.height) {
                    this.velY *= -.8;
                }
                else if (this.velY < 0 && this.container.y < 0) {
                    this.velY *= -.8;
                }

                if (Math.abs(this.velX) < .05) {
                    this.velX = 0;
                }
                if (Math.abs(this.velY) < .05) {
                    this.velY = 0;
                }
            }
        });
        
    }
}

class Account extends Document {
    constructor(id, name) {
        super(200, 300)

        // add children
        //let nameText = new PIXI.Text(name, {fontSize: 20});
        //this.container.addChild(nameText);
        this.addText(name)
        this.addText(id)
    }
}

class Transaction extends Document {
    constructor() {
        super(200, 200);
    }
}

// id, name, phone number, risk, credit, currency, address, email, state, credit limit, balance