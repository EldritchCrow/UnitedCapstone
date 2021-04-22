import json
import boto3
import os
import io
import base64

try:
	import unzip_requirements
except ImportError:
	pass

from PIL import Image
import torch
import numpy as np

s3 = boto3.resource('s3')

class BaggageClassifier(torch.nn.Module):
    def __init__(self):
        super(BaggageClassifier, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 6, 5)
        self.pool = torch.nn.MaxPool2d(2)
        self.conv2 = torch.nn.Conv2d(6, 16, 5)
        self.fc1 = torch.nn.Linear(16 * 87 * 57, 120)
        self.fc2 = torch.nn.Linear(120, 84)
        self.fc3 = torch.nn.Linear(84, 21)

    def forward(self, x):
        x = self.pool(torch.nn.functional.relu(self.conv1(x)))
        x = self.pool(torch.nn.functional.relu(self.conv2(x)))
        x = x.view(-1, 16 * 87 * 57)
        x = torch.nn.functional.relu(self.fc1(x))
        x = torch.nn.functional.relu(self.fc2(x))
        x = torch.nn.functional.softmax(self.fc3(x))
        return x

def lambda_handler(event, context):
    s3.Object('united-warehouse-vision-model', 'vision_model.pth').download_file('/tmp/model.pth')
    model = BaggageClassifier()
    model.load_state_dict(torch.load('/tmp/model.pth'))
    if 'data:image/png;base64,' in event['image']:
        event['image'] = event['image'][len('data:image/png;base64,'):]
    im = Image.open(io.BytesIO(base64.b64decode(event['image']))).resize((360, 240), Image.BILINEAR).convert('RGB')
    im = torch.from_numpy(np.array(im).astype(np.float32)[np.newaxis, :, :, :].transpose([0,3,1,2]))
    
    criterion = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=0.001)
    optimizer.zero_grad()
    output = model(im)
    gt_label = torch.from_numpy(np.array([int(event['type']) - 1], dtype=np.long))
    loss = criterion(output, gt_label)
    loss.backward()
    optimizer.step()
    
    torch.save(model.state_dict(), '/tmp/model.pth')
    s3.Object('united-warehouse-vision-model', 'vision_model.pth').upload_file('/tmp/model.pth')
    return {
        'statusCode': 200,
        "headers": {},
        "isBase64Encoded": False,
        'body': json.dumps({
            'message': 'Model trained on given image'
        })
    }