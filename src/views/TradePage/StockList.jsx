import * as React from "react";
import TopNavBar from "../../components/TopNavbar/TopNavBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import "./stockList.css";
import { useStocksList } from "../../hooks/useStocksList";
import { columns, formatRows } from "../../utilities/StocksUtils";
import StocksTable from "../../components/StocksTable/StocksTable";

export default function StockList() {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const { data, isLoading, isSuccess, isError, error } = useStocksList();

  let rows = formatRows(data,isSuccess);;

  const filteredRows = rows.filter((row) => {
    if (row && row.stock) {
      return row.stock.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return false;
    }
  });

  const getRowClassName = (params) => {
    const filteredIndex = filteredRows.findIndex(
      (row) => row.id === params.row.id
    );
    return filteredIndex % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNavBar />
      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        Stocks List
      </Typography>
      <div
        className="center"
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center">

          <Grid item xs={12} sm={10} md={7.5}>
            <TextField
              label="Search by Stock Name"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>

          <Grid item xs={12} sm={10} md={7.5}>
            {isLoading && 
            <div className="center">
              <CircularProgress  />
            </div>}

            {(isError || data === "Network Error") && (
              <Typography variant="body1">
                Error fetching stocks! {error?.message}
              </Typography>
            )}
            {!isLoading && !isError && data !== "Network Error" && (
              <StocksTable
                rows={filteredRows}
                columns={columns}
                getRowClassName={getRowClassName}
              />
            )}
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
}
