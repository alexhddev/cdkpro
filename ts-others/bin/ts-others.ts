#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TsOthersStack } from '../lib/ts-others-stack';
import { PolicyChecker } from '../lib/PolicyChecker';

const app = new cdk.App();
const othersStack = new TsOthersStack(app, 'TsOthersStack');
cdk.Tags.of(othersStack).add('stage', 'test');
cdk.Tags.of(othersStack).add('storage', 'main',{
  includeResourceTypes: ['AWS::S3::Bucket']
});
cdk.Tags.of(othersStack).add('storage', 'aux',{
  includeResourceTypes: ['AWS::S3::Bucket'],
  priority: 150
});

cdk.Aspects.of(app).add(new PolicyChecker())