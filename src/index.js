import { DataTableWithSearch } from "@newamerica/data-table";
import { ChartContainer, Title, Source } from "@newamerica/meta";
import { Empty, Half, Full } from "./lib/icons";
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
          minWidth: d === "Cultural/Linguistic Communication " ? 200 : 150,
          Cell: ({ value }) => {
            return iconRenderer(value);
          }
        }))
    ];
    ReactDOM.render(
      <ChartContainer full>
        <Title>This is a title</Title>
        <DataTableWithSearch columns={columns} data={_data} />
      </ChartContainer>,
      el
    );
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
