import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
 return {
    statusCode: 200,
    body: JSON.stringify('Hello!')
 }
}

export { handler }