


function isvalidateInput(str) {
    var pattern = /^\w+[a-z A-Z_]+?\@[0-9]{1,2}\:[0-9]{1,2}\w[to][0-9]{1,2}:[0-9]{1,2}$/;
    if (str.match(pattern) == null) {
        return false;
    } else {
        return true;
    }

};
exports.isvalidateInput = isvalidateInput;


function getUserName(uid,callback){
    https.get("https://graph.facebook.com/v2.6/" + uid + "?fields=first_name,last_name&access_token=EAAbriv0mZAWEBADTPQQi6eBiVi8IWexDLUZAX1RZAVZA5jQZAe5h57pSNSECczIuZAvBBMxPTlg5qjX7ljFnVcFfkH2GONUxX1HSJeOtSHMG36yHVKtDmjPAHgLddZA7ZBfF9c8MKZA7Ritjn7EZAVF2JvabKdzAhZASTXqP8yNsFuftgZDZD", function(res) {  
        var d = '';  
        var i;  
        arr = [];  
        res.on('data', function(chunk) {  
            d += chunk;  
        });  
        res.on('end', function() {  
            var e = JSON.parse(d);  
            callback(e.first_name);           
        });  
    });  
};
exports.getUserName =getUserName;