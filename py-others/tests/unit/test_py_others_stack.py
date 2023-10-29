import aws_cdk as core
import aws_cdk.assertions as assertions

from py_others.py_others_stack import PyOthersStack

# example tests. To run these tests, uncomment this file along with the example
# resource in py_others/py_others_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PyOthersStack(app, "py-others")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
