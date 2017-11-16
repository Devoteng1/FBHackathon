var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function (req, res) {
res.send('Facebook Developer Circles: Messenger Bot');
});

//for Facebook  Verification
app.get('/webhook', function (req, res) {
     if (req.query['hub.verify_token'] === 'whosoffbot_verify_token') {
      res.status(200).send(req.query['hub.challenge']);
          } else {
       res.status(403).send('Invalid verify token');
     }
    });

app.post('/webhook', function (req, res) {
   var events = req.body.entry[0].messaging;
      for (i = 0; i < events.length; i++) {
         var event = events[i];
            if (event.message && event.message.text) {
               if (event.message.text.indexOf('hi') > -1) {
                    sendMessageWithInitialOptions(event.sender.id);
                        }
                   }
               }
           res.sendStatus(200);
});

    function sendMessageWithInitialOptions(recipientId) {
        messageData = {
               'attachment': {
                  'type': 'template',
                  'payload': {
                     'template_type': 'button',
                     'text': 'The Developer Community is happy to Welcome you !!!',
                     'text': 'Please Select an option', 
                     'buttons': [{
                         'type': 'postback',
                         'title': 'ASK A QUESTIONS',
                         'payload': 'DO YOU NEED HELP '
                }, {
                         'type': 'postback',
                         'title': 'SHARE KNOWLEDGE',
                         'payload': 'CONTRIBUTE TO COMMUNITY ',
                }, {
                         'type': 'postback',
                         'title': 'JOIN OTHER DEVELOPERS',
                         'payload': 'JOIN COMMUNITY'
               }]
            }
         }
    };
sendMessage(recipientId, messageData);
};     
    
    function sendMessage(recipientId, message) {
     request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
         qs: {access_token: 'EAAbriv0mZAWEBADTPQQi6eBiVi8IWexDLUZAX1RZAVZA5jQZAe5h57pSNSECczIuZAvBBMxPTlg5qjX7ljFnVcFfkH2GONUxX1HSJeOtSHMG36yHVKtDmjPAHgLddZA7ZBfF9c8MKZA7Ritjn7EZAVF2JvabKdzAhZASTXqP8yNsFuftgZDZD'},
       method: 'POST',
      json: {recipient: {id: recipientId},
      message: message
        }
     }, function(error, response, body) {
    if (error) {
    console.log('Error sending message: ', error);
     } else if (response.body.error) {
    console.log('Error: ', response.body.error);
    }
   });
     };
app.listen((process.env.PORT || 9090));