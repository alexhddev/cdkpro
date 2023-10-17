from hook import handler

event = {
    'Records': [{
        'Sns': {
            'Message': 'Test message'
        }
    }]
}

handler(event, {})