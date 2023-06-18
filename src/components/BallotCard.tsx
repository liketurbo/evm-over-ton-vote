"use client";

import React, { useCallback, useState } from "react";
import cls from "classnames";
import Button from "@/components/Button";
import VotePopup from "@/components/VotePopup";

export const statusEmoji: Record<string, string> = {
  progress: "⏳",
  passed: "✅",
  declined: "❌",
  draw: "🏳️",
};

type BallotStatus = "progress" | "passed" | "declined" | "draw";

export interface Ballot {
  id: number;
  title: string;
  status: BallotStatus;
  eligibleWallets: string[];
  toPassNeed: number;
}

interface BallotCardProps {
  className?: string;
  ballot: Ballot;
}

function getRequiredVotesText(ballot: Ballot) {
  if (ballot.toPassNeed === ballot.eligibleWallets.length) {
    return "(All votes required)";
  } else {
    const voteLabel = ballot.toPassNeed === 1 ? "vote" : "votes";
    return `(Min. ${ballot.toPassNeed} ${voteLabel} required)`;
  }
}

function getStatusText(status: BallotStatus) {
  switch (status) {
    case "progress":
      return "(In progress)";
    case "passed":
      return "(Passed)";
    case "declined":
      return "(Declined)";
    case "draw":
      return "(Draw)";
    default:
      return "";
  }
}

const BallotCard: React.FC<BallotCardProps> = ({ ballot, className = "" }) => {
  const [expandWallets, setExpandWallets] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleExpandWallets = useCallback(() => {
    setExpandWallets((prevState) => !prevState);
  }, []);

  const handleVoteClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const greenBars = Math.round(
    (ballot.toPassNeed * 6) / ballot.eligibleWallets.length
  );
  const greyBars = 6 - greenBars;

  return (
    <>
      <div
        key={ballot.id}
        className={`p-4 border border-gray-300 rounded flex flex-col max-w-xl ${className}`}
      >
        <div className="flex mb-4">
          <h3 className="text-lg font-bold max-w-md">{ballot.title}</h3>
          <p className="ml-auto">
            {statusEmoji[ballot.status]}{" "}
            <span className="text-xs font-medium uppercase">
              {getStatusText(ballot.status)}
            </span>
          </p>
        </div>
        <div className="flex mb-4">
          <div className="flex">
            {Array(greenBars)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-1 h-4 mr-1 bg-blue-500"></div>
              ))}
            {Array(greyBars)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-1 h-4 mr-1 bg-gray-300"></div>
              ))}
          </div>
          <span className="text-xs font-medium uppercase">
            {getRequiredVotesText(ballot)}
          </span>
        </div>
        <div
          className={cls(
            "flex flex-col",
            ballot.status === "progress" && "mb-6"
          )}
        >
          <h4 className="font-semibold mb-1">Eligible Wallets:</h4>
          <ul>
            {ballot.eligibleWallets
              .slice(0, expandWallets ? undefined : 4)
              .map((wallet, i) => (
                <li
                  key={wallet}
                  className={cls(
                    "font-mono mb-1 inline-block link",
                    i === ballot.eligibleWallets.length - 1 && "mb-0",
                    i % 2 === 0 ? "text-black-500" : "text-gray-500"
                  )}
                >
                  <a
                    href={`https://etherscan.io/address/${wallet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {wallet}
                  </a>
                </li>
              ))}
          </ul>
          {ballot.eligibleWallets.length > 4 && (
            <button
              type="button"
              className="justify-self-center text-sm hover:text-blue-600 transition-all duration-100"
              onClick={toggleExpandWallets}
            >
              {expandWallets ? "Collapse" : "Show More"}
              <span
                className={cls(
                  "inline-block ml-2 transform",
                  expandWallets && "rotate-180"
                )}
              >
                &#x25BC;
              </span>
            </button>
          )}
        </div>
        {ballot.status === "progress" && (
          <Button className="w-1/5" onClick={handleVoteClick}>
            Vote
          </Button>
        )}
      </div>
      {modalOpen && <VotePopup onClose={handleCloseModal} />}
    </>
  );
};

export default BallotCard;
