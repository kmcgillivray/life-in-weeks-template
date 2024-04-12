const { getEvents } = require('./eventParser');
const dayjs = require('dayjs');

function getFirstDayOfWeek(date) {
  const dayOfWeek = date.day();
  const firstDayOfWeek = dayjs(date);
  if (dayOfWeek > 0) {
    firstDayOfWeek.day(0);
  }
  return firstDayOfWeek;
}

function getDateGrid(startDate, endDate) {
  const events = getEvents();
  const firstDay = getFirstDayOfWeek(startDate);

  let weekPlace = firstDay;
  let currentYear = startDate.year();

  const today = dayjs();
  const grid = [];

  while (weekPlace < endDate) {
    const weekEndDate = weekPlace.add(7, 'days');
    let filteredEvents = events.filter((event) => event.date >= weekPlace && event.date < weekEndDate);
    weekPlace = weekEndDate

    const beforeToday = weekPlace < today;
    let formattedCell = { beforeToday };
    
    if (weekPlace.year() !== currentYear) {
      currentYear = weekPlace.year();
      formattedCell.year = currentYear;
    }

    if (filteredEvents.length > 0) {
      const eventDescriptions = filteredEvents.map((event) => `${event.date.format('MMM D, YYYY')} ${event.description}`);
      formattedCell.event = true;
      formattedCell.description = eventDescriptions.join(' ');
    } else {
      formattedCell.event = false;
      formattedCell.description = weekPlace.format('MMM D, YYYY');
    }
    
    grid.push(formattedCell);
  }

  return grid;
}

module.exports.getDateGrid = getDateGrid;
