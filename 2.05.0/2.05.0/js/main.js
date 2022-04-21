/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.5 - Activity: Adding SVGs to the screen
 */

const svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600)

svg
  .append('rect')
  .attr('width', 300)
  .attr('height', 150)
  .attr('x', 50)
  .attr('y', 50)
  .attr('fill', '#394738')

svg
  .append('line')
  .attr('x1', 550)
  .attr('y1', 450)
  .attr('x2', 750)
  .attr('y2', 250)
  .attr('stroke-width', 10)
  .attr('stroke', '#D7B9A9')

svg.append('ellipse')
  .attr('cx', 250)
  .attr('cy', 350)
  .attr('rx', 100)
  .attr('ry', 50)
  .attr('fill', '#C92F43')
