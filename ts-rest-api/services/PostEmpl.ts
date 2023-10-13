import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";



export async function postEmpl(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.body) {
        const randomId = randomUUID();
        const item = JSON.parse(event.body)
        item.id = randomId;

        await ddbClient.send(new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: marshall(item)
        }));

        return {
            statusCode: 201,
            body: JSON.stringify(randomId)
        }
    }

    return {
        statusCode: 403,
        body: JSON.stringify('Request body required!')
    }

}