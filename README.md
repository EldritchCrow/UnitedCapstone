# United Warehouse Vision
Group 7's project for United Airlines Inc

This is a serverless web application which provides an API for querying and training a Pytorch machine learning model

## Table of Contents
1. This Repository
2. Machine Learning Model
1. Recommended Next Steps

## This Repository
This repository contains the code and SAM configuration files for the AWS Lambda instances, as well as a OpenAPI 3 specification for the AWS API Gateway configuration.

### Lambdas
The application is built around 4 lambda functions, dead-simple-search, process-snapshot, submit-data, and train-instance

#### dead-simple-search
This is a relatively straightforward endpoint which allows the frontend to query the DynamoDB table for the application. It parses only one parameter from the POST body of the request, "aiType", which is the integer designation of the IATA category being searched by. Functions to convert between these integer designations and the IATA categories themselves are available in the frontend, in script.js. The endpoint will return a JSON object in the response body with this format:
    {
        results: [
            {
                uid: <a unique artificial database key>,
                color: <the two character color designation>,
                image: <base64 encoded image>,
                type: <non-IATA type designation>
            },
            ...
        ]
    }

#### process-snapshot
This endpoint receives an image snapshot and uses the most up-to-date version of the ML model to predict what type it is. The lambda utilizes two additional layers, one for Pytorch (the ML library) and one for NumPy/PIL. These three libraries are necessary for the lambda, as PIL converts the base64 image to a pixel map, NumPy helps create the Pytorch tensor, and Pytorch executes the model itself. The endpoint receives the base64 encoded image from the "snapshot" field of the POST body and returns a JSON object in the following format:
    {
        type: <non-IATA type designation>,
        color: <the two character color designation>
    }

#### submit-data
This endpoint receives a groundtruth classification, uploads it to the DynamoDB table, and initiates a model training event through the train-instance lambda. It receives data in this format:
    {
        snapshot: <base64 encoded image>,
        type: <non-IATA type designation>,
        color: <the two character color designation>
    }
All it returns is a simple message confirming success of the execution.

#### train-instance
This lambda is called by submit-data, and it uses the groundtruth classification to marginally update the model. It does so by using the built in backpropagation functionality of Pytorch and performing a single "step" of the stochastic gradient descent. Because this lambda is not used as an API endpoint, it takes in data marginally differently by skipping the step of loading the POST body from the event context.

### API Gateway
The API Gateway configuration is relatively straightfoward, simply using Lambda proxies for the submit-data, process-snapshot, and dead-simple-search endpoints, with CORS enabled for all origins. As such, they only take two HTTPS verbs, POST and OPTIONS, with the former being passed off to the Lambda and the latter being automatically used by browsers' CORS properties.

### S3
There is one S3 bucket with one file, the computer vision model. This file is generated and parsed by Pytorch, and it holds the parameters for all of the neural network. In order to execute the model or modify it via backpropagation, it must be loaded from S3 using boto3 and loaded into RAM via Pytorch library functions. The current version of the model at time of writing can be found at `misc/vision_model.pth`

### DynamoDB
DynamoDB was configured with no provisioned concurrency, only on-demand execution. There is just one table, which holds the groundtruth training data. This data follows the same schema as is returned by the dead-simple-search endpoint. The table also utilizes a Global Secondary Index on "type" so that dead-simple-search can actually query the DB. The primary key is on "uid", the unique artificial key.

### Amplify
Because the frontend is built with a basic static page, incorporating only jQuery, Amplify does not have any tests or builds it needs to do in order to deploy the frontend. It is currently attached to the repository automatically, making the frontend available without any access restriction.


## Machine Learning Model
First, this section will spend some time discussing how the model works, very briefly touching on CNNs and backpropagation. If you are familiar with these terms, you may skip to the "Architecture" section.

### How Does the Model Work?
A neural network is at heart represented by a whole bunch of numbers, called parameters or weights. These weights are multiplied by and added to the inputs data and then each other through progressive stages, or layers, of the neural network. Renormalization and other functions called activation functions can be applied after each layer of weights is applied.
A **fully connected** layer of a neural network is one in which each data point of the input vector is attached to each data point of the output vector. A **convolutional** layer is a layer in which a kernel is applied to sliding windows of an N-dimensionsal input, itself resulting in an N-dimensional output. Neural networks with convolutional layers, or convolutional neural networks (CNNs), are frequently used in machine learning models that take in images as an input. 
Backpropagation is a methodology for improving the output of the model by varying the weights in the direction of expected improvement. This is performed by defining a continuous function that quantifies the error of the model (to what degree it is wrong on a specific data point), and then taking the partial derivative of that error value with respect to each weight. That partial derivative is then evaluated at the data point, and a small incremental step is taken "down" the gradient in hopefully a marginal improvement of the overall model.
When training a fully connected NN, CNN, or other type of NN, the model is repeatedly updated by first evaluating its prediction on some data points, checking the error function against the known correct answer, and then taking a step down the gradient. This process is repeated until the in-sample or cross-validation errors level off and stop improving. Eventually the model is said to have "converged" for the given data, meaning it is as accurate as it can be with the architecture defined.
This is only a very quick and superficial description of the decision making that goes into currating a machine learning model and its data processing pipeline, but enough to demonstrate the basic methodology and variability of answers that comes with designing something like this.


### Architecture
The computer vision model is a relatively straightfoward CNN, with two convolutional layers and three fully connected layers. It takes in a three channel image in BGR (blue, green, and red values from an image) and outputs one of 20 classifications or a negation case in the 21st class. After each convolutional layer, a 2x2 max pooling kernel is applied. Hidden layer activations use ReLU, and the final activation uses softmax. The input image must be resized to 360x240 pixels before applying the model for a prediction.
Ultimately, this is a relatively simple CNN architecture. During development, we were unable to test out different architectures because we did not have any training data, and so this specific design was adapted from one of Sam's Computational Vision homeworks, where he saw some success with other types of image classification.
Because the training data is stored, analysts or developers can revisit this design once a larger dataset has accumulated.

## Recommended Next Steps

Here are a few steps we recommend the United team take to integrate and further the application, in a rough order of the importance we view them in.

1. Secure the application using whatever internal web app authentication process United prefers. All endpoints etc are currently publicly facing with now verification.
2. Fix a minor bug with the zoom feature. Currently, the cropping done by the browser is not 100% representative of what is shown when the image is zoomed in, especially at zoom levels above about 2x.
3. Accrue a larger dataset over the course of a few months and utilize a more conventional ML training workflow to evaluate expected performance of the model and improve the overall accuracy of the application.
