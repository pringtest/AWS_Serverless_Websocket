// NPM Library
const AWS = require("aws-sdk");

// AWS SDK
const docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
    region: process.env.REGION
});

// Management Websocket Connect
exports.WebSocketConnected = async (event, context, callback) => { 
    try {
        console.log(JSON.stringify(event))

        var connectionId = event.requestContext.connectionId;
        var stage = event.requestContext.stage;
        var domainName = event.requestContext.domainName;
        var apiId = event.requestContext.apiId;
        let { queryStringParameters } = event;

        if (queryStringParameters != undefined) {
            let { email } = queryStringParameters;

            if (email != "" && email != undefined) {
                // Save Connection Id in DB
                var params = {
                    TableName: process.env.TABLE_WEBSOCKET_CONNECTION,
                    Item: {
                    Email: email,
                    ConnectionID: connectionId,   
                    }   
                };
                console.log(JSON.stringify(params))
                await docClient.put(params).promise();
                
                callback(null, { statusCode: 200 });
            }
            else {
                // no email found
                console.log("email not found")
                callback({ statusCode: 400 }, null);
            }
        }
        else {
            // no queryStringParameters found
            console.log("queryStringParameters not found")
            callback({ statusCode: 400 }, null);
        }
    }
    catch (err) {
        console.log('Error : ', JSON.stringify(err.errorMessage))
        callback({ statusCode: 400 }, null);
    }
};

// Management Websocket Disconnect
exports.WebSocketDisconnected = async (event, context, callback) => { 
    try {
        console.log(JSON.stringify(event))

        var connectionId = event.requestContext.connectionId;

        // Get Group Id in DB
        var params = {
            TableName: process.env.TABLE_WEBSOCKET_CONNECTION,
            IndexName: 'ConnectionID-Index',
            KeyConditionExpression: 'ConnectionID = :hkey',
            ExpressionAttributeValues: {
                ':hkey': connectionId
            }
        };
        var Query_Resp = await docClient.query(params).promise();
        var Email = Query_Resp.Items[0].Email;

        // Delete Connection Id in DB
        var params = {
            TableName: process.env.TABLE_WEBSOCKET_CONNECTION,
            Key: {
                Email : Email,
                ConnectionID: connectionId
            }
        };
        await docClient.delete(params).promise();
        callback(null, { statusCode: 200 });
    }
    catch (err) {
        console.log(JSON.stringify(err))
        callback({ statusCode: 400 }, null);
    }
}; 

// Management Websocket Inbound
exports.WebSocketInbound =  async (event, context, callback) => {
    try {
        console.log(JSON.stringify(event))
        callback(null, { statusCode: 200 });
    }
    catch (err) {
        console.log(JSON.stringify(err))
        callback({ statusCode: 400 }, null);
    }
};



