import { SNSEvent } from "aws-lambda";

const webHookUrl = '';

async function handler(event: SNSEvent) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}


export { handler }