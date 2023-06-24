import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type VotingSystemConfig = {
    votingIssue: string;
    votesRequired: number;
    eligibleWallets: string[];
};

export function votingSystemConfigToCell(config: VotingSystemConfig): Cell {
    const encoder = new TextEncoder();
    const view = encoder.encode(config.votingIssue);
    const buffer = Buffer.alloc(64);
    buffer.set(view);
    const output = beginCell().storeBuffer(buffer, 64).storeUint(config.votesRequired, 32);
    let prevAddresses = output;
    let currentAddresses = beginCell();
    config.eligibleWallets.forEach((address, i) => {
        if (i % 6 === 0 && i !== 0) {
            prevAddresses.storeRef(currentAddresses);
            prevAddresses = currentAddresses;
            currentAddresses = beginCell();
        }
        const rawAddress = Buffer.from(address.slice(2), 'hex');
        currentAddresses.storeBuffer(rawAddress, 20);
    });
    if (config.eligibleWallets.length % 6 !== 0 && config.eligibleWallets.length > 0) {
        prevAddresses.storeRef(currentAddresses);
    }
    return output.endCell();
}

export const Opcodes = {
    vote: 0xb5a563c1,
};

export class VotingSystem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new VotingSystem(address);
    }

    static createFromConfig(config: VotingSystemConfig, code: Cell, workchain = 0) {
        const data = votingSystemConfigToCell(config);
        const init = { code, data };
        return new VotingSystem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendVote(provider: ContractProvider, via: Sender, opts: {}) {}

    async getVotesRequired(provider: ContractProvider) {
        const result = await provider.get('get_votes_required', []);
        return result.stack.readNumber();
    }

    async getVotingIssue(provider: ContractProvider) {
        const result = await provider.get('get_voting_issue', []);
        return result.stack.readString();
    }

    async getKeccak256Hash(provider: ContractProvider) {
        const result = await provider.get('get_keccak256_hash', []);
        return result.stack.readNumber();
    }
}
