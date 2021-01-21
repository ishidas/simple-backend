const port = 3000;
const { getCSV } = require('./csvExtract');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())

app.get('/data', async (req, res) => {
    console.log('???', req.query);
    try {
        const allData = await getCSV()
        .then(d)
        .catch((err) => {
            console.log('errr', err);
        });
    } catch(e) {
        console.log('err get data', err);
    }
    res.send({
        allData,
    })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

