var weddingDateTime = new Date('2019-01-15 12:00:00');

function counter() {
    var timespan = countdown(
        null,
        weddingDateTime,
        countdown.YEARS|countdown.MONTHS|countdown.DAYS);
    $('#countdown').text(timespan.toString());
};

function activateLatestEventInTimeline() {
    // The time line events as stored in the data-date attributes.
    var timelineEvents = [
        '22/06/1989',
        '21/07/1991',
        '01/08/2007',
        '01/04/2010',
        '15/01/2011',
        '16/11/2014',
        '23/02/2017',
        '03/12/2017',
        '15/01/2019',
        '19/01/2019',
        '02/02/2019'
    ]

    // Get the events as date objects.
    var dates = timelineEvents.map(function (d) {
        var parts = d.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    });

    // The next (upcoming date).
    var nextDate = new Date(Math.min.apply(Math, dates.filter(x => +x > Date.now())));

    // Convert to the format used by date-date attributes.
    var day = nextDate.getDate();
    var month = nextDate.getMonth() + 1;
    var year = nextDate.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    nextDate = day + '/' + month + '/' + year;

    // Get the index of the last active event (i.e. last event that has happened) and activate that link with that data-event.
    // This event will be the one before the next date.
    lastDateIndex = timelineEvents.indexOf(nextDate) - 1;
    lastDate = timelineEvents[lastDateIndex];

    // Click on the event link corresponding to the last event.
    $('#the-timeline').find('a[data-date="' + lastDate + '"]').click();
}

$(document).ready(function() {
    // Countdown to the wedding.
    setInterval(counter, 1000);

    // RSVP form selection events.
    $('input[type="radio"]').click(function () {
        var $this = $(this);
        var button_name = $this.prop('name');
        var going_values = ['wedding', 'celebration_1', 'celebration_2'];
        
        if (button_name === 'none') {
            $.each(going_values, function(__, name) {
                $('input[name="' + name + '"]').prop('checked', false);
            });
        } else {
            $('input[name="none"]').prop('checked', false);
        }
    });

    // Initialise FullPage.JS
    $('#full-page').fullpage({
        navigation: true,
        scrollOverflow: true, // Useful for mobiles as the content is bigger than 100vh sometimes.
        scrollOverflowOptions: {
            scrollbars: false
        }
    });

    // Set the most recent event in the time line section as active.
    activateLatestEventInTimeline();
});
