//JavaScript for AWS Lambda function (NodeJS 8.10)
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Meme Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a meme fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'Any friendship that was born in the period between 16 and 28 years of age is more likely to be robust and long lasting.',
  'Women generally prefer men with deep husky voices because they seem more confident and not aggressive.',
  'The people who give the best advice are usually the ones with the most problems.',
  'The smarter the person is, the faster he thinks, and the sloppier his handwriting is.',
  'Our emotions don’t affect the way we communicate. In fact, the very opposite is true: the way we communicate has an influence on our mood.',,
  'The way a person treats restaurant staff reveals a lot about their character.',
  'People who have a strong sense of guilt are better at understanding other people’s thoughts and feelings.',
  'Men are not funnier than women: they just make more jokes, not caring whether other people like their humor or not.',
  'Listening to high-frequency music makes you feel calm, relaxed, and happy.',
  'Women have twice as many pain receptors on their bodies than men, but they have a much higher pain tolerance.',
  'Doing things that scare you will make you happier.',
  'The average amount of time a woman can keep a secret is 47 hours and 15 minutes.',
  'People who try to keep everyone happy often end up feeling the loneliest.',
  'When you hold the hand of a loved one, you feel pain less keenly and worry less.',
  'Women who have mostly male friends stay in a good mood more often.',
  'People who speak two languages may unconsciously shift their personalities when they switch from one language to another.'
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();