import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimensions(entry.contentRect);
            });
        });
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref]);
    return dimensions;
};

function SeatRowChart({ data, width, height }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        if (!dimensions) return;
        const config = {
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            itemMargin: 2
            // ...config
        }

        const length = (dimensions.width - 2 * config.itemMargin) / 3

        // stack rect for each data value
        svg
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('class', 'rect-stacked')
            .attr('x', (d, i) => parseInt(i % 3) * (length + config.itemMargin))
            .attr('y', (d, i) => parseInt(i / 3) * (length + config.itemMargin))
            .attr('height', length)
            .attr('width', length)
            .style('fill', (d, i) => d.color)
        

    }, [data, dimensions]);

    return (
        <div ref={wrapperRef}>
            <svg ref={svgRef} style={{
                overflow: 'visible',
                display: 'block',
                width: `${width}px`,
                height: `${width}px`,
            }}>
            </svg>
        </div>
    );
}

export default SeatRowChart;
