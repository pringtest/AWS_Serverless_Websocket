# AWS Serverless Websocket 
## Introduction 
- This repo contain basic example of **AWS Serverless Websocket** deploy by using **SAM**. 
- Feel free to explore the code at your own risk. :stuck_out_tongue_winking_eye:

## Resources Used
- DynamoDB
- Lambda
- API Gateway V2 (Websocket Protocol)

## Tech
This repo uses open source projects to work properly:
- [node.js] - used for the backend
- [AWS CLI] - used for enviroment
- [SAM CLI] - used for build and deployment

## Installation
- Requires latest [Node.js][node.js] to run.
- Requires latest [SAM CLI][SAM CLI] to run.
- Requires latest [AWS CLI][AWS CLI] to run.

Install the dependencies and devDependencies.
```sh
cd AWS_Serverless_Websocket
npm install
```
SAM build and deploy. Used --guided for the first deployment
```sh
aws configure
sam build
sam deploy --guided
```

## Test
Test your websocket at [here][Websocketking] after deploy
- Example: wss://*******.execute-api.ap-northeast-1.amazonaws.com/dev?email=syamim_nsl@yahoo.com

## License

MIT

**Free Software, Syukran Alhamdulillah Thank to Allah!**

   [node.js]: <http://nodejs.org>
   [SAM CLI]: <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html>
   [AWS CLI]: <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html>
   [Websocketking]: <https://websocketking.com/>