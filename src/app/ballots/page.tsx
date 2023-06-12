import React from "react";
import cls from "classnames";
import Button from "@/components/Button";

const mockBallots = [
  {
    id: 0,
    title: "Buy flowers for our math teacher",
    status: "progress",
    eligibleWallets: [
      "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990",
      "0xcBfa884044546d5569E2abFf3fB429301b61562A",
      "0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263",
      "0x7142eF89106A38968A40d2A255A303B02066edE5",
    ],
    toPassNeed: 4,
  },
  {
    id: 1,
    title: "Switch our main server to AWS",
    status: "progress",
    eligibleWallets: [
      "0x12eFaddaB67E93846B50dB287de3ae4fE4f47f7c",
      "0xcBfa884044546d5569E2abFf3fB429301b61562A",
      "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    ],
    toPassNeed: 2,
  },
  {
    id: 2,
    title: "Make next youtube video about Tact language features",
    status: "finished",
    eligibleWallets: [
      "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
      "0x8F34beE39052EEF6d247c4f635F9598c57DD8483",
      "0xD807f7e2818dB8edA0d28B5bE74866338eaEDB86",
      "0x2DfA798841D05593d58cbA987df5c1A742e682bE",
      "0x481ca518C602A27276B3188491601A3209095927",
      "0x9C269e1272eafb51Ea4517A620EB8DFF4DC8CcB9",
      "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
      "0x129a261afAAe9Fc9AB9D5107e840560d052Cd97E",
      "0x151D35771F734a7e5D9100Def7FFd4c521aaDa81",
      "0x90D96799d5ad299229a57b0A97fd7a9AD8821F18",
      "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    ],
    toPassNeed: 6,
  },
] as Ballot[];

const statusEmoji: Record<string, string> = {
  progress: "⏳",
  finished: "✅",
};

interface Ballot {
  id: number;
  title: string;
  status: "progress" | "finished";
  eligibleWallets: string[];
  toPassNeed: number;
}

function renderRequiredVotesText(ballot: Ballot) {
  if (ballot.toPassNeed === ballot.eligibleWallets.length) {
    return "(All votes required)";
  } else {
    const voteLabel = ballot.toPassNeed === 1 ? "vote" : "votes";
    return `(Min. ${ballot.toPassNeed} ${voteLabel} required)`;
  }
}

export default function BallotsDashboard() {
  return (
    <main className="w-2/5 flex-grow">
      <h2 className="text-2xl font-bold mb-4">Ballots Dashboard</h2>
      {mockBallots.map((ballot, index) => {
        const greenBars = Math.round(
          (ballot.toPassNeed * 6) / ballot.eligibleWallets.length
        );
        const greyBars = 6 - greenBars;

        const containerClasses = cls("p-4 border border-gray-300 rounded", {
          "mb-4": index !== mockBallots.length - 1,
        });

        return (
          <div key={ballot.id} className={containerClasses}>
            <h3 className="flex text-lg font-bold mb-4">
              {ballot.title}
              <p className="ml-auto">
                {statusEmoji[ballot.status]}{" "}
                <span className="text-xs font-medium uppercase">
                  {ballot.status === "progress"
                    ? "(In progress)"
                    : "(Finished)"}
                </span>
              </p>
            </h3>
            <p className="flex mb-4">
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
                {renderRequiredVotesText(ballot)}
              </span>
            </p>
            <div className={ballot.status === "progress" ? "mb-6" : ""}>
              <h4 className="font-semibold mb-1">Eligible Wallets</h4>
              <ul>
                {ballot.eligibleWallets.map((wallet, i) => (
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
            </div>
            {ballot.status === "progress" && (
              <Button type="submit">Vote</Button>
            )}
          </div>
        );
      })}
    </main>
  );
}
