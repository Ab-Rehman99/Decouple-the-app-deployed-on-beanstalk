const express = require('express');
const bodyParser = require('body-parser');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const app = express();
app.use(bodyParser.json());

AWS.config.update({
accessKeyId: '',
secretAccessKey: '',
region: 'ap-south-1'
});

// Create an SQS service object
var sqs = new AWS.SQS();
"use strict";

app.get('/', (req, res) => {
var queueURL = "";

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log(data);
    console.log(data.Messages[0].Body);
    const body = data.Messages[0].Body;
    res.status(200).json({ body });
   } else {
        res.status(404).json({ message: 'No messages available' });

    // var deleteParams = {
    //   QueueUrl: queueURL,
    //   ReceiptHandle: data.Messages[0].ReceiptHandle
    // };
    // sqs.deleteMessage(deleteParams, function(err, data) {
    //   if (err) {
    //     console.log("Delete Error", err);
    //   } else {
    //     console.log("Message Deleted", data);
    //   }
    // });
  }
});
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});