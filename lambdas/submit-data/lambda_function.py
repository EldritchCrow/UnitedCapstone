import json
import boto3
import random

s3 = boto3.resource('s3')
lamb = boto3.client('lambda')

def lambda_handler(event, context):
    my_uid = "-".join([str(random.randint(1e3, 1e4-1)) for _ in range(3)])
    if 'body' not in event or event['body'] == None:
        return {
        'statusCode': 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "isBase64Encoded": False,
        'body': json.dumps({
            'message': "No POST body provided"
        })
    }
    body = json.loads(event['body'])
    client = boto3.resource('dynamodb')
    table = client.Table("UnitedWarehouseStorage")
    row = {
        'uid': my_uid,
        'image': body['snapshot'],
        'type': body['type'],
        'color': body['color']
    }
    table.put_item(Item=row)
    lamb.invoke(FunctionName='train-instance',
        InvocationType='Event',
        Payload=json.dumps(row))
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "isBase64Encoded": False,
        'body': json.dumps({
            'aiResponseID': my_uid,
        })
    }
