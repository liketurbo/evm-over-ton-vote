import React from "react";
import BallotCard, { Ballot } from "@/components/BallotCard";

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

export default function BallotsDashboard() {
  return (
    <main>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Ballots Dashboard
      </h2>
      {mockBallots.map((ballot, i) => (
        <BallotCard
          key={ballot.id}
          ballot={ballot}
          className={i === mockBallots.length - 1 ? "mb-0" : "mb-4"}
        />
      ))}
    </main>
  );
}
