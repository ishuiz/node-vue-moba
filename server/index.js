const express = require('express')

const app = express()

app.set('secret', 'xhahsajajslal')

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(require('cors')())

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
