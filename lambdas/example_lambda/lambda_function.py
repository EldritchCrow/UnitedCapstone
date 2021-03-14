
# Example lambda function
# The function must be named lambda_handler and take these two objects as arguments
# The file must be named lambda_function.py
def lambda_handler(event, context):
    message = 'Hello {} {}!'.format(event['obj_name'], 
                                    event['body'])  
    return { 
        'message' : message
    }  
    
