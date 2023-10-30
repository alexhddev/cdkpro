from aws_solutions_constructs.aws_s3_lambda import S3ToLambda
from aws_cdk import (
    aws_lambda as _lambda,
    Stack
)
from constructs import Construct

class PyConstructsStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)


        S3ToLambda(self, 'test_s3_lambda',
           lambda_function_props=_lambda.FunctionProps(
               code=_lambda.Code.from_inline('print()'),
               runtime=_lambda.Runtime.PYTHON_3_9,
               handler='index.handler'
           )
           )