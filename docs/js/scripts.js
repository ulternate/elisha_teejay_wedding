moment().format();

function pluralisePeriod(value, string) {
    // Append 's' to the string and number pair if it's greater than 1.
    // i.e. return '1 month' or '2 months'.
    var returnString = value + ' ' + string;

    if (value > 1) {
        return returnString + 's';
    } 

    return returnString;
}

function countdown() {
    var currentDateTime = new Date().getTime();
    var weddingDateTime = new Date('2019-01-15 12:00:00').getTime();

    var diffTime = weddingDateTime - currentDateTime;
    var duration = moment.duration(diffTime, 'milliseconds');

    var years = duration.years();
    var months = duration.months();
    var days = duration.days();
    var hours = duration.hours();
    var minutes = duration.minutes();
    var seconds = duration.seconds();

    // Combine for the counter.
    var counter = 'in';

    if (years > 0) {
        counter += ' ' + pluralisePeriod(years, 'year');
    }

    if (months > 0) {
        counter += ' ' + pluralisePeriod(months, 'month');
    }

    if (days > 0) {
        counter += ' ' + pluralisePeriod(days, 'day');
    }

    if (hours > 0) {
        hours += ' ' + pluralisePeriod(hours, 'hour');
    }

    if (minutes > 0) {
        counter += ' ' + pluralisePeriod(minutes, 'minute');
    }

    if (seconds > 0) {
        counter += ' ' + pluralisePeriod(seconds, 'second');
    }

    if (diffTime < 0) {
        counter = ''
    }

    // Display on the site.
    $('#countdown').text(counter);
}

$(document).ready(function() {
    setInterval(countdown, 1000);
});