class Car {
    constructor() {
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        let [w, h] = [80, 128]
        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.x = 200-w/2;
        this.sprite.y = 400;
    }

    addTo(con) {
        con.addChild(this.sprite);
    }
}