const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json());

function calculatesum(counter) {
    let total = 0;
    for (let i = 0; i <= counter; i++) {
        total = total + i;
    }
    return total;
}
function handleCalculateSum(req, res) {
    // console.log(req.body);
    var counter = (req.body.counter);
    var result = calculatesum(counter);
    res.status(200).send('result is ' + result)
    // res.json(calculatesum(5))
}

app.get('/', handleCalculateSum)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})