"use client";

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface State {
  votingIssue: string;
  votesRequired: number;
  eligibleWallets: string[];
}

type Action =
  | { type: "SET_VOTING_ISSUE"; payload: string }
  | { type: "SET_VOTES_REQUIRED"; payload: number }
  | { type: "SET_ELIGIBLE_WALLET"; payload: { index: number; value: string } }
  | { type: "ADD_ELIGIBLE_WALLET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VOTING_ISSUE":
      return { ...state, votingIssue: action.payload };
    case "SET_VOTES_REQUIRED":
      return { ...state, votesRequired: action.payload };
    case "SET_ELIGIBLE_WALLET":
      const { index, value } = action.payload;
      const updatedWallets = [...state.eligibleWallets];
      updatedWallets[index] = value;
      return { ...state, eligibleWallets: updatedWallets };
    case "ADD_ELIGIBLE_WALLET":
      return { ...state, eligibleWallets: [...state.eligibleWallets, ""] };
    default:
      return state;
  }
}

export default function DeployContract(): JSX.Element {
  const initialState: State = {
    votingIssue: "",
    votesRequired: 0,
    eligibleWallets: [""],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { votingIssue, votesRequired, eligibleWallets } = state;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "votingIssue") {
      dispatch({ type: "SET_VOTING_ISSUE", payload: value });
    } else if (name === "votesRequired") {
      const parsedValue = parseInt(value, 10);
      dispatch({ type: "SET_VOTES_REQUIRED", payload: parsedValue });
    }
  };

  const handleEligibleWalletChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    dispatch({ type: "SET_ELIGIBLE_WALLET", payload: { index, value } });
  };

  const handleAddEligibleWallet = (): void => {
    dispatch({ type: "ADD_ELIGIBLE_WALLET" });
  };

  const handleDeployContract = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Implement contract deployment logic
    console.log("Deploying contract...");
    console.log("Voting Issue:", votingIssue);
    console.log("Votes Required:", votesRequired);
    console.log("Eligible Wallets:", eligibleWallets);
  };

  return (
    <main className="w-96">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Deploy contract
      </h2>

      <form className="flex flex-col" onSubmit={handleDeployContract}>
        <Input
          name="votingIssue"
          label="Voting Issue:"
          value={votingIssue}
          onChange={handleInputChange}
          className="mb-4"
          fullWidth
        />
        <Input
          name="votesRequired"
          label="Votes Required:"
          value={votesRequired.toString()}
          onChange={handleInputChange}
          className="mb-4"
          type="number"
        />
        <label className="flex flex-col items-start">
          <span className="text-gray-700 mb-1">Eligible Wallets:</span>
          {eligibleWallets.map((wallet, index) => (
            <input
              key={index}
              className="border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full px-3 py-2 mb-4"
              type="text"
              value={wallet}
              onChange={(e) => handleEligibleWalletChange(e, index)}
              required
            />
          ))}
        </label>
        <button
          className="border border-gray-700 rounded-md px-2 py-1 mb-8 w-32 text-gray-700"
          onClick={handleAddEligibleWallet}
          type="button"
        >
          Add wallet +
        </button>
        <Button className="self-center w-32" type="submit">
          Deploy
        </Button>
      </form>
    </main>
  );
}
