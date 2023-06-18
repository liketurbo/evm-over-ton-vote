import TonConnect, { TonConnectOptions } from "@tonconnect/sdk";

const dappMetadata: TonConnectOptions = {
  manifestUrl:
    "https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt",
};

const connector = new TonConnect(dappMetadata);

export default connector;
