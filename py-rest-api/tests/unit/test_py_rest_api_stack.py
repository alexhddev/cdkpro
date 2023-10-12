import aws_cdk as core
import aws_cdk.assertions as assertions

from py_rest_api.py_rest_api_stack import PyRestApiStack

# example tests. To run these tests, uncomment this file along with the example
# resource in py_rest_api/py_rest_api_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PyRestApiStack(app, "py-rest-api")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
