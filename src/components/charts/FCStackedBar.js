import React, { useRef, useEffect } from 'react';
import { select, scaleLinear } from 'd3';
import useResizeObserver from '@/utils/ResizeObserver';
import { useTheme } from '@material-ui/core/styles';

function FCStackedBar({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const theme = useTheme();
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const config = {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      barHeight: 20,
      // ...config
    };

    const { margin, barHeight } = config;
    const w = dimensions.width - margin.left - margin.right;
    // const h = dimensions.height - margin.top - margin.bottom
    const halfBarHeight = barHeight / 2;

    const lastElectionNoVote =
      data.electors_total_2016 - data.last_election_voted_count;
    const electors2020Minus2016 =
      data.electors_total_2020 - data.electors_total_2016;

    // const groupData = (data, total) => {
    //     // use scale to get percent values
    //     const percent = scaleLinear()
    //         .domain([0, total])
    //         .range([0, 100])
    //     // filter out data that has zero values
    //     // also get mapping for next placement
    //     // (save having to format data for d3 stack)
    //     let cumulative = 0
    //     const _data = data.map(d => {
    //         cumulative += d.value
    //         return {
    //             ...d,
    //             value: d.value,
    //             cumulative: cumulative - d.value,
    //             label: d.label,
    //             percent: percent(d.value)
    //         }
    //     }).filter(d => d.value > 0)
    //     return _data
    // }

    const dataArr = [
      {
        value: electors2020Minus2016,
        cumulative: 0,
        label: 'electors_2020_minus_2016',
        color: theme.palette.success.main,
      },
      {
        value: lastElectionNoVote,
        cumulative: electors2020Minus2016,
        label: 'last_election_no_vote',
        color: theme.palette.action.disabled,
      },
    ];

    const total = electors2020Minus2016 + lastElectionNoVote;
    // const _data = groupData(data, total)

    // // set up scales for horizontal placement
    const xScale = scaleLinear().domain([0, total]).range([0, w]);

    // // stack rect for each data value
    svg
      .selectAll('rect')
      .data(dataArr)
      .join('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', 0)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', d => d.color)
      .style('stroke', theme.palette.background.paper);

    svg
      .selectAll('rect-2')
      .data(dataArr)
      .join('rect-2')
      .attr('class', 'rect-stacked-2')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', 30)
      .attr('height', 50)
      .attr('width', d => xScale(d.value))
      .style('fill', d => {
        return d.color;
      })
      .style('stroke', theme.palette.background.paper);

    // Object.keys(summary).forEach((camp, i) => {
    //     // Text Background
    //     const bg = {
    //         xMargin: 3,
    //         yFromHalfBarHeight: 60,
    //         width: 30,
    //         height: 22
    //     }
    //     svg.selectAll(`.${camp}-name-bg`).remove()
    //     svg
    //         .append('rect')
    //         .attr('class', `${camp}-name-bg`)
    //         .attr('x', () => i === 0 ? 0 + theme.spacing(2) : dimensions.width - theme.spacing(2) - bg.width)
    //         .attr('y', 0)
    //         .attr("width", bg.width)
    //         .attr("height", bg.height)
    //         .style('fill', summary[camp].background)

    //     // Camp Name Text
    //     svg.selectAll(`.${camp}-name`).remove()
    //     svg
    //         .append('text')
    //         .attr('class', `${camp}-name`)
    //         .attr('text-anchor', summary[camp].pos)
    //         .text(summary[camp].name)
    //         .attr('x', () => i === 0 ? 0 + theme.spacing(2) + bg.xMargin : dimensions.width - theme.spacing(2) - bg.xMargin)
    //         .attr('y', 16)
    //         .style('fill', 'black')
    //         .style('font-size', 12)
    //         .style('font-weight', 500)

    //     // Camp Total
    //     svg.selectAll(`.${camp}-total`).remove()
    //     svg
    //         .append('text')
    //         .attr('class', `${camp}-total`)
    //         .attr('text-anchor', summary[camp].pos)
    //         .text(summary[camp].total)
    //         .attr('x', () => i === 0 ? 0 + theme.spacing(2) : dimensions.width - theme.spacing(2))
    //         .attr('y', h / 2 - halfBarHeight - 4)
    //         .style('fill', 'black')
    //         .style('font-size', 36)
    //         .style('font-weight', 900)

    // })

    // svg.selectAll('.halfway').remove()
    // svg
    //     .append("line")
    //     .attr("class", "halfway")
    //     .style("stroke", theme.palette.text.primary)
    //     .attr("x1", xScale(total / 2))
    //     .attr("y1", h / 2 - halfBarHeight - 12)
    //     .attr("x2", xScale(total / 2))
    //     .attr("y2", h / 2 + halfBarHeight + 12)

    // svg.selectAll('.halfway-text').remove()
    // svg
    //     .append('text')
    //     .attr('class', 'halfway-text')
    //     .attr('text-anchor', 'middle')
    //     .attr('x', xScale(total / 2))
    //     .attr('y', h / 2 - halfBarHeight - 16)
    //     .style('font-size', 12)
    //     .text(d => total / 2)

    // // add the labels
    svg
      .selectAll('.text-label')
      .data(dataArr)
      .join('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + xScale(d.value) / 2)
      .attr('y', halfBarHeight + 4)
      .style('fill', 'white')
      .style('font-size', 16)
      .style('font-weight', 700)
      .text(d => d.value);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{
          overflow: 'visible',
          display: 'block',
          width: '100%',
          height: '100px',
        }}
      />
    </div>
  );
}

export default FCStackedBar;
