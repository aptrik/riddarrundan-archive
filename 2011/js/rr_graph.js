function rr_birdies(container, results) {
    var n = 4;
    var max_x = n * 6 + 1;
    var max_y = 3 * n + 1;
    var paper = Raphael(container, 0, 0, max_x, max_y);
    if (results.length != 18) {
        paper.rect(0, 0, max_x-1, max_y-1);
        return;
    }

    var colors = {
        0: '#bebebe',
        1: '#ffee00',
        2: '#ffcc00',
        3: '#ff9900',
        4: '#ff4500',
        5: '#cd0000',
        6: '#000000'
    };

    for (var i = 0; i <= 2; i++) {
        var x1 = 0;
        var y1 = 0 + n * i;
        for (var j = 0; j <= 5; j++) {
            var r = results.shift();
            var max = 6;
            if (r > max) {
                r = max;
            }
            var color = colors[r];
            //print("+++ result " + r + " (" + x1 + ", " + y1 + ") " + color);
            var rec = paper.rect(x1+1, y1+1, 2, 2);
            rec.attr({fill: color, stroke: color});
            x1 += n;
        }
    }
}

function rr_summary_graph(id, data, colors) {
    var placeholder = $("#" + id);

    var xticks = [];
    for (var i = 1; i <= 18; ++i) {
        xticks.push([i, "" + i]);
    }

    var options = {
        lines: {
            show: true
        },
        colors: colors,
        points: {
            show: true
        },
        grid: {
            hoverable: true,
            clickable: true,
            backgroundColor: {colors: ["#f0f0f0", "#fff"]}
        },
        xaxis: {ticks: xticks},
        // yaxis: {min: 1},
        legend: {
            show: true,
            position: "ne",
            backgroundColor: "white"
        },
        markings: {
            color: "green"
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
                            "På hål " + parseInt(x) + " har "
                            + item.series.label + " i snitt " + y + " kast.");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });

    placeholder.bind("plotselected", function (event, ranges) {
        plot = $.plot(placeholder, data,
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
        plot = $.plot(placeholder, data, options);
    });

    var plot = $.plot(placeholder, data, options);
}

function rr_hole_graph(hole, css_id, xmin, xmax, data, colors) {
    var placeholder = $("#" + css_id);

    var xticks = [];
    for (var i = xmin; i <= xmax; ++i) {
        xticks.push([i, "" + i]);
    }

    var options = {
        series: {
            stack: 0,
            lines: {show: false, steps: false},
            bars: {show: true, fill: 0.9, fillColor: false, lineWidth: 0, barWidth: 0.61, align: 'center'}
        },
        colors: colors,
        grid: {
            hoverable: true,
            clickable: true,
            backgroundColor: {colors: ["#f0f0f0", "#fff"]}
        },
        xaxis: {ticks: xticks},
        // yaxis: {max: 100},
        legend: {
            show: true,
            position: "ne"
        },
        selection: {
            mode: "xy"
        }
    };

    var plot = $.plot(placeholder, data, options);
}

function rr_summary_ctp_graph(id, text, data, colors) {
    var placeholder = $("#" + id);

    var xticks = [];
    for (var i = 1; i <= 18; ++i) {
        xticks.push([i, "" + i]);
    }

    var options = {
        series: {
            stack: 0,
            lines: {show: false, steps: false},
            bars: {show: true, fill: 0.9, fillColor: false, lineWidth: 0, barWidth: 0.61, align: 'center'}
        },
        // lines: {
        //     show: true
        // },
        colors: colors,
        points: {
            show: false
        },
        grid: {
            hoverable: true,
            clickable: true,
            backgroundColor: {colors: ["#f0f0f0", "#fff"]}
        },
        xaxis: {ticks: xticks},
        // yaxis: {min: 0},
        legend: {
            show: true,
            position: "ne",
            backgroundColor: "white"
        },
        markings: {
            color: "green"
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
                            "På hål " + parseInt(x) + " har "
                            + text + " "
                            + parseInt(y) + " CTP.");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });

    placeholder.bind("plotselected", function (event, ranges) {
        plot = $.plot(placeholder, data,
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
        plot = $.plot(placeholder, data, options);
    });

    var plot = $.plot(placeholder, data, options);
}

function rr_form_graph(css_id, xticks, data, colors) {
    var placeholder = $("#" + css_id);

    var options = {
        lines: {
            show: true
        },
        colors: colors,
        points: {
            show: true
        },
        grid: {
            hoverable: false,
            clickable: false,
            backgroundColor: {colors: ["#f0f0f0", "#fff"]}
        },
        xaxis: {ticks: xticks,
                mode: "time",
                timeformat: "%d/%m",
                minTickSize: [1, "day"]
                },
        legend: {show: false}
    };

    var plot = $.plot(placeholder, data, options);
}
