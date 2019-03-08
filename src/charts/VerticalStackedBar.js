import React from "react";
import PropTypes from "prop-types";
import { BarStack } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { GridRows } from "@vx/grid";
import { max } from "d3-array";

const StackedBar = ({
  width,
  height,
  handleMouseMove,
  handleMouseLeave,
  data,
  x,
  yFormat,
  xFormat,
  yAxisLabel,
  xAxisLabel,
  numTicksY,
  keys,
  colors,
  margin
}) => {
  const totals = data.reduce((acc, cur) => {
    const t = keys.reduce((total, key) => {
      total += +cur[key];
      return total;
    }, 0);
    acc.push(t);
    return acc;
  }, []);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors
  });
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.2
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(totals)],
    nice: true
  });
  return (
    <Group top={margin.top} left={margin.left}>
      <GridRows
        scale={yScale}
        width={xMax}
        numTicks={
          typeof numTicksY === "function" ? numTicksY(width) : numTicksY
        }
      />
      <BarStack
        data={data}
        keys={keys}
        x={x}
        xScale={xScale}
        yScale={yScale}
        color={colorScale}
      >
        {barStacks => {
          return barStacks.map(barStack =>
            barStack.bars.map(bar => (
              <rect
                key={`barstack-${barStack.index}-${bar.index}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
                onMouseLeave={handleMouseLeave ? handleMouseLeave : null}
                onMouseMove={event =>
                  handleMouseMove
                    ? handleMouseMove({ event, data, datum: bar })
                    : null
                }
              />
            ))
          );
        }}
      </BarStack>
      <AxisLeft
        scale={yScale}
        hideAxisLine={true}
        hideTicks={true}
        tickFormat={yFormat}
        label={yAxisLabel}
        tickLabelProps={() => ({
          width: margin.left,
          textAnchor: "end",
          verticalAnchor: "middle",
          dx: "-0.3em"
        })}
        numTicks={
          typeof numTicksY === "function" ? numTicksY(width) : numTicksY
        }
      />
      <AxisBottom
        scale={xScale}
        top={yMax}
        hideAxisLine={false}
        hideTicks={false}
        tickFormat={xFormat}
        tickLabelProps={() => ({
          dy: "-0.5em",
          width: xScale.bandwidth(),
          textAnchor: "middle",
          verticalAnchor: "start"
        })}
        label={xAxisLabel}
        labelProps={{
          dy: "2.5em",
          textAnchor: "middle",
          verticalAnchor: "start"
        }}
      />
    </Group>
  );
};

StackedBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleMouseMove: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  data: PropTypes.array.isRequired,
  /**
   * Accessor function for y axis values
   */
  x: PropTypes.func.isRequired,
  /**
   * An array of strings with the column keys of each bar
   */
  keys: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  numTicksY: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

StackedBar.defaultProps = {
  margin: {
    top: 10,
    left: 60,
    right: 40,
    bottom: 40
  }
};

export default StackedBar;
