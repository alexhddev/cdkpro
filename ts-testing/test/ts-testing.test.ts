import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as TsTesting from '../lib/ts-testing-stack';

describe('TsSimpleStack test suite', ()=>{

  let template: cdk.assertions.Template

  beforeAll(()=>{
    const app = new cdk.App({
      outdir:'cdk.out/test'
    });
    const stack = new TsTesting.TsSimpleStack(app, 'MyTestStack');
    template = Template.fromStack(stack);
  })

  test('Lambda runtime check', () => {
  
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: "nodejs18.x"
    });
  });

})


