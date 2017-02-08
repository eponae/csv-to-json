# Convert CSV to JSON with NodeJS

[![Build Status](https://travis-ci.org/lili1725/csv-to-json.svg?branch=master)](https://travis-ci.org/lili1725/csv-to-json)

## Usage
Load data into ElasticSearch 5.0 from a CSV file or Convert a CSV file to a Json file.

Example file : "IRVE-201615.csv".

1. To directly save data from the csv file into a new ElasticSearch index, replace line 32 : "elasticsearch.domain" by your hostname and run the program.

2. To convert csv data to json and load the result into a file : uncomment lines 56, 60, 68 and comment lines 71 to 73.

### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))

### Installation
1. Clone the repository: `git clone ...`
2. Install the NodeJS dependencies: `npm install`.
3. Run program: `npm start`.
