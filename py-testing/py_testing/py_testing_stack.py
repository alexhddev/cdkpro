from aws_cdk import (
    Stack,
    aws_lambda,
    aws_s3    
)
from constructs import Construct

class PySimpleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cool_lambda = aws_lambda.Function(self, 'SimpleLambda',
            runtime=aws_lambda.Runtime.PYTHON_3_11,
            handler='index.handler',
            code=aws_lambda.Code.from_inline('print()')
        )
        bucket = aws_s3.Bucket(self, 'SimpleBucket',
            versioned=True
        )
        bucket.grant_read(cool_lambda)

