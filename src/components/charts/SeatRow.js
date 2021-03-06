import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import useResizeObserver from '@/utils/ResizeObserver';

function SeatRowChart({ data, width }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;
    const config = {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      itemMargin: 2,
      // ...config
    };

    const length = (dimensions.width - 2 * config.itemMargin) / 3;

    // stack rect for each data value
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'rect-stacked')
      .attr('x', (d, i) => parseInt(i % 3, 10) * (length + config.itemMargin))
      .attr('y', (d, i) => parseInt(i / 3, 10) * (length + config.itemMargin))
      .attr('height', length)
      .attr('width', length)
      .style('fill', d => d.color);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{
          overflow: 'visible',
          display: 'block',
          width: `${width}px`,
          height: `${width}px`,
        }}
      />
    </div>
  );
}

export default SeatRowChart;
