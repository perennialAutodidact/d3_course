/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */

d3.json('./data/buildings.json').then(data => {
  data = data.map(item => ({ ...item, height: Number(item.height) }))

  const svg = d3
    .select('#chart-area')
    .append('svg')
    .attr('width', 500)
    .attr('height', 400)

  const barChart = svg.selectAll('rect').data(data)

  barChart.enter().append('rect')
    .attr('width', 25)
    .attr('height', d=>d.height)
    .attr('x', (d,i)=>35*i)
    .attr('y', d=>400-d.height)
    .attr('fill', '#000')


})
