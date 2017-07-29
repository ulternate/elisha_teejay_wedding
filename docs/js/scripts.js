// The wedding date in a format that is cross platform compatible.
var weddingDateTime = new Date(2019,0,15,12,00,00);

function counter() {
    var timespan = countdown(
        null,
        weddingDateTime,
        countdown.YEARS|countdown.MONTHS|countdown.DAYS);
    $('#countdown').text(timespan.toString());
};

function isTimelineLinkInViewport(el) {
    // Is the timeline link in the viewport (i.e. it's visible).
    var left = el.offset().left;

    var timelineStart = $('#the-timeline a.prev').offset().left;
    var timelineEnd = $('#the-timeline a.next').offset().left

    var viewportLeft = $(window).scrollLeft() + timelineStart;
    var viewportRight = viewportLeft + $(window).width() - timelineEnd;

    return (
        left < viewportRight &&
        left > viewportLeft
    );
}

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
    var nextDate = new Date(Math.min.apply(Math, dates.filter(function (x) {
        return +x > Date.now();
    })));

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
    var currentEventLink = $('#the-timeline').find('a[data-date="' + lastDate + '"]')
    currentEventLink.click();

    // Toggle the next button until the currentEventLink is visible.
    if ($('#the-timeline a.prev').is(':visible') && $('#the-timeline a.next').is(':visible')) {
        var checkVisible = setInterval(function() {
            if (isTimelineLinkInViewport(currentEventLink)) {
                // Testing found having to click back once after it's visible.
                $('#the-timeline a.prev').click();
                clearInterval(checkVisible);
            } else {
                $('#the-timeline a.next').click();
            }
        }, 100);
    }
}

// Handle the selection of the radio buttons in the form.
function handle_selection(label) {
    var attendingEvents = ['wedding', 'celebration_1', 'celebration_2'];
    var optionName = $(label).prop('for');
    var radio = $('input[name="' + optionName + '"]');
    var checked = radio.prop('checked');

    if (!checked) {
        radio.prop('checked', true);
        if ($.inArray(optionName, attendingEvents) !== -1) {
            // De-select the "Not Attending" option.
            $('input[name="none"]').prop('checked', false);
        } else {
            // De-select all of the "I'm attending" options.
            $.each(attendingEvents, function(index, name) {
                $('input[name="' + name + '"]').prop('checked', false);
            });
        }
    }
}

$(document).ready(function() {
    // Countdown to the wedding.
    setInterval(counter, 1000);

    // Initialise FullPage.JS
    $('#full-page').fullpage({
        navigation: true,
        showActiveTooltip: true,
        scrollOverflow: true, // Useful for mobiles as the content is bigger than 100vh sometimes.
        scrollOverflowOptions: {
            scrollbars: false
        }
    });

    // Set the most recent event in the time line section as active.
    activateLatestEventInTimeline();
});
