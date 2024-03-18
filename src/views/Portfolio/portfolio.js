import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import './portfolio.css';
import { togglePortfolio } from '../../api/togglePortfolio';
import { fetchPortfolio } from '../../api/fetchPortfolio';
import TopNavBar from '../../components/TopNavbar/TopNavBar';

const Portfolio = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState('TotalValue');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isPublic, setIsPublic] = useState(false);

  const fetchPort = async () => {
    try {
      const response = await fetchPortfolio(userId);
      setPortfolio(response.data.portfolio);
      if (response.data.portfolio.status !== 'private') {
        setIsPublic(!isPublic);
      }

    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  useEffect(() => {
    fetchPort();
  }, [userId]);

  const COLORS = ['#0088FE', '#10C49F', '#FFBB28', '#FF8042', '#FF66B2', '#674838', '#678893', '#784450', '#365890'];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedPortfolio = [...portfolio].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  const handleToggleVisibility = async () => {
    try {
      const response = await togglePortfolio();
      setIsPublic(!isPublic);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating portfolio visibility:', error);
    }
  };

  const totalValue = portfolio.reduce((acc, stock) => acc + stock.TotalValue, 0);

  return (
    <>
    <TopNavBar/>
    <div className="portfolio-container">

      <h2 className='start'>User Portfolio</h2>

      <div className="toggle-container">
        <button
          onClick={handleToggleVisibility}
          className="toggle-button"
          >
          {isPublic ? 'Make Private' : 'Make Public'}
        </button>
      </div>
      {portfolio.length > 0 ? (
        <div className="centered">
          <PieChart width={400} height={400} className="centered">
            <Pie
              dataKey="TotalValue"
              data={portfolio}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label={({ CompanyDetails, value }) => `${CompanyDetails.Symbol} (${value})`}
              >
              {portfolio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div>
            Total Portfolio Value: ${totalValue}
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Number of Stocks</th>
                <th onClick={() => handleSort('TotalValue')}>Value of Company</th>
              </tr>
            </thead>
            <tbody>
              {sortedPortfolio.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.CompanyDetails.Name}</td>
                  <td>{stock.Quantity}</td>
                  <td>{stock.TotalValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="centered">No stocks in possession currently.</p>
        )}
    </div>
    </>
  );
};

export default Portfolio;
