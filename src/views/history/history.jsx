import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../../api/stocks";
import TopNavBar from "../../components/topNavbar/topNavBar.js";
import "./history.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  const fetchTransactionsData = async () => {
    try {
      const transactionsData = await fetchTransactions();
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <>
      <TopNavBar />
      <div className="transactions-container">
        <h2 className="transactions-heading">Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Company Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Transaction Type</th>
              <th>Transaction Date</th>
              <th>Transaction Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.company_name}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.transactionsDate}</td>
                  <td>{transaction.transactionTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {transactions && transactions.length === 0 && (
          <p className="no-transactions-message">
            You have not performed any transactions yet!
          </p>
        )}
      </div>
    </>
  );
};

export default TransactionsPage;
