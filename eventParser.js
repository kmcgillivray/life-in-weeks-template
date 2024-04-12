const YAML = require('yaml');
const fs = require('fs');
const dayjs = require('dayjs');

function getEvents() {
  const file = fs.readFileSync('./data/events.yml', 'utf8');
  const events = YAML.parse(file) || [];
  return events.map((event) => ({
    date: dayjs(event.date),
    description: event.event,
  }));
}

module.exports.getEvents = getEvents;
