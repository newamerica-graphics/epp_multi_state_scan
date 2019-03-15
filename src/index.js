import { DataTable } from "@newamerica/data-table";
import { ChartContainer, Title, Source } from "@newamerica/meta";
import { Empty, Half, Full } from "./lib/icons";
import StackedBar from "./StackedBar";
import "./index.scss";

let queue = [];
let data = null;

const iconRenderer = value => {
  switch (value) {
    case "0":
      return <Empty />;
    case "1":
      return <Half />;
    case "2":
      return <Full />;
  }
};

const settings = {
  data_table: el => {
    const _data = data.table;
    const columns = [
      {
        Header: "State",
        accessor: "State",
        minWidth: 120
      },
      ...Object.keys(_data[0])
        .filter(d => d !== "State")
        .map(d => ({
          Header: d,
          accessor: d,
          minWidth: 210,
          Cell: ({ value }) => {
            return iconRenderer(value);
          }
        }))
    ];
    ReactDOM.render(
      <ChartContainer full>
        <Title>
          Figure 3 | State by State Comparison: What Culturally Responsive
          Competencies Does Your State’s Teaching Standards Address?
        </Title>
        <div className="dv-key">
          <div className="dv-key__item">
            <Empty />
            <span>Does not address</span>
          </div>
          <div className="dv-key__item">
            <Half />
            <span>
              Addresses competency, but does not differentiates standards by
              teacher career level or performance level
            </span>
          </div>
          <div className="dv-key__item">
            <Full />
            <span>
              Addresses competency and differentiates standards by teacher
              career level or performance level
            </span>
          </div>
        </div>
        <DataTable columns={columns} data={_data} />
        <Source>Source: New America's analysis</Source>
      </ChartContainer>,
      el
    );
  },
  column_chart: el => {
    ReactDOM.render(<StackedBar data={data.chart} />, el);
  }
};

fetch(
  "https://na-data-projects.s3.amazonaws.com/data/epp/multi_state_scan.json"
)
  .then(response => response.json())
  .then(_data => {
    data = _data;
    for (let i = 0; i < queue.length; i++) queue[i]();
  });

window.renderDataViz = function(el) {
  let id = el.getAttribute("id");
  let chart = settings[id];
  if (!chart) return;

  if (data) {
    chart(el);
  } else {
    queue.push(() => chart(el));
  }
};
