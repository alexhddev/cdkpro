import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { S3ToLambda } from '@aws-solutions-constructs/aws-s3-lambda';

export class TsConstructsStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new S3ToLambda(this, 'test-s3-lambda', {
      lambdaFunctionProps: {
        code: lambda.Code.fromInline('console.log()'),
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: 'index.handler'
      },
    });
  }
}