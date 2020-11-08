
function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

class Game {
    constructor() {
        this.inside = new Inside();
        this.outside = new Outside();
        this.screen = new Screen(this);

        this.conditions = [];
        this.timer = 0;
        this.stopsCount = 0;
        this.fuel = 100
        this.scoreAtLastStop = 0;
        this.score = 0;
        
        this.makeStop();
        this.nextDocuments();

        app.ticker.add((delta) => {
            this.timer += delta / 60;
            if (this.timer > 35) {
                this.makeStop();
            }
            this.fuel -= delta / 60
            if (this.fuel < 0) {
                // lose
            }
        });

        this.shouldAccept = false;

        this.onFuelStop = false;
    }

    async makeStop() {
        this.timer = 0;
        this.onFuelStop = true;
        console.log('aaa', this.stopsCount);
        this.stopsCount += 1;
        if (this.stopsCount == 1) {
            this.conditions.push({type: 'balance', lessThan: 0, desc: 'Reject any account with a negative balance.', f: (acc, ts) => {
                acc.balance = Math.round(-Math.random() * 500 * 100) / 100;
            }});
        }
        else if (this.stopsCount == 2) {
            this.conditions.push({type: 'credit score', lessThan: 500, desc: 'Reject any account with a credit score below 500.', f: (acc, ts) => {
                acc.credit_score = Math.round(Math.random() * 499);
            }});
        }
        else if (this.stopCounts == 3) {
            this.conditions.push({type: 'id mismatch', desc: 'Reject any account that has a transaction with a different account id', f: (acc, ts) => {
                choose(ts).account_id = Math.random() * 99000000 + 1000000;
            }});
        }
        else if (this.stopsCount == 4) {
            this.conditions.push({type: 'bad merchant', desc: 'Reject any account that has made a transaction with the merchant: Merchie', f: (acc, ts) => {
                choose(ts).merchant_name = 'Merchies';
            }})
        }
        else if (this.stopsCount == 5) {
            this.conditions.push({type: 'wrong currency', desc: 'Reject any account making purhcases with different currencies', f: (acc, ts) => {
                let t = choose(ts);
                if (t.amount[0] == '£') {
                    t.amount[0] = choose(['$', '€']);
                }
                else if (t.amount[0] == '€') {
                    t.amount[0] = choose(['$', '£']);
                }
                if (t.amount[0] == '$') {
                    t.amount[0] = choose(['$', '€']);
                }
            }})
        }

        let stop = new FuelStop(this);
        await stop.wait();
        while (!stop.done) {
            await sleep(50);
        }

        this.fuel = Math.min((this.fuel + this.score - this.scoreAtLastStop) * 10, 100)
        this.scoreAtLastStop = this.score;
        this.onFuelStop = false
    }

    async sendDocuments(accountNumber) {

        let account = {state: null}
        while (!(account.state == 'open')) {
            account = new APIAccount(null);

            while (!account.loaded) {
                await sleep(50);
            }
        }
        let transactions = [];
        for (let i = 0; i < Math.min(Math.max(this.stopsCount - 2, 0), 3); i++) {
            transactions.push(new APITransaction(parseInt(account.account_id), null));
        }

        while (transactions.filter((t) => t.loaded).length < transactions.length) {
            await sleep(50);
        }

        this.shouldAccept = choose([true, true, false]);
        if (this.stopsCount >= 2 && account.credit_score < 500) {
            this.shouldAccept = false
        }
        
        let currency = choose(['$', '£', '€'])
        for (let t of transactions) {
            t.amount = currency + t.amount;
        }

        if (!this.shouldAccept) {
            let c = choose(this.conditions);
            c.f(account, transactions);
        }

        let docs = [
            new Account(account.account_id, account.customer_name, currency + account.balance)
        ]
        if (this.stopsCount >= 2) {
            docs.push(new CreditScore(account.credit_score));
        }
        for (let t of transactions) {
            docs.push(new Transaction(account.account_id, t.amount, t.merchant_name));
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
