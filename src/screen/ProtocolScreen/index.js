import React, { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { SWRConfig } from 'swr';
import fetcher from 'swr-eth';
import { ProtocolPrice, RoundButton } from '../../components';
import { Farm } from '../../containers';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { Networks, TOKENS_BY_NETWORK, POOL_LIST } from '../../utils';
import styled from 'styled-components';

const ProtocolScreen = () => {
    const getLibrary = (provider) => {
        const library = new Web3Provider(provider);
        library.pollingInterval = 12000;
        return library;
    };

    const injectedConnector = new InjectedConnector({
        supportedChainIds: [
            Networks.MainNet, // Mainet
            Networks.Ropsten, // Ropsten
            Networks.Rinkeby, // Rinkeby
            Networks.Goerli, // Goerli
            Networks.Kovan, // Kovan
        ],
    });

    const Wallet = () => {
        const { chainId, library, activate, active, connector } = useWeb3React();
        const ABIs = React.useMemo(() => {
            const abiObject = TOKENS_BY_NETWORK[chainId]
                ? Object.entries(TOKENS_BY_NETWORK[chainId]).map((e) => e[1])
                : [];
            return abiObject.map(({ address, abi }) => [address, abi]);
        }, [chainId]);
        const [disabled, setDisabled] = React.useState(false);

        const onClick = () => {
            activate(injectedConnector);
        };

        const [activatingConnector, setActivatingConnector] = React.useState();
        useEffect(() => {
            if (activatingConnector && activatingConnector === connector) {
                setActivatingConnector(undefined);
            }
            activate(injectedConnector);
        }, [activate, activatingConnector, connector]);

        const triedEager = useEagerConnect();
        useInactiveListener(!triedEager || !!activatingConnector);

        return (
            <ProtocolScreenWrapper data-aos="fade-down" active={active}>
                {active ? (
                    <React.Fragment>
                        <SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
                            <div>
                                <StatusWrapper>
                                    <div>
                                        <ProtocolPrice disabled={disabled} chainId={chainId} />
                                    </div>
                                </StatusWrapper>

                                <FarmContainer>
                                    {POOL_LIST.map((e, i) => {
                                        return (
                                            <Farm
                                                key={i}
                                                delay={i * 0.1}
                                                disabled={e.disabled}
                                                chainId={chainId}
                                                {...e}
                                            />
                                        );
                                    })}
                                </FarmContainer>
                            </div>
                        </SWRConfig>
                    </React.Fragment>
                ) : (
                    <div>
                        <div>Wallet Connect</div>
                        <RoundButtonWrapper>
                            <RoundButton onClick={onClick}>Connect</RoundButton>
                        </RoundButtonWrapper>
                    </div>
                )}
            </ProtocolScreenWrapper>
        );
    };

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Wallet />
        </Web3ReactProvider>
    );
};

const ProtocolScreenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    background: url('${require('../../assets/protocolbg.png')}');
    background-size: cover;
    min-height: calc(100vh - 400px);
    background-position: center top;
    > div:first-child {
        display: flex;
        flex-direction: column;
        min-width: 1350px;
        max-width: 1350px;
        margin: ${(props) => (props.active ? '60px auto' : 'auto')};
        > div {
            text-align: center;
        }
        @media screen and (max-width: 768px) {
            min-width: 100%;
            max-width: 100%;
            width: 100%;
        }
    }
`;

const StatusWrapper = styled.div`
    margin: auto;
    margin-bottom: 50px;
    > div {
        text-align: center;
    }
`;

const FarmContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;
const RoundButtonWrapper = styled.div`
    width: 100px;
    margin: auto;
    margin-top: 10px;
`;

export { ProtocolScreen };
