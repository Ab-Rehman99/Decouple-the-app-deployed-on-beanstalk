const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.get('/:name', (req, res) => {
const {
name
} = req.params;
sendSqsMessage(name);
res.status(200).send({
success: 'true',
message: 'Message sent'
});
});
function sendSqsMessage(name) {
AWS.config.update({
accessKeyId: '',
secretAccessKey: '',
region: 'us-east-1'
});
let sqs = new AWS.SQS();
var params = {
MessageBody: JSON.stringify({
name: name
}),
QueueUrl: '',
DelaySeconds: 0
};
sqs.sendMessage(params, (err, data) => {
if (err) {
console.log(err, err.stack);
} else {
console.log(`Message sent to name ${name}`)
}
})
}
const PORT = 3000;
app.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});