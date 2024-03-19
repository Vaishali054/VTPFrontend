import { Button } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { handleAddToWatchlist } from "./watchlistUtils";
import IconButton from '@mui/material/IconButton';

const handlebuy = () => {};
const handlesell = () => {};

export const columns = [
  {
    field: "stock",
    headerName: "Stock",
    sortable: true,
    width: 160,
    renderCell: (params) => (
      <div>
        <div>{params.value}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>
          ({params.row.symbol})
        </div>
      </div>
    ),
  },
  {
    field: "dayhigh",
    headerName: "Day High",
    sortable: true,
    width: 130,
    renderHeader: (params) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "var(--unstable_DataGrid-headWeight)",
          }}
        >
          {params.colDef.headerName}
        </span>
        <div
          style={{
            fontSize: "12px",
            color: "gray",
            lineHeight: "0",
            top: "-12px",
            position: "relative",
          }}
        >
          (INR)
        </div>
      </div>
    ),
  },
  {
    field: "daylow",
    headerName: "Day Low",
    sortable: true,
    width: 130,
    renderHeader: (params) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "var(--unstable_DataGrid-headWeight)",
          }}
        >
          {params.colDef.headerName}
        </span>
        <div
          style={{
            fontSize: "12px",
            color: "gray",
            lineHeight: "0",
            top: "-12px",
            position: "relative",
          }}
        >
          (INR)
        </div>
      </div>
    ),
  },
  {
    field: "lastclose",
    headerName: "Last Close",
    sortable: true,
    width: 130,
    renderHeader: (params) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "var(--unstable_DataGrid-headWeight)",
          }}
        >
          {params.colDef.headerName}
        </span>
        <div
          style={{
            fontSize: "12px",
            color: "gray",
            lineHeight: "0",
            top: "-12px",
            position: "relative",
          }}
        >
          (INR)
        </div>
      </div>
    ),
  },
  {
    field: "change",
    headerName: "Change",
    renderCell: (params) => {
      const value = params.value ? params.value.toFixed(2) : "";
      return (
        <span style={{ color: value >= 0 ? "green" : "red" }}>{value}</span>
      );
    },
  },
  {
    field: "pChange",
    headerName: "%Change",
    renderCell: (params) => {
      const value = parseFloat(params.value).toFixed(2);
      return (
        <span style={{ color: value >= 0 ? "green" : "red" }}>
          {params.value}
        </span>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 185,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            onClick={handlebuy}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px",
              marginRight: "5px",
            }}
          >
            Buy
          </Button>
          <Button
            onClick={handlesell}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px",
              marginRight: "5px"
            }}
          >
            Sell
          </Button>
          <IconButton
                onClick={() => handleAddToWatchlist(params.row.symbol)}
                color="inherit"
              >
                <AddIcon/>
              </IconButton>
        </div>
      );
    },
  },
];

export const formatRows = (data, isSuccess) => {
  let rows = [];
  if (
    isSuccess &&
    data !== undefined &&
    data.length > 0 &&
    data !== "Network Error"
  ) {
    rows = data.map((stockData, index) => ({
      id: index,
      stock: stockData.company_name,
      dayhigh: stockData.max_stock_price,
      daylow: stockData.min_stock_price,
      lastclose: stockData.current_Price,
      change: stockData.change,
      pChange: stockData.pChange,
      symbol: stockData.symbol,
    }));
  }
  return rows;
};
