import AddIcon from "@mui/icons-material/Add";
import { handleAddToWatchlist } from "./watchlistUtils";
import IconButton from "@mui/material/IconButton";
import BuyModal from "../components/buyModal/buyModal";
import SellModal from "../components/sellModal/sellModal";

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
    field: "currentprice",
    headerName: "Current Price",
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
          <BuyModal stock={params.row.stock} price={params.row.currentprice} company_id={params.row.company_id}/>
          <SellModal stock={params.row.stock} price={params.row.currentprice} company_id={params.row.company_id}/>
          <IconButton
            onClick={() => handleAddToWatchlist(params.row.symbol)}
            color="inherit"
          >
            <AddIcon />
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
      currentprice: stockData.current_Price,
      change: stockData.change,
      pChange: stockData.pChange,
      symbol: stockData.symbol,
      company_id: stockData.Company_Id,
    }));
  }
  return rows;
};
