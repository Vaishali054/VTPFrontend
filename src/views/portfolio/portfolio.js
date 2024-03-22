import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import "./portfolio.css";
import { fetchPortfolio, togglePortfolio } from "../../api/portfolio";
import TopNavBar from "../../components/topNavbar/topNavBar";

const Portfolio = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("TotalValue");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isPublic, setIsPublic] = useState(false);

  const fetchPort = async () => {
    try {
      const response = await fetchPortfolio(userId);
      setPortfolio(response.portfolio);
      if (response.message === "Unauthorized") {
        setPortfolio([]);
      }
      if (response.status !== "private") {
        setIsPublic(!isPublic);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  useEffect(() => {
    fetchPort();
  }, [userId]);

  const COLORS = [
    "#0088FE",
    "#10C49F",
    "#FFBB28",
    "#FF8042",
    "#FF66B2",
    "#674838",
    "#678893",
    "#784450",
    "#365890",
  ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedPortfolio = [...portfolio].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  const handleToggleVisibility = async () => {
    try {
      const response = await togglePortfolio();
      if (response.message !== "Unauthorized") {
        setIsPublic(!isPublic);
        alert("Portfolio visibility changed!!");
      } else {
        alert("Login to be able to change visibility of your Portfolio!");
      }
    } catch (error) {
      console.error("Error updating portfolio visibility:", error);
    }
  };
  let totalValue = 0;
  if (portfolio.length > 0) {
    totalValue = portfolio.reduce((acc, stock) => acc + stock.TotalValue, 0);
  }

  return (
    <>
      <div className="portfolio-container">
        <TopNavBar />
        <h2 className="start">User Portfolio</h2>

        <div className="toggle-container">
          <button onClick={handleToggleVisibility} className="toggle-button">
            {isPublic ? "Make Portfolio Private" : "Make Portfolio Public"}
          </button>
        </div>
        {portfolio && portfolio.length > 0 ? (
          <div className="centered">
            <PieChart width={400} height={400} className="styled-pie-chart">
              <Pie
                dataKey="TotalValue"
                data={portfolio}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label={({ CompanyDetails, value }) =>
                  `${CompanyDetails.symbol} (${value})`
                }
              >
                {portfolio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div>
              {" "}
              <b>Total Portfolio Value: ${totalValue}</b>
            </div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Number of Stocks</th>
                  <th onClick={() => handleSort("TotalValue")}>
                    Value of Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPortfolio.map((stock) => (
                  <tr key={stock._id}>
                    <td>{stock.CompanyDetails.company_name}</td>
                    <td>{stock.Quantity}</td>
                    <td>{stock.TotalValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="centered">
            <p>
              <b>Total Portfolio Value(INR) = 0</b>
            </p>
            <p>No stocks in possession currently.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
