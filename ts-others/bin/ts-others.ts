#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TsOthersStack } from '../lib/ts-others-stack';
import { PolicyChecker } from '../lib/PolicyChecker';
import { TsConstructsStack } from '../lib/TsConstructsStack';

const app = new cdk.App();
const othersStack = new TsOthersStack(app, 'TsOthersStack');
new TsConstructsStack(app, 'TsConstructsStack')

cdk.Tags.of(othersStack).add('stage', 'test');
cdk.Tags.of(othersStack).add('storage', 'main',{
  includeResourceTypes: ['AWS::S3::Bucket']
});
cdk.Tags.of(othersStack).add('storage', 'aux',{
  includeResourceTypes: ['AWS::S3::Bucket'],
  priority: 150
});

cdk.Aspects.of(app).add(new PolicyChecker())