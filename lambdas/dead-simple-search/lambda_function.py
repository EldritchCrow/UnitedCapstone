import json
import boto3
from boto3.dynamodb.conditions import Key
import random

def lambda_handler(event, context):
    # Process POST body into JSON
    body = json.loads(event['body'])
    query = body["aiType"]
    client = boto3.resource('dynamodb')
    table = client.Table("UnitedWarehouseStorage")
    # Get all results with the specified type
    # TODO: Cap this at 10 to 50 or so results
    response = table.query(
        IndexName="type-index",
        KeyConditionExpression=Key('type').eq(query)
    )["Items"]
    return {
        'statusCode': 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
        },
        "isBase64Encoded": False,
        'body': json.dumps({
            'results': response,
        })
    }
