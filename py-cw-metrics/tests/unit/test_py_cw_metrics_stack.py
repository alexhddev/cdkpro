import aws_cdk as core
import aws_cdk.assertions as assertions

from py_cw_metrics.py_cw_metrics_stack import PyCwMetricsStack

# example tests. To run these tests, uncomment this file along with the example
# resource in py_cw_metrics/py_cw_metrics_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PyCwMetricsStack(app, "py-cw-metrics")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
