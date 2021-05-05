import json
import boto3
from boto3.dynamodb.conditions import Key
import random

def lambda_handler(event, context):
    body = json.loads(event['body'])
    query = body["aiType"]
    client = boto3.resource('dynamodb')
    table = client.Table("UnitedWarehouseStorage")
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
