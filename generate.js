const { writeFile } = require('fs').promises
const { get } = require('axios')

console.log('Fetching data from API ... (Please Wait)')
console.time('\nFetched data from API ...')

Promise.all([
    get('http://country.io/names.json')
        .then(({ data }) => data),
    get('http://country.io/capital.json')
        .then(({ data }) => data),
    get('http://country.io/currency.json')
        .then(({ data }) => data),
    get('http://country.io/phone.json')
        .then(({ data }) => data),
]).then(([name, capital, currency, phone]) => {
    console.timeEnd('\nFetched data from API ...')
    console.time('Generated JSON File ...')
    const data = Object.keys(name).map(code => ({
        code,
        country: name[code],
        capital: capital[code],
        currency: currency[code],
        calling_code: phone[code]
    }))
    return writeFile('static/country.json', JSON.stringify(data))
}).then(() => {
    console.timeEnd('Generated JSON File ...')
}).catch(err => {
    console.error(err)
})