class APIAccount {
    // Constructor initialised all variables to null, then asks the API to fill them in
    constructor(acct_id) {
        this.account_id = acct_id;
        this.balance = null;
        this.customer_name = null;
        this.credit_score = null;
        this.risk_score = null;
        this.currency = null;
        // Loaded will equal true once the API call is done
        this.loaded = false;
        this.get_info_from_api(this);
    }

    // All the setters for the different attributes
    set customer_name_set(new_name) {
        this.customer_name = new_name;
    }

    set balance_set(new_bal) {
        this.balance = new_bal;
    }

    set credit_score_set(new_score) {
        this.credit_score = new_score;
    }

    set risk_score_set(new_risk) {
        this.risk_score = new_risk;
    }

    set currency_set(new_curr) {
        this.currency = new_curr;
    }

    set loaded_status(new_loaded) {
        this.loaded = new_loaded
    }

    // Function which fills in the null attributes via an AJAX call to the Capital One API
    get_info_from_api = async function (obj) {
        let url = "/get_account_by_id/";
        let post = "account_id=" + obj.account_id;
        $.ajax({
            url: url,
            data: post,
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                let account_info = JSON.parse(data['data'])['Accounts'][0];
                obj.credit_score_set = account_info['creditScore']
                obj.customer_name_set = account_info['firstname'] + " " + account_info['lastname'];
                obj.currency_set = account_info['currencyCode'];
                obj.risk_score_set = account_info['riskScore'];
                obj.balance_set = account_info['balance'];
                // Sets loaded to true now all attributes are set
                obj.loaded_status = true;

                console.log("Wahey!");
            }
        });
    }
}

class APITransaction {

    constructor(acct_id, trans_id) {
        this.account_id = acct_id;
        this.transaction_id = trans_id;
        this.amount = null;
        this.merchant_name = null;
        this.merchant_category = null;
        this.loaded = false;
        this.get_info_from_api(this);
    }

    set loaded_set(new_loaded){
        this.loaded = new_loaded;
    }

    set amount_set(new_amount){
        this.amount = new_amount;
    }

    set merchant_name_set(new_name){
        this.merchant_name = new_name;
    }

    set merchant_category_set(new_cat){
        this.merchant_category = new_cat;
    }

    get_info_from_api = function(obj){
        let url = '/get_transaction_by_id/';
        let post = 'account_id=' + obj.account_id + "&transaction_id=" + obj.transaction_id;
        $.ajax({
            url: url,
            data: post,
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                console.log(data['data']);
                let transaction_info = JSON.parse(data['data']);
                obj.amount = transaction_info['amount']
                obj.merchant_category_set = transaction_info['merchant']['category'];
                obj.merchant_name_set = transaction_info['merchant']['name'];
                // Sets loaded to true now all attributes are set
                obj.loaded_set = true;

                console.log("Wahey 2!");
            }
        });
    }
}
