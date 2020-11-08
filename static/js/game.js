class Game {
    constructor() {
        this.inside = new Inside();
        this.outside = new Outside();
        this.screen = new Screen(this);

        this.conditions = [];
        this.timer = 0;
        this.stopsCount = 0;
        let docs = [new Transaction(1654054351, '$454.34', 'Merchant name'), new Account(435623786, 'adam allsebrook', '$484.23'), new CreditScore(500)];
        this.inside.addDocuments(docs, 'l', this.outside);
        app.ticker.add((delta) => {
            this.timer += delta / 60;
            if (this.timer > 30) {
                this.makeStop();
            }
        });

        this.scoreAtLastStop = 0;
        this.score = 0;
        this.shouldAccept = false;
    }

    makeStop() {
        this.stopsCount += 1;
        if (this.stopsCount == 1) {
            this.conditions.push({type: 'balance', lessThan: 0, desc: 'Reject any account with a negative balance.'});
        }
        else if (this.stopsCount == 2) {
            this.conditions.push({type: 'credit score', lessThan: 500, desc: 'Reject any account with a credit score below 500.'});
        }
        this.timer = 0;
    }

    sendDocuments(accountNumber) {
        let account = new APIAccount(accountNumber)//.then((value) => {
            //console.log(value);
        //})
    }

    removeDocuments() {
        this.inside.removeAllDocuments();
    }

    nextDocuments(accept) {
        if (accept == shouldAccept) {
            this.score += 1
        }
        this.removeDocuments();
        this.sendDocuments();
    }
}
