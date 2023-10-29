#!/usr/bin/env python3
import os

import aws_cdk as cdk

from py_others.py_others_stack import PyOthersStack
from py_others.policy_checker import PolicyChecker


app = cdk.App()
others_stack = PyOthersStack(app, "PyOthersStack")
cdk.Tags.of(others_stack).add('stage', 'test')
cdk.Tags.of(others_stack).add('storage', 'main',
                              include_resource_types=['AWS::S3::Bucket'],
                              priority=150)
cdk.Tags.of(others_stack).add('storage', 'aux',
                              include_resource_types=['AWS::S3::Bucket'])

cdk.Aspects.of(app).add(PolicyChecker())
app.synth()
