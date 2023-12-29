
import React from "react";
import { Transaction, TransactionsState } from "./TransactionsContext";

function transactionsReducer(state: TransactionsState, action: {type:string, payload: Transaction | string}) {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (item) => item.id !== action.payload as string
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload as Transaction],
      };
    default:
      return state;
  }
}
export default transactionsReducer;
