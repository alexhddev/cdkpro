import * as cdk from 'aws-cdk-lib';
import { Template, Match, Capture } from 'aws-cdk-lib/assertions';
import * as TsTesting from '../lib/ts-testing-stack';

describe('TsSimpleStack test suite', () => {

  let template: cdk.assertions.Template

  beforeAll(() => {
    const app = new cdk.App({
      outdir: 'cdk.out/test'
    });
    const stack = new TsTesting.TsSimpleStack(app, 'MyTestStack');
    template = Template.fromStack(stack);
  })

  test('Lambda runtime check', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: "nodejs18.x"
    });
    template.resourceCountIs('AWS::Lambda::Function', 1)
  });
  test('Lambda runtime check', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: Match.stringLikeRegexp('nodejs')
    });
  });

  test('Lambda bucket policy, with matchers', () => {
    template.hasResourceProperties('AWS::IAM::Policy',
      Match.objectLike({
        PolicyDocument: {
          Statement: [{
            Resource: [{
              'Fn::GetAtt': [
                Match.stringLikeRegexp('SimpleBucket'),
                'Arn'
              ]
            },
            Match.anyValue()
            ]
          }]
        }
      })
    );
  });

  test('Lambda actions, with capture', () => {
    const lambdaActionsCapture = new Capture();

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [{
          Action: lambdaActionsCapture
        }]
      }
    })

    const expectedActions = [
      "s3:GetObject*",
      "s3:GetBucket*",
      "s3:List*"
    ]

    expect(lambdaActionsCapture.asArray()).toEqual(
      expect.arrayContaining(expectedActions)
    )

  });



})


