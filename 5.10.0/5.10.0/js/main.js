/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 2 - Gapminder Clone
 */

const CANVAS = {
  HEIGHT: 450,
  WIDTH: 650
}

const MARGINS = {
  TOP: 50,
  LEFT: 50,
  BOTTOM: 50,
  RIGHT: 50
}

d3.json('data/data.json').then(function (data) {
  const chartArea = d3
    .select('#chart-area')
    .append('svg')
    .attr('height', CANVAS.HEIGHT + MARGINS.TOP + MARGINS.BOTTOM)
    .attr('width', CANVAS.WIDTH + MARGINS.LEFT + MARGINS.RIGHT)

  const mainGroup = chartArea
    .append('g')
    .attr('height', CANVAS.HEIGHT)
    .attr('width', CANVAS.WIDTH)
    .attr('transform', `translate(${MARGINS.LEFT}, ${MARGINS.TOP})`)

  let maxIncome = d3.max(data.map(d => d3.max(d.countries.map(c => c.income))))
  const xScale = d3
    .scaleLog()
    .domain([100, maxIncome + Math.round(maxIncome / 10)])
    .range([0, CANVAS.WIDTH])

  const xAxis = d3.axisBottom(xScale).tickValues([400, 4000, 40000])

  const xAxisGroup = mainGroup
    .append('g')
    .attr('transform', `translate(0, ${CANVAS.HEIGHT})`)
    .call(xAxis)
  // const yAxis = d3.axisLeft(yScale)
})
