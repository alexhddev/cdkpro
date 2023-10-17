import urllib3
import json
http = urllib3.PoolManager()

def handler(event, context):
    print('calling slack!!!')
    url = ""
    msg = {
        "channel": "#aws-events",
        "text": event['Records'][0]['Sns']['Message'],
    }
    
    encoded_msg = json.dumps(msg).encode('utf-8')
    resp = http.request('POST',url, body=encoded_msg)
    print({
        "message": event['Records'][0]['Sns']['Message'], 
        "status_code": resp.status, 
        "response": resp.data
    })