#!/usr/bin/env python3
import os

import aws_cdk as cdk

from py_starter.py_starter_stack import PyStarterStack
from py_starter.py_handler_stack import PyHandlerStack


app = cdk.App()
starter_stack=PyStarterStack(app, "PyStarterStack")
PyHandlerStack(app, "PyHandlerStack", bucket=starter_stack.cool_bucket)

app.synth()
