import React, { useRef, useEffect } from 'react'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { axisLeft, axisBottom } from 'd3-axis'
import { extent, max } from 'd3-array'

// Example lineChart taken from https://www.newline.co/fullstack-d3 by Amelia Wattenberger

// Draw canvas

export const LineChart = ({
  data,
  yAccessor,
  xAccessor,
  aspectRatio = 0.4,
}) => {
  const wrapperRef = useRef()

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    const dimensions = {
      width: 1000,
      height: 1000 * aspectRatio,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
      },
    }
    dimensions.boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    const wrapper = select(wrapperRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)

    const bounds = wrapper
      .append('g')
      .style(
        'transform',
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      )

    // Create scales

    const yScale = scaleLinear()
      .domain([0, max(data, yAccessor)])
      .range([dimensions.boundedHeight, 0])

    const xScale = scaleLinear()
      .domain(extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])

    // Draw data

    const lineGenerator = line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))

    bounds
      .append('path')
      .attr('d', lineGenerator(data))
      .attr('fill', 'none')
      .attr('stroke', '#af9358')
      .attr('stroke-width', 2)

    // Draw peripherals

    const yAxisGenerator = axisLeft().scale(yScale)

    bounds.append('g').call(yAxisGenerator)

    const xAxisGenerator = axisBottom().scale(xScale).ticks(null, 'd')

    bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)
  }, [wrapperRef])

  return <div ref={wrapperRef} />
}
