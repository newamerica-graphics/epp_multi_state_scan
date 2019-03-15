import React from "react";
import { Chart } from "@newamerica/charts";
import VerticalStackedBar from "./charts/VerticalStackedBar";
import { ChartContainer, Title, Source } from "@newamerica/meta";
import { colors } from "./lib/colors";
import { LegendOrdinal } from "@vx/legend";
import { scaleOrdinal } from "@vx/scale";

const getTooltipDatum = competency => {
  switch (competency) {
    case "Does not address":
      return "tooltip_1";
    case "Addresses competency, but does not differentiates standards by teacher career level or performance level":
      return "tooltip_2";
    case "Addresses competency and differentiates standards by teacher career level or performance level":
      return "tooltip_3";
  }
};

function StackedBar({ data }) {
  const keys = [
    "Does not address",
    "Addresses competency, but does not differentiates standards by teacher career level or performance level",
    "Addresses competency and differentiates standards by teacher career level or performance level"
  ];
  const chartColors = [
    colors.grey.medium,
    colors.turquoise.light,
    colors.turquoise.dark
  ];
  const scale = scaleOrdinal({
    domain: keys,
    range: chartColors
  });
  return (
    <ChartContainer style={{ maxWidth: 800, margin: "auto" }}>
      <Title>
        Figure 2 | What Culturally Responsive Competencies do State Teaching
        Standards Address?
      </Title>
      <LegendOrdinal scale={scale} />
      <Chart
        maxWidth={800}
        height={500}
        renderTooltip={({ datum, data }) => {
          return (
            <div
              style={{
                display: "flex",
                maxWidth: 250,
                lineHeight: "1.3",
                padding: "0.25rem"
              }}
            >
              <span>
                <b>States:</b> {datum.bar.data[getTooltipDatum(datum.key)]}{" "}
                <b>({datum.bar.data[datum.key]})</b>
              </span>
            </div>
          );
        }}
      >
        {props => (
          <VerticalStackedBar
            x={d => d["Competency "]}
            keys={keys}
            colors={chartColors}
            margin={{ top: 0, left: 25, right: 40, bottom: 65 }}
            data={data}
            numTicksY={5}
            {...props}
          />
        )}
      </Chart>
      <Source>
        Source: New America's analysis <br />
        <br />
        Note: Washington and Alaska each had two standards documents that were
        reviewed for this chart; see Appendix B for the full list of standards
        documents reviewed.
      </Source>
    </ChartContainer>
  );
}

export default StackedBar;
