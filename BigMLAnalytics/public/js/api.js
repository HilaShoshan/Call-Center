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

function getGender(form_value) {
    if (form_value == "male") {
        return 0
    }
    else if (form_value == "female") {
        return 1
    }
    return -1
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
                callTime: form.get("callTime") + ":00.001Z",
                numOfCalls: parseInt(form.get("numOfCalls")),
                internet: getBoolean(form.get("internet")),
                cableTV: getBoolean(form.get("cableTV")),
                cellular: getBoolean(form.get("cellular")),
                age: parseInt(form.get("age")),
                gender: getGender(form.get("genders")),
                city: form.get("cities")
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