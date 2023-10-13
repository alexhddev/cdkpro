import json
import boto3
import os
import uuid

table_name = os.environ.get("TABLE_NAME")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(table_name)


def handler(event, context):
    method = event["httpMethod"]

    if method == "POST":
        item = json.loads(event["body"])
        item["id"] = str(uuid.uuid4())
        table.put_item(Item=item)
        return {
            "statusCode": 200,
            "body": json.dumps({"id": item["id"]}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        }
    if method == "GET":
        empl_id = event["queryStringParameters"]["id"]
        response = table.get_item(Key={"id": empl_id})
        if "Item" in response:
            return {
                "statusCode": 200,
                "body": json.dumps(response["Item"]),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            }
        else:
            return {
                "statusCode": 404,
                "body": json.dumps("Not found"),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            }
