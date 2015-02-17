function rr_summary_graph(id, summary_result) {
    var placeholder = $("#" + id);

    var options = {
        lines: {
            show: true
        },
        colors: ["#ff6600", "#efba00", "#1e90ff", "#33aa88"],
        points: {
            show: true
        },
        grid: {
            hoverable: true,
            clickable: true,
            backgroundColor: {colors: ["#f0f0f0", "#fff"]}
        },
        xaxis: {
            tickSize: 1
        },
        yaxis: {
            //min: 1
        },
        legend: {
            show: true,
            position: "sw"
        },
        selection: {
            mode: "xy"
        }
    };

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fe2',
            opacity: 0.75
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    placeholder.bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));
        if (item) {
            if (previousPoint != item.datapoint) {
                previousPoint = item.datapoint;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            "P&aring; h&aring;l " + parseInt(x) + " har "
                            + item.series.label + " i snitt " + y + " kast.");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });

    placeholder.bind("plotselected", function (event, ranges) {
        plot = $.plot(placeholder, summary_result,
            $.extend(true, {}, options, {
                         xaxis: {min: ranges.xaxis.from,
                                 max: ranges.xaxis.to},
                         yaxis: {min: ranges.yaxis.from,
                                 max: ranges.yaxis.to}
                     }));

        // don't fire event on the overview to prevent eternal loop
        overview.setSelection(ranges, true);
    });

    placeholder.bind("plotclick", function (event, pos, item) {
        plot = $.plot(placeholder, summary_result, options);
    });

    var plot = $.plot(placeholder, summary_result, options);
}
