import React, { ReactNode, useReducer } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import transactionsReducer from "./transactionReducer";

export type Transaction = {
  id:string,
  text:string,
  amount:number
}

export type TransactionsState = {
  transactions: Transaction[];
};
export type TransactionsContextType = TransactionsState & {
  deleteTransaction: (id: string) => void;
  addTransaction: (transaction: Transaction) => void;
};

const initialState: TransactionsState = {
  transactions: [
    { id: uuidv4(), text: "Flower", amount: -20 },
    { id: uuidv4(), text: "Salary", amount: 300 },
    { id: uuidv4(), text: "Book", amount: -10 },
    { id: uuidv4(), text: "Camera", amount: 150 },
  ],
};

export const TransactionsContext = createContext(initialState);

function TransactionsProvider({ children }:  {children: ReactNode}) {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  function deleteTransaction(id:string) {
    dispatch({
      type: "DELETE_TRANSACTION", // Assuming you have a corresponding action type
      payload: id,
    });
  }

  function addTransaction(transaction:Transaction ) {
    dispatch({
      type: "ADD_TRANSACTION", // Assuming you have a corresponding action type
      payload: transaction,
    });
  }
const contextValue: TransactionsContextType = {
  ...state, 
  deleteTransaction,
  addTransaction,
};
  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

export default TransactionsProvider;
