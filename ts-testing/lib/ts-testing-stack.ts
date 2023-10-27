import * as cdk from 'aws-cdk-lib';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class TsSimpleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new cdk.aws_lambda.Function(this, 'SimpleLambda', {
      code: Code.fromInline('console.log()'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_18_X
    });

    const bucket = new cdk.aws_s3.Bucket(this, 'SimpleBucket', {
      versioned: true
    });
    bucket.grantRead(lambda)

  }
}
