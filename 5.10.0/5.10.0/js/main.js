/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 2 - Gapminder Clone
 */

const CANVAS = {
  HEIGHT: 450,
  WIDTH: 650,
  LABELSIZE: 50
}

const MARGINS = {
  TOP: 50,
  LEFT: 50,
  BOTTOM: 50,
  RIGHT: 50
}

const DELAY_DURATION = 100

d3.json('data/data.json').then(function (data) {
  const formattedData = data.map(year => {
    return year['countries']
      .filter(country => {
        const dataExists = country.income && country.life_exp
        return dataExists
      })
      .map(country => {
        country.income = Number(country.income)
        country.life_exp = Number(country.life_exp)
        return country
      })
  })

  const chartArea = d3
    .select('#chart-area')
    .append('svg')
    .attr(
      'height',
      CANVAS.HEIGHT + MARGINS.TOP + MARGINS.BOTTOM + CANVAS.LABELSIZE
    )
    .attr(
      'width',
      CANVAS.WIDTH + MARGINS.LEFT + MARGINS.RIGHT + CANVAS.LABELSIZE
    )

  const mainGroup = chartArea
    .append('g')
    .attr('height', CANVAS.HEIGHT)
    .attr('width', CANVAS.WIDTH)
    .attr(
      'transform',
      `translate(${MARGINS.LEFT + CANVAS.LABELSIZE}, ${MARGINS.TOP})`
    )

  let maxPopulation = d3.max(
    data.map(d => d3.max(d.countries.map(c => c.income)))
  )

  // RADIUS SCALE
  let areaScale = d3
    .scaleLinear()
    .domain([1, maxPopulation * 1000])
    .range([25 * Math.PI, 1500 * Math.PI])

  let colorScale = d3
    .scaleOrdinal()
    .domain(['africa', 'americas', 'asia', 'europe'])
    .range(d3.schemePastel1)

  let maxIncome = d3.max(data.map(d => d3.max(d.countries.map(c => c.income))))
  const xScale = d3
    .scaleLog()
    .base(2)
    .domain([100, maxIncome + Math.round(maxIncome / 10)])
    .range([0, CANVAS.WIDTH])

  const xAxis = d3.axisBottom(xScale).tickValues([0, 400, 4000, 40000])

  const yScale = d3
    .scaleLinear()
    .domain([0, 90])
    .range([CANVAS.HEIGHT, 0])

  const yAxis = d3.axisLeft(yScale)

  const xAxisGroup = mainGroup.append('g')

  xAxisGroup
    .append('text')
    .attr('y', CANVAS.HEIGHT + CANVAS.LABELSIZE)
    .attr('x', CANVAS.WIDTH / 2)
    .text('GDP Per Capita ($)')
    .attr('text-anchor', 'middle')
    .attr('style', `font-size: ${CANVAS.LABELSIZE}}`)

  xAxisGroup
    .append('g')
    .attr('transform', `translate(0, ${CANVAS.HEIGHT})`)
    .call(xAxis)

  // LEFT LABEL
  const yAxisGroup = mainGroup.append('g')
  yAxisGroup
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -CANVAS.LABELSIZE)
    .attr('x', -CANVAS.HEIGHT / 2)
    .attr('text-anchor', 'middle')
    .text('Life Expectancy (Years)')
    .attr('style', `font-size: ${CANVAS.LABELSIZE}}`)

  yAxisGroup.append('g').call(yAxis)

  const yearLabelGroup = mainGroup
    .append('g')
    
    const yearLabel = yearLabelGroup
    .append('text')
    .attr('x', CANVAS.WIDTH - 300)
    .attr('y', CANVAS.HEIGHT - 50)
    .attr('style', 'opacity: 15%; font-size: 100px;')
    .text('1800')
    
    yearLabelGroup
    .append('text')
    .text('YEAR')
    .attr('x', -CANVAS.HEIGHT+70)
    .attr('y', CANVAS.WIDTH - 300)
    .attr('text-anchor', 'middle')
    .attr('style', 'opacity: 15%; font-size: 20px;')
    .attr('transform', `rotate(-90)`)

  const update = data => {
    const t = d3.transition().duration(DELAY_DURATION)

    // JOIN
    yearLabel.text(yearIndex + 1800)

    const circles = mainGroup.selectAll('circle').data(data, d => d.country)

    // EXIT
    circles
      .exit()
      // .transition(t)
      // .attr('opacity', 0)
      .remove()

    // UPDATE
    circles
      .enter()

      .append('circle')
      .attr('stroke', c => colorScale(c.continent))
      .attr('stroke-width', 2)
      .attr('fill', 'transparent')

      .merge(circles)
      .transition(t)

      .attr('cx', c => xScale(c.income))
      .attr('cy', c => yScale(c.life_exp))
      .attr('r', c => Math.sqrt(areaScale(c.population)) / Math.PI)
  }
  let isPlaying = true
  var yearIndex = 0
  d3.interval(() => {
    if (isPlaying) {
      if (yearIndex > 214) {
        isPlaying = false
      }
      update(formattedData[yearIndex])
    } else {
      setTimeout(() => {
        yearIndex = 0
      }, 3000)
    }
    yearIndex++
  }, DELAY_DURATION)

  update(formattedData[yearIndex])
})
