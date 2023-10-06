import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3, Fn } from 'aws-cdk-lib'

export class TsStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = this.initializeSuffix();

    const bucket = new aws_s3.Bucket(this, 'TsBucket', {
      bucketName: `cool-bucket-${suffix}`,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3)
        }
      ]
    })

    new cdk.CfnOutput(this,
      'TsBucketName', {
        value: bucket.bucketName
      }
      )
  }

  private initializeSuffix(){
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    const suffix = Fn.select(4, Fn.split('-', shortStackId))
    return suffix;
  }

}
