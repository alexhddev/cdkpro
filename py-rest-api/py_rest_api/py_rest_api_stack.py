from aws_cdk import (
    Stack,
    aws_apigateway,
    aws_lambda,
    aws_dynamodb
)
from constructs import Construct

class PyRestApiStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        empl_table = aws_dynamodb.TableV2(
            self,
            "EmplTablePy",
            partition_key=aws_dynamodb.Attribute(
                name="id", type=aws_dynamodb.AttributeType.STRING
            ),
            billing=aws_dynamodb.Billing.on_demand(),
        )

        empl_lambda = aws_lambda.Function(
            self,
            "EmplLambda",
            runtime=aws_lambda.Runtime.PYTHON_3_11,
            code=aws_lambda.Code.from_asset("services"),
            handler="index.handler",
            environment={"TABLE_NAME": empl_table.table_name},
        )

        empl_table.grant_read_write_data(empl_lambda)

        api = aws_apigateway.RestApi(self, "Py-Empl-Api")
        cors_options = aws_apigateway.CorsOptions(
            allow_origins=aws_apigateway.Cors.ALL_ORIGINS,
            allow_methods=aws_apigateway.Cors.ALL_METHODS,
        )

        empl_resource = api.root.add_resource(
            "empl", default_cors_preflight_options=cors_options
        )

        empl_lambda_integration = aws_apigateway.LambdaIntegration(empl_lambda)
        empl_resource.add_method("GET", empl_lambda_integration)
        empl_resource.add_method("POST", empl_lambda_integration)

