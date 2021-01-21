const csvFilePath = "shopifydata_2021-01-01_2021-01-20.csv";
const csv = require("csvtojson");

const getCSV = () => csv().fromFile(csvFilePath)

module.exports = {
    getCSV,
}