import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postEmpl } from "./PostEmpl";
import { getEmpl } from "./GetEmpl";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let response: APIGatewayProxyResult = {} as any;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getEmpl(event, ddbClient);
                response = getResponse;
                break;
            case 'POST':
                const postResponse = await postEmpl(event, ddbClient);
                response = postResponse;
                break;
        }
    } catch (error) {
        response = {
            statusCode: 400,
            body: JSON.stringify(error.message)
        }
    }

    response.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    }

    return response;
}

export { handler }