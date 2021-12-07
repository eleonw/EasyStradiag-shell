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
        orientation: -90
    };

    var trace = {
        r: data.degree,
        theta: data.theta,
        mode: 'lines',
        name: 'Strabismus Degree',
        line: {color: 'blue'},
        type: 'scatterpolar'
    }

    var data = [trace]

    Plotly.newPlot('chart', data, layout);
}