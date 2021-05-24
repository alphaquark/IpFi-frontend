import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toFixedSpecial, numberWithCommas } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import { useEtherscan } from '../../hooks';
import moment from 'moment';
import { useIntl } from 'react-intl';

export const ProtocolPrice = (props) => {
    const { chainId } = useWeb3React();
    const price = useSelector((state) => state.price);
    const { dateTime } = useEtherscan(chainId);
    const intl = useIntl();
    return (
        <div>
            <Wrapper>
                <AnimatedDelayWrapper data-aos="fade-up" delay={0.1}>
                    <div>{intl.formatMessage({ id: 'protocolScreen.header.userBalance' })}</div>
                    <div>
                        {price.userBalance && !props.disabled
                            ? numberWithCommas(toFixedSpecial(price.userBalance, 2))
                            : '--'}
                    </div>
                    <div>
                        =$
                        {price.baseUsd && price.userBalance && !props.disabled
                            ? numberWithCommas(toFixedSpecial(price.baseUsd * price.userBalance, 2))
                            : '--'}
                    </div>
                </AnimatedDelayWrapper>
                <AnimatedDelayWrapper data-aos="fade-up" delay={0.2}>
                    <div>{intl.formatMessage({ id: 'protocolScreen.header.tokenPrice' })}</div>
                    <div>
                        $
                        {price.baseUsd && !props.disabled
                            ? numberWithCommas(toFixedSpecial(price.baseUsd, 7))
                            : '--'}
                    </div>
                </AnimatedDelayWrapper>
                <AnimatedDelayWrapper data-aos="fade-up" delay={0.3}>
                    <div>{intl.formatMessage({ id: 'protocolScreen.header.totalSupply' })}</div>
                    <div>
                        {price.totalSupply && !props.disabled
                            ? numberWithCommas(toFixedSpecial(price.totalSupply, 2))
                            : '--'}
                    </div>
                    <div>
                        =$
                        {price.totalSupply && price.baseUsd && price.userBalance && !props.disabled
                            ? numberWithCommas(toFixedSpecial(price.baseUsd * price.totalSupply, 2))
                            : '--'}
                    </div>
                </AnimatedDelayWrapper>
            </Wrapper>
            <UniswapButtonWrapper>
                <button>
                    <span>> </span>
                    {intl.formatMessage({ id: 'protocolScreen.header.buyInUniswap' })}
                </button>
            </UniswapButtonWrapper>

            <TimeContainer>
                <div>
                    {intl.formatMessage({ id: 'protocolScreen.header.nextHalvingBlock' })}:{' '}
                    {price.period && price.currentBlock && price.currentWeek && price.startBlock
                        ? price.startBlock + price.period * price.currentWeek - price.currentBlock
                        : '--'}
                </div>
                <div>
                    {intl.formatMessage({ id: 'protocolScreen.header.nextHalvingTime' })}:{' '}
                    {moment.utc(dateTime * 1000).format('HH:mm:ss')}
                </div>
            </TimeContainer>
        </div>
    );
};

const TimeContainer = styled.div`
    * {
        font-size: 13px;
    }
    display: flex;
    background: #19a0d7;
    color: #0c141d;
    border-radius: 100px;
    min-height: 30px;
    line-height: 30px;
    width: max-content;
    margin: auto;
    margin-top: 20px;
    padding: 0 10px;
    > div {
        padding: 0 10px;
    }
`;

const AnimatedDelayWrapper = styled.div`
    transition-delay: ${(props) => props.delay}s;
`;

const UniswapButtonWrapper = styled.div`
    text-align: center;
    height: 30px;
    line-height: 30px;

    > button {
        > span {
            color: #19a0d7 !important;
        }
        padding: 0 19px;
        background: black;
        color: white;
        font-size: 13px;
        border: 0;
        height: 30px;
        line-height: 30px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    min-width: 1000px;
    max-width: 1000px;
    margin: auto;
    > div {
        text-align: center;
        flex: 1;
        font-size: 14px;
        text-transform: uppercase;
        > div:nth-child(2) {
            color: #19a0d7;
            font-size: 50px;
            font-weight: bold;
        }
    }
`;
