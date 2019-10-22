const fs = require('fs').promises
const express = require('express')
const { get: fetch } = require('axios')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    Promise.all([
        fetch('http://country.io/names.json')
            .then(({ data }) => data),
        fetch('http://country.io/capital.json')
            .then(({ data }) => data),
        fetch('http://country.io/currency.json')
            .then(({ data }) => data),
        fetch('http://country.io/phone.json')
            .then(({ data }) => data),
    ]).then(([name, capital, currency, phone]) => {
        const data = Object.keys(name).map(code => ({
            code,
            country: name[code],
            capital: capital[code],
            currency: currency[code],
            calling_code: phone[code]
        }))
        fs.writeFile('static/country.json', JSON.stringify(data))
        res.status(200).send(data)
    })
})

app.listen(9780, console.log('server running at http://localhost:9780'))