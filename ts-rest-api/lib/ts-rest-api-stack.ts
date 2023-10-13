import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { Cors, LambdaIntegration, ResourceOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Billing, TableV2 } from 'aws-cdk-lib/aws-dynamodb';

export class TsRestApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const employeesTable = new TableV2(this, 'TS-EmplTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      billing: Billing.onDemand()     
    });

    const emplLambda = new NodejsFunction(this, 'Ts-EmplLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: (join(__dirname, '..', 'services', 'handler.ts')),
      environment: {
        TABLE_NAME: employeesTable.tableName
      },
    })

    employeesTable.grantReadWriteData(emplLambda);

    const api = new RestApi(this, 'TS-EmplApi');

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
          allowOrigins: Cors.ALL_ORIGINS,
          allowMethods: Cors.ALL_METHODS
      }
  }
    const emplResource = api.root.addResource('empl', optionsWithCors);

    const emplLambdaIntegration = new LambdaIntegration(emplLambda);

    emplResource.addMethod('GET', emplLambdaIntegration);
    emplResource.addMethod('POST', emplLambdaIntegration);


  }
}
