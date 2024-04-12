const express = require('express');
const { getDateGrid } = require('./dateGrid');
const config = require('./config');

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: `The Life of ${config.name}`,
    grid: getDateGrid(config.startDate, config.endDate),
  });
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));
