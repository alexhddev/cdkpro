import aws_cdk as core
import aws_cdk.assertions as assertions

from py_testing.py_testing_stack import PySimpleStack


def test_sqs_queue_created():
    app = core.App()
    stack = PySimpleStack(app, "py-testing")
    template = assertions.Template.from_stack(stack)
