import json
import boto3
import random

s3 = boto3.resource('s3')
lamb = boto3.client('lambda')

def lambda_handler(event, context):
    # Generate a random uid for the primary key in the database
    my_uid = "-".join([str(random.randint(1e3, 1e4-1)) for _ in range(3)])
    # Basic error checking for empty POST bodies
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
    # Load the dynamodb resource and put the groundtruth label into the database
    client = boto3.resource('dynamodb')
    table = client.Table("UnitedWarehouseStorage")
    row = {
        'uid': my_uid,
        'image': body['snapshot'],
        'type': body['type'],
        'color': body['color']
    }
    table.put_item(Item=row)
    # Invoke the training instance in order to improve the model
    lamb.invoke(FunctionName='train-instance',
        InvocationType='Event',
        Payload=json.dumps(row))
    # Report our success
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
