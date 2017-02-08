const fs = require('fs');
const readline = require('readline');
const https = require('https');

class ChargingStation {
    constructor(_id, _name, _address, _latitude, _longitude, _holder_name, _type, _power_num, _connector, _update_date, _observations, _source) {
        this.id = _id;
        this.name = _name;
        this.address = _address;
        this.latitude = _latitude;
        this.longitude = _longitude;
        this.holder_name = _holder_name;
        this.type = _type;
        this.power_num = _power_num;
        this.connector = _connector;
        this.update_date = _update_date;
        this.observations = _observations;
        this.source = _source;
    }
}

const formatCsvString = function (inputString) {
    /* Remove " at the beginning and at the end of each string field in the csv file */
    if (inputString) {
        return inputString.slice(1, -1);
    }
    return "";
};

const saveData = function (chargingStation) {
    const options = {
        hostname: 'elasticsearch.domain',
        path: '/station_index/stations',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const req = https.request(options, (res) => {
        console.log('Status: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', (d) => {});
    });

    req.on('error', (e) => {
        console.error(e.message);
    });
    const data = JSON.stringify(chargingStation);
    req.write(data);
    req.end();
};

const writeCsvToJsonFile = function () {

    //const outputFile = 'charging-stations.json';

    const rl = readline.createInterface({
        input: fs.createReadStream('IRVE-201605.csv')
        //output: fs.createWriteStream(outputFile)
    });

    let chargingStations = [];

    rl.on('close', function () {
        /* Remove header for columns definition in csv */
        chargingStations.shift();
        //fs.appendFileSync(outputFile, JSON.stringify(chargingStations));

        /* Send post request to create stations in ES */
        for (let stationIndex = 0; stationIndex < chargingStations.length; stationIndex++) {
            saveData(chargingStations[stationIndex]);
        }
    });

    rl.on('line', (line) => {
        rl.pause();
        const currentData = line.split(',');
        const newStation = new ChargingStation(formatCsvString(currentData[0]), formatCsvString(currentData[1]),
            formatCsvString(currentData[2]), formatCsvString(currentData[3]), formatCsvString(currentData[4]), formatCsvString(currentData[5]),
            formatCsvString(currentData[6]), formatCsvString(currentData[7]), formatCsvString(currentData[8]), formatCsvString(currentData[9]),
            formatCsvString(currentData[10]), formatCsvString(currentData[11]));
        chargingStations.push(newStation);
        rl.resume();
    });
};

writeCsvToJsonFile();
