import React, { useRef, useEffect } from 'react';
import useResizeObserver from '@/utils/ResizeObserver';
import { select, scaleLinear } from 'd3';
import { useTheme } from '@material-ui/core/styles';
import { seatColorMapping } from '@/config';

const config = {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  barHeight: 24,
  textMargin: 3,
  barMargin: 5,
  labelFontSize: 12,
  // ...config
};

function VoteVsSeat({ votes, seats, title }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const theme = useTheme();
  
  // will be called initially and on every votes change
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const { barHeight, barMargin, textMargin, labelFontSize } = config;

    const total = votes.DEMO + votes.BEIJING;

    const percent = scaleLinear().domain([0, total]).range([0, 100]);

    const votesArr = [
      {
        value: votes.DEMO,
        cumulative: 0,
        percentage: percent(votes.DEMO),
        color: seatColorMapping.FC_EXPECTED_WIN_DEMO,
      },
      {
        value: votes.BEIJING,
        cumulative: votes.DEMO,
        percentage: percent(votes.BEIJING),
        color: seatColorMapping.FC_EXPECTED_WIN_BEIJING,
      },
    ];

    // set up scales for horizontal placement
    const xScale = scaleLinear()
      .domain([0, total])
      .range([0, barHeight * seats.length]);

    svg.selectAll('.vote-label').remove();
    svg
      .append('text')
      .attr('class', 'vote-label')
      .attr('text-anchor', 'start')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(${0},${labelFontSize})`)
      .style('fill', theme.palette.text.primary)
      .style('font-size', labelFontSize)
      .style('font-weight', 400)
      .text(title.vote);

    // stack rect for each votes value
    svg
      .selectAll('.vote-stacked')
      .data(votesArr)
      .join('rect')
      .attr('class', 'vote-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', labelFontSize + textMargin)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', d => d.color)
      .style('stroke', theme.palette.background.paper);

    svg.selectAll('.seat-label').remove();
    svg
      .append('text')
      .attr('class', 'seat-label')
      .attr('text-anchor', 'start')
      .attr('x', 0)
      .attr('y', labelFontSize + textMargin + barHeight + barMargin / 2)
      .attr('transform', `translate(${0},${labelFontSize})`)
      .style('fill', theme.palette.text.primary)
      .style('font-size', labelFontSize)
      .style('font-weight', 400)
      .text(title.seat);

    // stack rect for each data value
    svg.selectAll('.seat-stacked').remove();
    svg
      .selectAll('seat')
      .data(seats)
      .join('rect')
      .attr('class', 'seat-stacked')
      .attr('x', (d, i) => i * barHeight)
      .attr(
        'y',
        labelFontSize + textMargin + barHeight + barMargin + labelFontSize
      )
      .attr('height', barHeight)
      .attr('width', barHeight)
      .style('fill', d => d.color)
      .style('stroke', theme.palette.background.paper);

    // add the labels
    svg
      .selectAll('.text-percentage-label')
      .data(votesArr)
      .join('text')
      .attr('class', 'text-percentage-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + xScale(d.value) / 2)
      .attr('y', labelFontSize + textMargin + barHeight / 2 + 5)
      .style('fill', '#000000')
      .style('font-size', 16)
      .style('font-weight', 700)
      .text(d => `${d.percentage.toFixed(0)}%`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes, seats, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{
          overflow: 'visible',
          display: 'block',
          width: `${config.barHeight * seats.length}px`,
          height: '84px',
        }}
      />
    </div>
  );
}

export default VoteVsSeat;
