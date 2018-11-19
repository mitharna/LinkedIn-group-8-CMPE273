var connection = new require("./kafka/Connection");
var { mongoose } = require("./db/mongo");
//topics files
//var signin = require('./services/signin.js');
var Log = require("./services/logs.js");
var Job = require("./services/jobs.js");
var ApplicantDetails = require("./services/applicants/applicantViewProfile");
var ApplicantLogin = require("./services/applicants/applicantLogin");
var ApplicantSignup = require("./services/applicants/applicantSignup");
var ApplicantUpdateProfile = require("./services/applicants/applicantUpdateProfile");
var ApplicantDelete = require("./services/applicants/applicantDelete");
var Job = require("./services/jobs.js");
var Applicant = require("./services/applicants/applicants.js");
var sendMessage = require("./services/applicants/sendMessage");
var receiveMessage = require("./services/applicants/receiveMessage");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("logs_topic", Log);
handleTopicRequest("jobs_topic", Job);
handleTopicRequest("applicant_details", ApplicantDetails);
handleTopicRequest("applicant_login", ApplicantLogin);
handleTopicRequest("applicant_signup", ApplicantSignup);
handleTopicRequest("applicant_update_profile", ApplicantUpdateProfile);
handleTopicRequest("applicant_delete", ApplicantDelete);
handleTopicRequest("applicant_topic", Applicant);
handleTopicRequest("send_message", sendMessage);
handleTopicRequest("receive_message", receiveMessage);
// handleTopicRequest("recruiter_JobView",RecruiterJobView);
// handleTopicRequest("recruiter_JobUpdate",RecruiterJobUpdate);
