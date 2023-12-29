//@ts-nocheck
import './reset.css'
import "./App.css";
import { useState, useContext } from "react";
import { TransactionsContext } from "./context/TransactionsContext";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { transactions, addTransaction, deleteTransaction } =
    useContext(TransactionsContext);

  function onSubmit(e) {
     e.preventDefault();
    if (text.trim() === '' || amount === 0) {
      return 
    }
    setText("");
    setAmount(0);
   
    addTransaction({ id: uuidv4(), text, amount });
  }

  const balance = transactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const income = transactions.reduce((acc, curr) => {
    if (curr.amount > 0) {
      return acc + curr.amount;
    }
    return acc + 0;
  }, 0);

  const expenses = transactions.reduce((acc, curr) => {
    if (curr.amount < 0) {
      return acc + curr.amount;
    }
    return acc + 0;
  }, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="balance-container">
        <span className="total-balance">
          Your Balance:<span className="balance">${balance} </span>
        </span>
        <div className="money-in-and-out">
          <span className="income">
            Income <span className="green-income-marker">${income}</span>
          </span>
          <span className="expenses">
            expenses
            <span className="red-expense-marker"> {expenses}$</span>
          </span>
        </div>
      </div>
      <h2>History</h2>
      <ul className="history">
        {transactions.map((transaction) => {
          return (
            <li
              key={transaction.id}
              className={`transaction ${
                transaction.amount > 0 ? "money-in" : "money-out"
              }`}>
              <span className="item-name">{transaction.text}</span>
              <div className="amount-delete-container">
                <span className="item-amount"> {transaction.amount}</span>
                <MdDeleteForever
                  className="delete-icon"
                  onClick={() => deleteTransaction(transaction.id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <h2 className="transaction-header">Add New Transaction</h2>
      <form className="new-transaction">
        <div className="transaction-text">
          <label htmlFor="text" className="text-label">
            Transaction
          </label>
          <input
            type="text"
            id="text"
            placeholder="Input transaction..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="amount-container">
          <label htmlFor="amount" className="amount-label">
            Amount
          </label>
          <span className="amount-description">
            (Positive - Income, Negative - Expense)
          </span>
          <input
            type="number"
            id="amount"
            placeholder="Input amount..."
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="add" onClick={onSubmit}>
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default App;

