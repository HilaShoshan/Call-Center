function train() {
    // load spinner
    document.getElementById("loader").style.display = "block"
    document.getElementById("overlay").style.display = "block"

    fetch("http://localhost:3001/train")
        .then(response => response.json())
        .then(response => {
            // handle the response and update confusion matrix
            var confusion_matrix = response.confusion_matrix
            console.log(confusion_matrix)
            document.getElementById('c00').innerText = confusion_matrix[0][0]
            document.getElementById('c01').innerText = confusion_matrix[0][1]
            document.getElementById('c02').innerText = confusion_matrix[0][2]
            document.getElementById('c03').innerText = confusion_matrix[0][3]
            document.getElementById('c10').innerText = confusion_matrix[1][0]
            document.getElementById('c11').innerText = confusion_matrix[1][1]
            document.getElementById('c12').innerText = confusion_matrix[1][2]
            document.getElementById('c13').innerText = confusion_matrix[1][3]
            document.getElementById('c20').innerText = confusion_matrix[2][0]
            document.getElementById('c21').innerText = confusion_matrix[2][1]
            document.getElementById('c22').innerText = confusion_matrix[2][2]
            document.getElementById('c23').innerText = confusion_matrix[2][3]
            document.getElementById('c30').innerText = confusion_matrix[3][0]
            document.getElementById('c31').innerText = confusion_matrix[3][1]
            document.getElementById('c32').innerText = confusion_matrix[3][2]
            document.getElementById('c33').innerText = confusion_matrix[3][3]

            // update model performance evaluation
            document.getElementById('accuracy').innerText = response.accuracy
            document.getElementById('average_f_measure').innerText = response.average_f_measure
            document.getElementById('average_precision').innerText = response.average_precision
            document.getElementById('average_recall').innerText = response.average_recall

            // update features importance graph
            console.log(response.importance)
            var imp = response.importance
            var xValues = ["Age", "City", "Num of Calls", "Gender", "Internet",
                "Cable TV", "Cellular", "Period", "Call Day of Month", "Call Day of Week",
                "Call Hour", "Call Minute", "Call Second", "Call Millisecond"]
            var yValues = [imp.age, imp.city, imp.numOfCalls, imp.gender, imp.internet,
            imp.cableTV, imp.cellular, imp.period, imp['callTime.day-of-month'], imp['callTime.day-of-week'],
            imp['callTime.hour'], imp['callTime.minute'], imp['callTime.second'], imp['callTime.millisecond']]
            var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145", "#ffd700", "#800000",
                "#800080", "#eeeeee", "#a0db8e", "#794044", "#101010", "#fa8072", "#696969"]

            new Chart("importanceChart", {
                type: "pie",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "In percent"
                    }
                }
            })

            // close spinner
            document.getElementById("loader").style.display = "none"
            document.getElementById("overlay").style.display = "none"
        })
        .catch(error => {
            // handle the error
            console.log(error);
            // close spinner
            document.getElementById("loader").style.display = "none"
            document.getElementById("overlay").style.display = "none"
        })
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
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // alert(JSON.stringify(response))

            document.getElementById('prediction').innerText = response.prediction
            document.getElementById('confidence').innerText = response.confidence * 100 + "%"

            var xValues = new Array()
            var yValues = new Array()
            response.probabilities.forEach(element => {
                xValues.push(element[0])
                yValues.push(element[1] * 100)
            })
            console.log('xvals: ', xValues)
            console.log('yvals: ', yValues)
            var barColors = ["red", "green", "blue", "orange"]
            new Chart("probabilitiesChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "The probability that the model says each topic:"
                    }
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}