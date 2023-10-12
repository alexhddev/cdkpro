from aws_cdk import (
    Stack,
    aws_apigateway,
    aws_lambda
)
from constructs import Construct

class PyRestApiStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        empl_lambda = aws_lambda.Function(
            self,
            "EmplLambda",
            runtime=aws_lambda.Runtime.PYTHON_3_11,
            code=aws_lambda.Code.from_asset("services"),
            handler="index.handler",
        )

        api = aws_apigateway.RestApi(self, "Py-Empl-Api")
        empl_resource = api.root.add_resource("empl")

        empl_lambda_integration = aws_apigateway.LambdaIntegration(empl_lambda)
        empl_resource.add_method("GET", empl_lambda_integration)
        empl_resource.add_method("POST", empl_lambda_integration)

