import { handler } from "./hook";


handler({
    Records: [{
        Sns: {
            Message: 'Test message'
        }
    }]
} as any)