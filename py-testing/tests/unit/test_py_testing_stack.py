import aws_cdk as core
import aws_cdk.assertions as assertions
import pytest
from aws_cdk.assertions import Match

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

def test_lambda_runtime_with_matcher(simple_template): 
    simple_template.has_resource_properties("AWS::Lambda::Function", {
        "Runtime": Match.string_like_regexp("python")
    })

def test_lambda_bucket_with_matchers(simple_template):
    simple_template.has_resource_properties(
        "AWS::IAM::Policy",
        Match.object_like(
            {
                "PolicyDocument": {
                    "Statement": [
                        {
                            "Resource": [
                                {
                                    "Fn::GetAtt": [
                                        Match.string_like_regexp("SimpleBucket"),
                                        "Arn",
                                    ]
                                },
                                Match.any_value()
                            ]
                        }
                    ]
                }
            }
        ),
    )

