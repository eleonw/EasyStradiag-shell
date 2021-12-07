var echarts = require('echarts');

var chartDom = document.getElementById('chart');
var myChart = echarts.init(chartDom);

function _plotFigure(data) {
    let option = {
        title: {
            // text: '极坐标双数值轴'
        },
        legend: {
            data: ['line']
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            data: data
        }]
    };

    myChart.setOption(option);
}



