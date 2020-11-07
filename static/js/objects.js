class Car {
    constructor() {
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        let [w, h] = [80, 128]
        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.x = SPLIT/2-w/2;
        this.sprite.y = H*2/3;
    }

    addTo(con) {
        con.addChild(this.sprite);
    }
}

class FlyingDocument {
    constructor(side) {
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        let [w, h] = [40, 40]
        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.y = H*2/3;

        if (side == 'l') {
            this.velX = 20;
            this.sprite.x = -10;
        } 
        else {
            this.velX = -20;
            this.sprite.x = W/2;
        }
        this.velY = -1
        app.ticker.add((delta) => {
            this.sprite.x += this.velX * delta;
            this.sprite.y += this.velY * delta;
            this.velY += delta * .3;

            if ((this.velX > 0 && this.sprite.x + 10 > SPLIT/2) || (this.velX < 0 && this.sprite.x + 10 < SPLIT/2)) {
                this.lastContainer.removeChild(this.sprite);
            }
        }
        )
    }

    addTo(con) {
        con.addChild(this.sprite);
        this.lastContainer = con;
    }
}