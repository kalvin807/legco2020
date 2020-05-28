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

function SeatRowChart({ data, summary }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        if (!dimensions) return;

        const config = {
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            length: Math.min(16, dimensions.width / 13),
            itemMargin: 12
            // ...config
        }

        const { length } = config
        // stack rect for each data value
        svg
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('class', 'rect-stacked')
            .attr('x', (d, i) => i * ( length + dimensions.width / 13 / 2))
            .attr('y', 0)
            .attr('height', length)
            .attr('width', d => length)
            .style('fill', (d, i) => d.color)
        

    }, [data, dimensions]);

    return (
        <div ref={wrapperRef}>
            <svg ref={svgRef} style={{
                overflow: 'visible',
                display: 'block',
                width: '100%',
                height: `16px`,
            }}>
            </svg>
        </div>
    );
}

export default SeatRowChart;
