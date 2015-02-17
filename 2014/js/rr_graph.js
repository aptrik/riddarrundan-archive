function rr_summary_graph(id, data, colors) {
    var xticks = [];
    for (var i = 1; i <= 18; ++i) {
        xticks.push(i);
    }
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: id,
            type: 'line',
            plotBorderWidth: 1,
            borderWidth: 1,
            borderRadius: 0
        },
        title:  {
            text: "Resultat per hål",
            align: "center"
        },
        xAxis: {
            tickPositions: xticks,
            title: {
                text: 'Hål'
            }
        },
        yAxis: {
            title: {
                text: 'Resultat'
            }
        },
        tooltip: {
            headerFormat: '<b>Hål {point.key}</b><br/>',
            pointFormat: '{series.name}: {point.y} kast<br/>'
        },
        credits: {
            enabled: false
        },
        colors: colors,
        series: data
    });
}

function rr_hole_graph(hole, id, xmin, xmax, ymax, data, colors) {
    var xticks = [];
    for (var i = xmin; i <= xmax; ++i) {
        xticks.push(i);
    }
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: id,
            type: 'column',
            plotBorderWidth: 1,
            borderWidth: 1,
            borderRadius: 0
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            },
            series: {
                pointPadding: 0.25,
                groupPadding: 0,
                borderWidth: 0,
                shadow: false
            }
        },
        title: {
            text: 'Hål ' + hole
        },
        xAxis: {
            tickPositions: xticks,
            title: {
                text: 'Resultat'
            }
        },
        yAxis: {
            title: {
                text: 'Procent'
            },
            stackLabels: {
                enabled: true,
                style: {
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                },
                formatter: function() {
                    return this.total.toFixed(1) + "%";
                }
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>Antal kast: ' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y.toFixed(1) +'%<br/>' +
                    'Alla: ' + this.point.stackTotal.toFixed(1) + '%';
            }
        },
        credits: {
            enabled: false
        },
        colors: colors,
        series: data
    });
}

function rr_summary_ctp_graph(id, data, colors) {
    var xticks = [];
    for (var i = 1; i <= 18; ++i) {
        xticks.push(i);
    }
    var options = {
        chart: {
            renderTo: id,
            type: 'column',
            plotBorderWidth: 1,
            borderWidth: 1,
            borderRadius: 0
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            },
            series: {
                pointPadding: 0.1,
                groupPadding: 0,
                borderWidth: 0,
                shadow: false
            }
        },
        title: {
            text: 'Closest To Pin'
        },
        xAxis: {
            tickPositions: xticks,
            title: {
                text: 'Hål'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Antal CTP'
            },
            stackLabels: {
                enabled: true,
                style: {
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>Hål ' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y +'<br/>' +
                    (data.length > 1 ? ('Totalt: ' + this.point.stackTotal) : '');
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        colors: colors,
        series: data
    };
    if (data.length > 1) {
        options['legend']['enabled'] = true;
    }
    var chart = new Highcharts.Chart(options);
}

function rr_form_graph(id, xticks, player_name, player_data, player_color) {
    Highcharts.setOptions({
        lang: {
            months: ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
                     'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
            shortMonths: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun',
                          'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
            weekdays: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']
        }
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: id,
            type: 'line',
            plotBorderWidth: 1,
            borderWidth: 1,
            borderRadius: 0
        },
        title: {
            text: 'Formkurva',
            align: 'center'
        },
        xAxis: {
            type: 'datetime',
            minTickInterval: 24 * 3600 * 1000,
            dateTimeLabelFormats: {
                week: '%e %b',
                day: '%d/%m'
            }
        },
        yAxis: {
            title: {
                text: 'Resultat'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>',
            dateTimeLabelFormats: {
                week: '%Y-%m-%d',
                day: '%Y-%m-%d'
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        colors: [player_color],
        series: [{
            name: player_name,
            data: player_data,
            //step: 'center',
            pointStart: xticks[0]
        }]
    });
}
