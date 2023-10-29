import { Annotations, IAspect, Stack } from "aws-cdk-lib";
import { CfnPolicy } from "aws-cdk-lib/aws-iam";
import { IConstruct } from "constructs";



export class PolicyChecker implements IAspect{

    visit(node: IConstruct): void {
        if (node instanceof CfnPolicy) {
            const resolvedDoc = Stack.of(node).resolve(node.policyDocument)
            const resolvedDocJson = JSON.stringify(resolvedDoc);

            const forbiddenAction = 'GetBucket'

            if (resolvedDocJson.search(forbiddenAction)) {
                Annotations.of(node).addWarningV2('warining',
                'Forbidden action: ' + forbiddenAction
                )
            }
        }
    }
    
}