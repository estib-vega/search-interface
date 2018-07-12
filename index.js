const express = require('express')
const app = express()

// serve built inferno files
app.use(express.static('./client/search-frontend/build'))

app.listen(8080, () => {
    console.log('listening in port 8080');
})