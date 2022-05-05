/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

d3.csv('./data/revenues.csv')
  .then(data => {
    // convert strings to numbers
    data = data.map(d => ({
      ...d,
      revenue: Number(d.revenue),
      profit: Number(d.profit)
    }))
    const MARGINS = { TOP: 50, RIGHT: 50, BOTTOM: 75, LEFT: 100 }
    const CANVAS_HEIGHT = 400 + MARGINS.TOP + MARGINS.BOTTOM
    const CANVAS_WIDTH = 650 + MARGINS.LEFT + MARGINS.RIGHT

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d.revenue))])
      .range([CANVAS_HEIGHT, 0])

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([0, CANVAS_WIDTH])
      .paddingInner(0.3)
      .paddingOuter(0.3)


    const leftAxis = d3.axisLeft(y)
    const bottomAxis = d3.axisBottom(x)

    const chartArea = d3
      .select('#chart-area')
      .append('svg')
      .attr('height', CANVAS_HEIGHT + MARGINS.TOP + MARGINS.BOTTOM)
      .attr('width', CANVAS_WIDTH + MARGINS.LEFT + MARGINS.RIGHT)
      .style('background-color', '#eaeaea')
      .style('margin-top', '30px')

    const g = chartArea
      .append('g')
      .attr('height', CANVAS_HEIGHT)
      .attr('width', CANVAS_WIDTH)
      .attr('transform', `translate(${MARGINS.LEFT}, ${MARGINS.TOP})`)

    g.append('g')
      .attr('class', 'left-axis')
      .attr('transform', `translate(0,0)`)
      .call(leftAxis)
      // Y-axis label
    g.append('text')
    .attr('font-size', '20px')
    .attr('y', -10-MARGINS.LEFT/2)
    .attr('x', -CANVAS_HEIGHT/2)
    .attr('text-anchor', 'middle')
    .attr('transform', "rotate(-90)")
      .text('Revenue')

    g.append('g')
      .attr('class', 'bottom-axis')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT})`)
      .call(bottomAxis)
      .selectAll('text')
      .attr('text-anchor', 'center')

    // x-axis label
    g.append('text')
      .attr('font-size', '20px')
      .attr('x', CANVAS_WIDTH/2)
      .attr('y', 10 + CANVAS_HEIGHT + MARGINS.BOTTOM/2 )
      .text('Month')

    const revenueRects = g
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', d => y(0) - y(d.revenue))
      .attr('width', x.bandwidth)
      .attr('x', (d, i) => x(d.month))
      .attr('y', d => y(d.revenue))
      
      .append('rect')
      .attr('fill', '#9483ab')
      .attr('height', d => y(0) - y(d.profit))
      .attr('width', x.bandwidth)
      .attr('x', (d, i) => x(d.month))
      .attr('y', d => y(d.profit))
      
  })

  .catch(error => console.log(error))
