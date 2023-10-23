import aws_cdk as core
import aws_cdk.assertions as assertions

from py_webdepl.py_webdepl_stack import PyWebdeplStack

# example tests. To run these tests, uncomment this file along with the example
# resource in py_webdepl/py_webdepl_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PyWebdeplStack(app, "py-webdepl")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
