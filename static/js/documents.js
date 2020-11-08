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
        con.removeChild(this.container);
    }

    addText(text, options, x, y) {
        let t = new PIXI.Text(text, options)
        t.x = x
        t.y = y;
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
            self.container.y =  Math.min(Math.max(newPosition.y - this.anchor.y, TOP), H-self.container.height);
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
        this.container.y = 100 + Math.random() * (H - this.container.height - 100);
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
                else if (this.velY < 0 && this.container.y < TOP) {
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
    constructor(id, name, balance) {
        super(240, 160);

        // add children
        //let nameText = new PIXI.Text(name, {fontSize: 20});
        //this.container.addChild(nameText);
        let image = new PIXI.Sprite.from('static/images/user.png');
        image.x = 10;
        image.y = 80;

        this.container.addChild(image);

        this.addText(name, {}, 5, 5);
        this.addText('#' + id, {fontSize: 20}, 5, 45);

        this.addText(balance, {}, 100, 95);
    }
}

class Transaction extends Document {
    constructor(accountId, amount, merchantName) {
        super(160, 240);
        this.addText('TRANSACTION:', {fontSize: 16}, 20, 5);

        this.addText('#' + accountId, {fontSize: 20}, 5, 40);

        this.addText('TRANSFERRED', {fontSize: 16}, 18, 80);

        this.addText(amount, {}, 30, 120);

        this.addText('TO', {fontSize: 16}, 65, 165);
        this.addText(merchantName, {fontSize: 20}, 10, 200)

    }
}

class CreditScore extends Document {
    constructor(creditScore) {
        super(140, 140);
        this.addText('CREDIT SCORE:', {fontSize: 16}, 8, 5);

        let image = PIXI.Sprite.from('static/images/creditscore.png');
        image.x = 0;
        image.y = 30;
        this.container.addChild(image);

        let stick = PIXI.Sprite.from('static/images/credit_score_stick.png');
        stick.x = 70;
        stick.y = 100;
        stick.pivot.x = 45;
        //stick.anchor.x = 45;
        stick.pivot.y = 45;
       // stick.anchor.y = 45;
        stick.rotation = creditScore / 1000 * 3.1415 - 3.1415/2;
        this.container.addChild(stick);

        this.addText(creditScore, {fontSize: 16}, 55, 115);
    }
}

// id, name, phone number, risk, credit, currency, address, email, state, credit limit, balance