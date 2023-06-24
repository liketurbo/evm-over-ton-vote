import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, beginCell, toNano } from 'ton-core';
import { VotingSystem } from '../wrappers/VotingSystem';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

export const fakeBallot = {
    votingIssue: 'Make next youtube video about Tact language features',
    votesRequired: 6,
    eligibleWallets: [
        '0x8F34beE39052EEF6d247c4f635F9598c57DD8483',
        '0xD807f7e2818dB8edA0d28B5bE74866338eaEDB86',
        '0x2DfA798841D05593d58cbA987df5c1A742e682bE',
        '0x481ca518C602A27276B3188491601A3209095927',
        '0x9C269e1272eafb51Ea4517A620EB8DFF4DC8CcB9',
        '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
        '0x129a261afAAe9Fc9AB9D5107e840560d052Cd97E',
        '0x151D35771F734a7e5D9100Def7FFd4c521aaDa81',
        '0x90D96799d5ad299229a57b0A97fd7a9AD8821F18',
    ],
};

describe('VotingSystem', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('VotingSystem');
    });

    let blockchain: Blockchain;
    let votingSystem: SandboxContract<VotingSystem>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        votingSystem = blockchain.openContract(VotingSystem.createFromConfig(fakeBallot, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await votingSystem.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: votingSystem.address,
            deploy: true,
            success: true,
        });
    });

    it.skip('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and votingSystem are ready to use
    });

    it.skip('should return votes required', async () => {
        const requiredVotes = await votingSystem.getVotesRequired();
        expect(requiredVotes).toBe(fakeBallot.votesRequired);
    });

    it.skip('should return voting issue', async () => {
        const votingIssue = await votingSystem.getVotingIssue();
        expect(votingIssue).toMatch(fakeBallot.votingIssue);
    });
});
