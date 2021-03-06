var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var expressValidator = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

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
                    sendMessageWithInitialOptions(event.sender.id);
                }
                     else if (event.postback && event.postback.payload) {
                             payload = event.postback.payload;
            // Handle a payload from this sender
                             console.log(JSON.stringify(payload));          
                             if (payload == 'SCHEDULE A MEETING') {
                             sendMessageWithScheduleOptions(event.sender.id);
                                  }
                             else if (payload == 'DO YOU NEED HELP') {
                             sendMessage(event.sender.id, { 'text': 'Please type a question?' });
                              }
                             else if (payload == 'CONTRIBUTE TO COMMUNITY') {
                             sendMessage(event.sender.id, { 'text': 'Please share your knowledges' });
                             }            
                              else if (payload=='JOIN COMMUNITY'){                               
                             sendMessage(event.sender.id, { 'text': 'Please go to the Group page and join' });
                             }
            
                            else  {
                            sendMessageWithScheduleOptions(event.sender.id);               
                             }
        }
          res.sendStatus(200);
         }
});

function sendMessageWithScheduleOptions(recipientId) {
    messageData = {
        'attachment': {
            'type': 'template',
            'payload': {
                'template_type': 'button',
                'text': 'Select day to schedule a meeting',
                'buttons': [{
                    'type': 'postback',
                    'title': 'Today',
                    'payload': 'SCHEDULETODAY'
                }, {
                    'type': 'postback',
                    'title': 'Tomorrow',
                    'payload': 'SCHEDULETOMORROW',
                }]
            }
        }
    };
    sendMessage(recipientId, messageData);
};


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
                         'title': 'ASK A QUESTION',
                         'payload': 'DO YOU NEED HELP '
                }, {
                         'type': 'postback',
                         'title': 'SHARE KNOWLEDGE',
                         'payload': 'CONTRIBUTE TO COMMUNITY',
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