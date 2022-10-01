const multer = require('multer')
const express = require('express')

const app = express()
const upload = multer()

app.use(express.json({ extended: false }))
app.use(express.static('./views'))
app.set('view engine', 'ejs')
app.set('views', './views')

const AWS = require('aws-sdk')
const config = new AWS.Config({

})
AWS.config = config

const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = 'SanPham'

app.get('/', (request, response) => {
    const params = {
        TableName: tableName
    }

    docClient.scan(params, (err, data) => {
        if (err) {
            response.send(err.message)
        } else {
            return response.render('index', { sanPhams: data.Items })
        }
    })
})

app.post('/', upload.fields([]), (request, response) => {
    data.push(request.body)
    return response.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})