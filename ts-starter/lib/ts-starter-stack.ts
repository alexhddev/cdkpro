import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3, Fn } from 'aws-cdk-lib'

export class TsStarterStack extends cdk.Stack {

  public coolBucket: aws_s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = this.initializeSuffix();

    this.coolBucket = new aws_s3.Bucket(this, 'TsBucket', {
      bucketName: `cool-bucket-${suffix}`,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3)
        }
      ]
    })

    new cdk.CfnOutput(this,
      'TsBucketName', {
        value: this.coolBucket.bucketName
      }
      )
  }

  private initializeSuffix(){
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    const suffix = Fn.select(4, Fn.split('-', shortStackId))
    return suffix;
  }

}
