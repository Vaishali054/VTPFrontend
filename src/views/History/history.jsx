import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../../api/transaction';
import TopNavBar from '../../components/TopNavbar/TopNavBar';

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
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <>
      <TopNavBar />
      <div>
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Company Name</th> { }
              <th>Price</th>
              <th>Quantity</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.Transaction_Id}</td>
                <td>{transaction.company_name}</td> { }
                <td>{transaction.price}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsPage;
