import jsii
from aws_cdk import IAspect, aws_iam, Stack, Annotations
import json

@jsii.implements(IAspect)
class PolicyChecker:

    def visit(self, node):
        # print(f'Visiting {node.__class__.__name__}')

        if isinstance(node, aws_iam.CfnPolicy):
            resolvedDoc = Stack.of(node).resolve(node.policy_document)
            resolvedDocJson = json.dumps(resolvedDoc)

            forbidden_action = 'GetBucket'

            if forbidden_action in resolvedDocJson:
                Annotations.of(node).add_warning_v2('warning', 
                    'Forbidden action ' + forbidden_action
                    )


