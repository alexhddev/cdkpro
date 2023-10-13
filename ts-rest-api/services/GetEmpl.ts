import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";



export async function getEmpl(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters)) {
        const emplId = event.queryStringParameters['id']!;
        const getItemResponse = await ddbClient.send(new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': { S: emplId }
            }
        }))
        if (getItemResponse.Item) {
            const unmashalledItem = unmarshall(getItemResponse.Item)
            return {
                statusCode: 200,
                body: JSON.stringify(unmashalledItem)
            }
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('something is wrong!')
    }
}