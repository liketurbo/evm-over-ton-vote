export default function Home() {
  return (
    <main className="w-2/5 flex-grow">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        Vote in TON using EVM wallet
      </h1>
      <section className="justify-self-start">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Why choose TON over Ethereum for voting:
        </h2>
        <ul className="list-none text-lg text-gray-800 mb-6">
          <li className="mb-1">
            <span role="img" aria-label="Scalability">
              🚀
            </span>{" "}
            High scalability and throughput
          </li>
          <li className="mb-1">
            <span role="img" aria-label="Security">
              🔒
            </span>{" "}
            Enhanced security features
          </li>
          <li className="mb-1">
            <span role="img" aria-label="Low Fees">
              💰
            </span>{" "}
            Low transaction fees
          </li>
        </ul>
      </section>
    </main>
  );
}
