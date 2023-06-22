import TonConnect, { IStorage, TonConnectOptions } from "@tonconnect/sdk";

export const mockedStorage: IStorage = {
  async setItem(key: string, value: string): Promise<void> {
    // Implementation logic goes here
    // This is a mock function, so you can define the desired behavior
    // For example, you can store the key-value pair in an internal object
    console.log(`Setting item: key=${key}, value=${value}`);
  },
  async getItem(key: string): Promise<string | null> {
    // Implementation logic goes here
    // This is a mock function, so you can define the desired behavior
    // For example, you can retrieve the value from an internal object based on the key
    console.log(`Getting item: key=${key}`);
    return null; // Returning null as a placeholder
  },
  async removeItem(key: string): Promise<void> {
    // Implementation logic goes here
    // This is a mock function, so you can define the desired behavior
    // For example, you can remove the key-value pair from an internal object
    console.log(`Removing item: key=${key}`);
  },
};

const dappMetadata: TonConnectOptions = {
  manifestUrl:
    "https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt",
  storage: mockedStorage,
};

const connector = new TonConnect(dappMetadata);

export default connector;
