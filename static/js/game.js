class Game {
    constructor() {
        this.inside = new Inside();
        this.outside = new Outside();
        this.screen = new Screen(this);

        this.conditions = [];
        this.timer = 0;
        this.stopsCount = 8;
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
        else if (this.stopCounts == 3) {
            this.conditions.push({type: 'id mismatch', desc: 'Reject any account that has a transaction with a different account id'})
        }
        this.timer = 0;
    }

    async sendDocuments(accountNumber) {

        let account = {state: null}
        while (!(account.state == 'open')) {
            account = new APIAccount(null);

            while (!account.loaded) {
                await sleep(50);
            }
        }

        console.log(account);

        let transactions = [];
        for (let i = 0; i < Math.min(Math.max(this.stopsCount - 2, 0), 3); i++) {
            transactions.push(new APITransaction(parseInt(account.account_id), null));
        }

        while (transactions.filter((t) => t.loaded).length < transactions.length) {
            await sleep(50);
        }

        console.log(transactions);

        let currency = choose(['$', '£', '€'])

        let docs = [
            new Account(account.account_id, account.customer_name, currency + account.balance)
        ]
        if (this.stopsCount >= 2) {
            docs.push(new CreditScore(account.credit_score));
        }
        for (let t of transactions) {
            docs.push(new Transaction(account.account_id, currency + t.amount, t.merchant_name));
        }

        this.inside.addDocuments(docs, choose(['l', 'r']), this.outside);

    }

    removeDocuments() {
        this.inside.removeAllDocuments();
    }

    async nextDocuments(accept) {
        if (accept == this.shouldAccept) {
            this.score += 1
        }
        this.removeDocuments();
        await this.sendDocuments();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}