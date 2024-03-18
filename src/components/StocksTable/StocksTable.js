import React from 'react'
import { DataGrid } from "@mui/x-data-grid";

export default function StocksTable({ rows, columns, getRowClassName }) {
  return (
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={15}
        getRowClassName={getRowClassName}
        // disableSelectionOnClick
      />
  )
}
