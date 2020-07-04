import React, { useRef, useEffect } from 'react';
import { select, sum, scaleLinear } from 'd3';
import useResizeObserver from '@/utils/ResizeObserver';
import { useTheme } from '@material-ui/core/styles';

function SingleStackedBar({ data, summary, title }) {
  const theme = useTheme();
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const config = {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      barHeight: 25,
      // ...config
    };

    const { margin, barHeight } = config;
    const w = dimensions.width - margin.left - margin.right;
    const h = dimensions.height - margin.top - margin.bottom;
    const barPostition = h / 2;

    const groupData = (dat, total) => {
      // use scale to get percent values
      const percent = scaleLinear().domain([0, total]).range([0, 100]);
      // filter out data that has zero values
      // also get mapping for next placement
      // (save having to format data for d3 stack)
      let cumulative = 0;
      const dataArr = dat
        .map(d => {
          cumulative += d.value;
          return {
            ...d,
            value: d.value,
            cumulative: cumulative - d.value,
            label: d.label,
            percent: percent(d.value),
          };
        })
        .filter(d => d.value > 0);
      return dataArr;
    };

    const total = sum(data, d => d.value);
    const dataArr = groupData(data, total);

    // set up scales for horizontal placement
    const xScale = scaleLinear().domain([0, total]).range([0, w]);

    // stack rect for each data value
    svg
      .selectAll('rect')
      .data(dataArr)
      .join('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', barPostition)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', d => d.color)
      .style('stroke', theme.palette.background.paper);

    Object.keys(summary).forEach((camp, i) => {
      // Text Background
      const bg = {
        xMargin: 3,
        yFromHalfBarHeight: 60,
        width: 30,
        height: 22,
      };
      svg.selectAll(`.${camp}-name-bg`).remove();
      svg
        .append('rect')
        .attr('class', `${camp}-name-bg`)
        .attr('x', () =>
          i === 0
            ? 0 + theme.spacing(2)
            : dimensions.width - theme.spacing(2) - bg.width
        )
        .attr('y', 0)
        .attr('width', bg.width)
        .attr('height', bg.height)
        .style('fill', summary[camp].background);

      // Camp Name Text
      svg.selectAll(`.${camp}-name`).remove();
      svg
        .append('text')
        .attr('class', `${camp}-name`)
        .attr('text-anchor', summary[camp].pos)
        .text(summary[camp].name)
        .attr('x', () =>
          i === 0
            ? 0 + theme.spacing(2) + bg.xMargin
            : dimensions.width - theme.spacing(2) - bg.xMargin
        )
        .attr('y', 16)
        .style('fill', '#000000')
        .style('font-size', 12)
        .style('font-weight', 500);

      // Camp Total
      svg.selectAll(`.${camp}-total`).remove();
      svg
        .append('text')
        .attr('class', `${camp}-total`)
        .attr('text-anchor', summary[camp].pos)
        .text(summary[camp].total)
        .attr('x', () =>
          i === 0 ? 0 + theme.spacing(2) : dimensions.width - theme.spacing(2)
        )
        .attr('y', barPostition)
        .style('fill', theme.palette.text.primary)
        .style('font-size', 36)
        .style('font-weight', 900);
    });

    // Title
    svg.selectAll('.center-text').remove();
    svg
      .append('text')
      .attr('class', 'center-text')
      .attr('text-anchor', 'middle')
      .text(title)
      .attr('x', dimensions.width / 2)
      .attr('y', 16)
      .style('fill', theme.palette.text.primary)
      .style('font-size', 12)
      .style('font-weight', 500);

    svg.selectAll('.halfway').remove();
    svg
      .append('line')
      .attr('class', 'halfway')
      .style('stroke', theme.palette.text.primary)
      .attr('x1', xScale(total / 2))
      .attr('y1', barPostition - 2)
      .attr('x2', xScale(total / 2))
      .attr('y2', barPostition + barHeight + 2);

    svg.selectAll('.halfway-triangle').remove();
    svg
      .append('text')
      .attr('class', 'halfway-triangle')
      .attr('text-anchor', 'middle')
      .attr('x', xScale(total / 2))
      .attr('y', barPostition - 6)
      .style('fill', theme.palette.text.primary)
      .style('font-size', 12)
      .text('▾');

    svg.selectAll('.halfway-text').remove();
    svg
      .append('text')
      .attr('class', 'halfway-text')
      .attr('text-anchor', 'middle')
      .attr('x', xScale(total / 2))
      .attr('y', barPostition - 16)
      .style('fill', theme.palette.text.primary)
      .style('font-size', 12)
      .text(total / 2);

    // add the labels
    svg
      .selectAll('.text-label')
      .data(dataArr)
      .join('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + xScale(d.value) / 2)
      .attr('y', h / 2 + barHeight + 12)
      .style('fill', d => d.color)
      .style('font-size', 12)
      .style('font-weight', 700)
      .text(d => d.label);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default SingleStackedBar;
