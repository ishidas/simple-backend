const port = 3000;
const { getCSV } = require('./csvExtract');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const _ = require('lodash')
app.use(cors());
app.use(bodyParser.json())

app.get('/data', async (req, res) => {
    
    try {
        const rangeTotal = await getCSV()
        .then(data => {
            const allData = data;
            let result = 0;
            let { start, end } = req.query;
            console.log('start', start);
            console.log('end', end);
            const startIndex = _.findIndex(allData, (d) => {
                 return d['Order Date'] === start;
                });
            const endIndex = _.findIndex(allData, (d) => d['Order Date'] === end);
            // console.log('startIndex???', startIndex);
            // console.log('startIndex???', allData[startIndex]);
            // console.log('endIndex??', endIndex);
            // console.log('endIndex??', allData[endIndex]);

            let total = 0;
            for (let i = startIndex; i < endIndex; i++) {
                total = parseFloat(allData[i].Total);
                result += total;
            }
            return result.toFixed(2);
        })
        .catch((err) => {
            console.log('errr', err);
        });
        res.send({
            rangeTotal,
        });
    } catch(e) {
        console.log('err get data', e);
    }

})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

