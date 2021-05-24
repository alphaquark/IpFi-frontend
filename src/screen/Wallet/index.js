import React, { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { SWRConfig } from 'swr';
import fetcher from 'swr-eth';
import { EthBalance } from '../../components';
import { Farm } from '../../containers';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { Networks, shorter, TOKENS_BY_NETWORK } from '../../utils';

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        Networks.MainNet, // Mainet
        Networks.Ropsten, // Ropsten
        Networks.Rinkeby, // Rinkeby
        Networks.Goerli, // Goerli
        Networks.Kovan, // Kovan
    ],
});

export const Wallet = () => {
    const { chainId, account, library, activate, active, connector } = useWeb3React();
    const ABIs = useMemo(() => {
        const abiObject = TOKENS_BY_NETWORK[chainId]
            ? Object.entries(TOKENS_BY_NETWORK[chainId]).map((e) => e[1])
            : [];
        return abiObject.map(({ address, abi }) => [address, abi]);
    }, [chainId]);

    const onClick = () => {
        activate(injectedConnector);
    };

    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager || !!activatingConnector);

    return (
        <div>
            <div>ChainId: {chainId}</div>
            <div>Account: {shorter(account)}</div>
            {active ? (
                <div>
                    <span role="img" aria-label="checked">
                        ✅
                    </span>
                </div>
            ) : (
                <button type="button" onClick={onClick}>
                    Connect
                </button>
            )}
            {active && (
                <SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
                    <EthBalance />
                    <Farm chainId={chainId} />
                </SWRConfig>
            )}
        </div>
    );
};
