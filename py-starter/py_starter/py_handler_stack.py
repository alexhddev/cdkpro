from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_lambda
)
from constructs import Construct

class PyHandlerStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, bucket: s3.Bucket, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        aws_lambda.Function(self, "PyCoolLambda",
            code=aws_lambda.Code.from_inline(
                "import os\ndef handler(event, context):\n print(os.environ['COOL_BUCKET_ARN'])"),
            handler='index.handler',
            runtime=aws_lambda.Runtime.PYTHON_3_11,
            environment={
                "COOL_BUCKET_ARN":bucket.bucket_arn
            }                    
        )

    