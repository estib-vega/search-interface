const express = require('express')
const app = express()

// serve public static files (css, js)
app.use(express.static('./public'))

app.listen(8080, () => {
    console.log('listening in port 8080');
    
})