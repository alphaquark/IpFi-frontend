import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
    5: 'https://goerli.infura.io/v3/f552cdf4b7b3431494dadfb60eaddf0c',
};

export const network = new NetworkConnector({
    urls: { 1: RPC_URLS[1], 4: RPC_URLS[4], 5: RPC_URLS[5] },
    defaultChainId: 1,
    pollingInterval: POLLING_INTERVAL,
});

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
});
