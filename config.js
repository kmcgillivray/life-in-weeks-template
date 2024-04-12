const YAML = require('yaml');
const fs = require('fs');
const dayjs = require('dayjs');

const file = fs.readFileSync('./data/config.yml', 'utf8');
const config = YAML.parse(file);

module.exports = {
  name: config.name,
  startDate: dayjs(config.startDate),
  endDate: dayjs(config.endDate),
  port: 3000,
}
