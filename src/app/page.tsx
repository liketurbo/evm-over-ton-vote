import Image from "next/image";

export default function Home() {
  return (
    <main className="w-2/5">
      <div
        className="grid mb-8"
        style={{
          gridTemplateColumns: "128px 1fr",
        }}
      >
        <Image
          src="/ballot-box.png"
          width={128}
          height={128}
          alt="Ballot Logo"
          className="row-span-2"
        />
        <h1 className="text-4xl font-semibold mb-2 text-center">
          VotON: Decentralized Voting Platform
        </h1>
        <p className="text-xl text-center">Vote in TON using EVM wallet</p>
      </div>
      <section className="justify-self-start mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why choose TON over Ethereum:
        </h2>
        <ul className="list-none text-lg text-gray-800">
          <li className="mb-1">
            <span role="img" aria-label="Scalability">
              🚀
            </span>{" "}
            Faster block generation with 5 sec against 12
          </li>
          <li>
            <span role="img" aria-label="Low Fees">
              💰
            </span>{" "}
            Lower transaction fee with $0.008 against $0.694
          </li>
        </ul>
      </section>
      <section className="justify-self-start">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Getting started
        </h2>
        TODO
      </section>
    </main>
  );
}
