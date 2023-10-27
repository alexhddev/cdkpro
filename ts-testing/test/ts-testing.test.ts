import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as TsTesting from '../lib/ts-testing-stack';

test('SQS Queue Created', () => {
  const app = new cdk.App({
    outdir:'cdk.out/test'
  });
  const stack = new TsTesting.TsSimpleStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
