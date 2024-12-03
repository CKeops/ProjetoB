const express = require('express')
const app = express()
mid = (req, res) => {
    res.send('Hello Workd Node.js Comunnity!')
}
app.get('/', mid)
app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})