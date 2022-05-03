/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

d3.csv('./data/revenues.csv')
  .then(data => {
    // convert strings to numbers
    data = data.map(d => ({...d, revenue: Number(d.revenue), profit: Number(d.profit)}))
    const MARGINS = { TOP: 100, RIGHT: 100, BOTTOM: 100, LEFT: 100 }
    const CANVAS_HEIGHT = 400
    const CANVAS_WIDTH = 600

    const chartArea = d3.select('#chart-area')
      .append('svg')
      .attr('height', CANVAS_HEIGHT)
      .attr('width', CANVAS_WIDTH)
      .attr('fill', 'red')
    
  })
  .catch(error => console.log(error))
