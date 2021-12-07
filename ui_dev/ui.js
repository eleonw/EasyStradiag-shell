function plotFigure(data) {

    var layout = {
        font: {
            family: 'Arial, sans-serif;',
            size: 8,
            color: '#000'
        },
        width: 300,
        height: 300,
        margin: {
            l: 40,
            r: 40,
            t: 40,
            b: 40
        },
        // paper_bgcolor: '#3f3f3f',
        // plot_bgcolor: '#3f3f3f',
        dragmode: false,
        orientation: -90,

        
    };

    var trace = {
        r: data.degree,
        theta: data.theta,
        mode: 'lines',
        name: 'Strabismus Degree',
        line: {
            color: '#0F4776',
            width: 1
        },
        // line: {color: '#FCBD16'},
        type: 'scatterpolar'
    }

    var data = [trace]

    var config = {
        "displaylogo": false,
        modeBarButtonsToRemove: ['toImage', 'zoom2d']
    }

    Plotly.newPlot('chart', data, layout, config);
}

plotFigure( {
    theta: [],
    degree: []
});

function uiPlotFigure() {
    let data = {
        theta: [],
        degree: [],
    }
    
    for(let i = 0; i < 360; ++i) {
        data.theta.push(i);
        data.degree.push(2 + Math.random() * 0.5)
    }
    
    plotFigure(data);
}

uiPlotFigure();


