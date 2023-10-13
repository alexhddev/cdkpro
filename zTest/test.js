fetch('https://covr3k2a3h.execute-api.eu-west-1.amazonaws.com/prod/empl?id=af39002c-6ac5-44f7-9f89-7f29eabd2bd4', {
    method: 'GET'
}).then(res => res.json())
    .then(res => {
        console.log(res)
    })