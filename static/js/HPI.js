// @TODO: YOUR CODE HERE!

const ENABLED_OPACITY = 1;
const DISABLED_OPACITY = .2;

d3.csv('https://github.com/mvsayewich/project3/blob/master/datasets/mergeddataset.csv')
  .then(data => draw(data));

function draw(data) {
  const margin = {top: 20, right: 20, bottom: 50, left: 50};
  const width = 750 - margin.left - margin.right;
  const height = 420 - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .range([0, width]);

  const y = d3.scaleLinear()
    .range([height, 0]);
  
  const colorScale = d3.scaleOrdinal()
  .range([
    '#4c78a8',
    '#d8b5a5'
  ]);

  const svg = d3.select('.chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${ margin.left },${ margin.top })`);


    data.forEach(d => {
      d.Date = new Date(d.Date);
      d.Composite_Benchmark = +d.Composite_Benchmark;
    });
    
    x.domain(d3.extent(data, d => d.Date));
    y.domain([0, d3.max(data, d => d.Composite_Benchmark)]);
    colorScale.domain(d3.map(data, d => d.regionId)
    .keys());

    const xAxis = d3.axisBottom(x)
    .ticks((width + 2) / (height + 2) * 5)
    .tickSize(-height - 6)
    .tickPadding(10);
  
  const yAxis = d3.axisRight(y)
    .ticks(5)
    .tickSize(7 + width)
    .tickPadding(-15 - width)
    .tickFormat(d => d + '%');
  
  svg.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(0,${ height + 6 })`)
    .call(xAxis);
  
  svg.append('g')
    .attr('transform', 'translate(-7, 0)')
    .attr('class', 'axis y-axis')
    .call(yAxis);
  
  svg.append('g')
    .attr('transform', `translate(0,${ height })`)
    .call(d3.axisBottom(x).ticks(0));
  
  svg.append('g')
    .call(d3.axisLeft(y).ticks(0));

    const nestByRegionId = d3.nest()
    .key(d => d.regionId)
    .sortKeys((v1, v2) => (parseInt(v1, 10) > parseInt(v2, 10) ? 1 : -1))
    .entries(data);
  
    const regionsNamesById = {};

   nestByRegionId.forEach(item => {
    regionsNamesById[item.key] = item.values[0].regionName;
  });

  const regions = {};
  
  d3.map(data, d => d.regionId)
    .keys()
    .forEach(function (d, i) {
      regions[d] = {
        data: nestByRegionId[i].values,
        enabled: true
      };
    });
  
  const regionsIds = Object.keys(regions);
  
  const lineGenerator = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Composite_Benchmark));
  
    const legendContainer = d3.select('.legend');
    const legends = legendContainer
    .append('svg')
    .attr('width', 150)
    .attr('height', 353)
    .selectAll('g')
    .data(regionsIds)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (regionId, index) => `translate(0,${ index * 20 })`)
    .on('click', clickLegendHandler);
    legends.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', regionId => colorScale(regionId))
    .select(function() { return this.parentNode; })
    .append('text')
    .attr('x', 20)
    .attr('y', 10)
    .text(regionId => regionsNamesById[regionId])
    .attr('class', 'textselected')
    .style('text-anchor', 'start')
    .style('font-size', 12);

   const extraOptionsContainer = legendContainer.append('div')
    .attr('class', 'extra-options-container');

   extraOptionsContainer.append('div')
    .attr('class', 'hide-all-option')
    .text('hide all')
    .on('click', () => {
      regionsIds.forEach(regionId => {
        regions[regionId].enabled = false;
      });

       redrawChart();
    });

   extraOptionsContainer.append('div')
    .attr('class', 'show-all-option')
    .text('show all')
    .on('click', () => {
      regionsIds.forEach(regionId => {
        regions[regionId].enabled = true;
      });

       redrawChart();
    });

   function redrawChart() {
    const enabledRegionsIds = regionsIds.filter(regionId => regions[regionId].enabled);

     const paths = svg
      .selectAll('.line')
      .data(enabledRegionsIds);

     paths.exit()
      .remove();

     paths
      .enter()
      .append('path')
      .merge(paths)
      .attr('class', 'line')
      .attr('id', regionId => `region-${ regionId }`)
      .attr('d', regionId => lineGenerator(regions[regionId].data)
      )
      .style('stroke', regionId => colorScale(regionId));

     legends.each(function (regionId) {
      const isEnabledRegion = enabledRegionsIds.indexOf(regionId) >= 0;

       d3.select(this)
        .classed('disabled', !isEnabledRegion);
    });
  }

  redrawChart();

  function clickLegendHandler(regionId) {
   regions[regionId].enabled = !regions[regionId].enabled;

    redrawChart();
 }
}