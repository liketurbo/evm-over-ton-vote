import { toNano } from 'ton-core';
import { VotingSystem } from '../wrappers/VotingSystem';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const votingSystem = provider.open(
        VotingSystem.createFromConfig(
            {
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
            },
            await compile('VotingSystem')
        )
    );

    await votingSystem.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(votingSystem.address);

    console.log('ID', await votingSystem.getID());
}
