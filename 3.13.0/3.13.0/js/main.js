/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

d3.csv("./data/revenues.csv")
  .then((data) => {
    // convert strings to numbers
    data = data.map((d) => ({
      ...d,
      revenue: Number(d.revenue),
      profit: Number(d.profit),
    }));
    const MARGINS = { TOP: 50, RIGHT: 50, BOTTOM: 50, LEFT: 50 };
    const CANVAS_HEIGHT = 400 + MARGINS.TOP + MARGINS.BOTTOM;
    const CANVAS_WIDTH = 600 + MARGINS.LEFT + MARGINS.RIGHT;

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d.revenue))])
      .range([CANVAS_HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, CANVAS_WIDTH])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const leftAxis = d3.axisLeft(y);
    const bottomAxis = d3.axisBottom(x)

    const chartArea = d3
      .select("#chart-area")
      .append("svg")
      .attr("height", CANVAS_HEIGHT + MARGINS.TOP + MARGINS.BOTTOM)
      .attr("width", CANVAS_WIDTH + MARGINS.LEFT + MARGINS.RIGHT)
      .style("background-color", "#eaeaea")
      .style("margin-top", "30px")
      

      const g = chartArea.append("g")
      .attr("height", CANVAS_HEIGHT)
      .attr("width", CANVAS_WIDTH)
      .attr("transform", `translate(${MARGINS.LEFT}, ${MARGINS.TOP})`)

      g.append("g")
      .attr("class", "left-axis")
      .attr("transform", `translate(0,0)`)
      .call(leftAxis)

      g.append("g")
      .attr('class', 'bottom-axis')
      .attr('transform', `translate(0, ${CANVAS_HEIGHT})`)
      .call(bottomAxis)

      const rects = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("height", (d) => y(d.revenue))
      .attr("width", 30)
      .attr("x", (d, i) => x(d.month))
      .attr("y", (d) => CANVAS_HEIGHT - y(d.revenue));
  })

  .catch((error) => console.log(error));
