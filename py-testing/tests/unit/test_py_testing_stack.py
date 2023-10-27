import aws_cdk as core
import aws_cdk.assertions as assertions
import pytest

from py_testing.py_testing_stack import PySimpleStack

@pytest.fixture(scope="session")
def simple_template():
    app = core.App()
    stack = PySimpleStack(app, "py-testing")
    template = assertions.Template.from_stack(stack)
    return template


def test_lambda_props(simple_template): 
    simple_template.has_resource_properties("AWS::Lambda::Function", {
        "Runtime": "python3.11"
    })
    simple_template.resource_count_is("AWS::Lambda::Function", 1)
