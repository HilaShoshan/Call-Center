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

function predictSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    // const age = form.get("age");
    fetch('http://localhost:3001/predict', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            features: {
                customerId: form.get("customerId"),
                period: form.get("period"),
                callTime: form.get("callTime"),
                callDuration: form.get("callDuration"),
                numOfCalls: form.get("numOfCalls"),
                internet: form.get("internet"),
                cableTV: form.get("cableTV"),
                cellular: form.get("cellular"),
                age: form.get("age"),
                gender: form.get("gender"),
                city: form.get("city")
            }
        })
    })
    .then(response =>  response.json())
    .then(response => {
        // handle the response
        console.log(response);
        alert(JSON.stringify(response));
        // close spinner
    })
    .catch(error => {
        // handle the error
        console.log(error);
    // close spinner
    });
}