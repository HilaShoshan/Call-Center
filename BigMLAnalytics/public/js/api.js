function train() {
    // load spinner
    fetch("http://localhost:3001/train")
    .then(response =>  response.json())
    .then(response => {
        // handle the response
        console.log(response);
        // close spinner
    })
    .catch(error => {
        // handle the error
        console.log(error);
    // close spinner
    });
}

function getBoolean(form_value) {
    if (form_value == null) {
        return 0
    }
    else {
        return 1
    }
}

async function predictSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    fetch('http://localhost:3001/predict', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            features: {
                period: form.get("periods"),
                callTime: form.get("callTime"),
                numOfCalls: form.get("numOfCalls"),
                internet: getBoolean(form.get("internet")),
                cableTV: getBoolean(form.get("cableTV")),
                cellular: getBoolean(form.get("cellular")),
                age: form.get("age"),
                gender: form.get("gender"),
                city: form.get("city")
            }
        })
    })
    .then(response =>  response.json())
    .then(response => {
        console.log(response);
        alert(JSON.stringify(response));
    })
    .catch(error => {
        console.log(error);
    });
}