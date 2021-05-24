import { TOKENS_BY_NETWORK } from '../../utils';
import { StakeButton, PoolClaim, RemovePool, LPButton, APYBalance } from '../../components';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrice } from '../../modules';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { PER_POOL_UNIT } from '../../constant';
import styled, { css } from 'styled-components';
import UniSwapABI from '../../abi/Uniswap.abi.json';
import ChefABI from '../../abi/Chef.abi.json';
import ERC20ABI from '../../abi/ERC20.abi.json';
import TokenABI from '../../abi/Token.abi.json';
import { useInterval } from '../../hooks';
import { POOL_ICON } from '../../utils';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

export const Farm = (props) => {
    const chainId = TOKENS_BY_NETWORK[props.chainId];

    const dispatch = useDispatch();
    const setPriceReduxAction = useCallback(
        (t) => {
            dispatch(setPrice(t));
        },
        [dispatch]
    );
    const intl = useIntl();
    const { account, library } = useWeb3React();
    const ethContract = new Contract(
        chainId[`pool${props.id}`].address,
        ERC20ABI,
        library.getSigner()
    );
    const poolContract = new Contract(
        chainId[`pool${props.id}`].address,
        UniSwapABI,
        library.getSigner()
    );

    const price = useSelector((state) => state.price);
    const ethUsdtContract = new Contract(chainId['uni1'].address, UniSwapABI, library.getSigner());
    const baseEthContract = new Contract(chainId[`uni2`].address, UniSwapABI, library.getSigner());
    const chefContract = new Contract(chainId.chef.address, ChefABI, library.getSigner());
    const tokenContract = new Contract(chainId['token'].address, TokenABI, library.getSigner());

    const [percentage, setPercentage] = React.useState(0);
    const [balance, setBalance] = React.useState(0);
    const [approval, setApproval] = React.useState(false);
    const [stakeBalance, setStakeBalance] = React.useState(0);
    const [decimals, setDecimals] = React.useState(0);

    const claimReward = async () => {
        try {
            await chefContract.deposit(chainId[`pool${props.id}`].id, 0);
        } catch (e) {
            console.log(e);
        }
    };

    const setApproveSpend = async () => {
        try {
            await ethContract.approve(
                chainId.chef.address,
                '10000000000000000000000000000000000000000000000000000000'
            );
        } catch (e) {
            console.log(e);
        }
    };

    const stakedTokenBalanceDeposit = async (amount) => {
        try {
            await chefContract.deposit(
                chainId[`pool${props.id}`].id,
                new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
            );
        } catch (e) {
            console.log(e);
        }
    };

    const stakedTokenBalanceWithdraw = async (amount) => {
        try {
            await chefContract.withdraw(
                chainId[`pool${props.id}`].id,
                new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
            );
        } catch (e) {
            console.log(e);
        }
    };

    const getAPY = useCallback(async () => {
        try {
            const r1 = await poolContract.getReserves();
            const totalSupply = await poolContract.totalSupply();
            const stakedSupply = await poolContract.balanceOf(chainId.chef.address || 0);
            const percentageOfSupplyInPool = stakedSupply / totalSupply;

            setPercentage(
                parseInt(
                    ((PER_POOL_UNIT / ((r1['_reserve0'] * 2) / Math.pow(10, 18))) *
                        100 *
                        chainId[`pool${props.id}`].mul) /
                        percentageOfSupplyInPool
                )
            );
        } catch (e) {
            console.log(e);
        }
    }, [chainId, poolContract, props.id]);

    const getPendingToken = useCallback(async () => {
        try {
            const pendingToken = await chefContract.pendingTemp(
                chainId[`pool${props.id}`].id,
                account
            );

            setPriceReduxAction({
                target: `${chainId[`pool${props.id}`].id}/staked`,
                value: pendingToken / Math.pow(10, 18),
            });
        } catch (e) {
            console.log('pendingtokenERror', e);
        }
    }, [account, chainId, chefContract, props.id, setPriceReduxAction]);

    const getUserInfo = useCallback(async () => {
        try {
            const userBalance = await chefContract.userInfo(chainId[`pool${props.id}`].id, account);
            setBalance(userBalance[0].toString());
        } catch (e) {
            console.log(e);
        }
    }, [account, chainId, chefContract, props.id]);

    const getEthBalanceForDecimals = useCallback(async () => {
        try {
            const userBalance = await ethContract.balanceOf(account);
            const getDecimals = await ethContract.decimals();
            setStakeBalance(userBalance.toString());
            setDecimals(getDecimals);
        } catch (e) {
            console.log(e);
        }
    }, [account, ethContract]);

    const getAllowance = useCallback(async () => {
        try {
            const isAllowance = await ethContract.allowance(account, chainId.chef.address);
            setApproval(isAllowance > 0);
        } catch (e) {
            console.log(e);
        }
    }, [account, chainId.chef.address, ethContract]);

    const getReserved = useCallback(async () => {
        try {
            const r1 = await baseEthContract.getReserves(); // baseeth
            const r2 = await ethUsdtContract.getReserves(); // ethusdt
            const tokenSupply = await tokenContract.totalSupply();
            const tokenBalance = await tokenContract.balanceOf(account);
            const baseEth = r1['_reserve1'] / r1['_reserve0'];
            const ethUsd = (r2['_reserve0'] / r2['_reserve1']) * Math.pow(10, 18 - 6);

            setPriceReduxAction({
                target: 'userBalance',
                value: tokenBalance / Math.pow(10, 18),
            });
            setPriceReduxAction({ target: 'baseUsd', value: baseEth * ethUsd });
            setPriceReduxAction({
                target: 'totalSupply',
                value: tokenSupply / Math.pow(10, 18),
            });
        } catch (e) {
            console.log(e);
        }
    }, [account, baseEthContract, ethUsdtContract, setPriceReduxAction, tokenContract]);
    useEffect(() => {
        if (!props.disabled) {
            getReserved();
            getAPY();
            getAllowance();
            getEthBalanceForDecimals();
            getUserInfo();
            getPendingToken();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInterval(() => {
        if (!props.disabled) {
            getReserved();
            getAPY();
            getAllowance();
            getEthBalanceForDecimals();
            getUserInfo();
            getPendingToken();
        }
    }, 5000);

    return chainId && chainId.token ? (
        <FarmWrapper
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            delay={props.delay}
            inVisible={props.inVisible}
            shadowLevel={chainId[`pool${props.id}`].mul}
            contents={intl.formatMessage({ id: 'protocolScreen.controller.locked' })}>
            <Display>
                <div>
                    <IconWrapper>
                        <ImgWrapper>
                            <img src={POOL_ICON[chainId[`pool${props.id}`].base]} />
                        </ImgWrapper>
                        <ImgWrapper>
                            <img src={POOL_ICON[chainId[`pool${props.id}`].target]} />
                        </ImgWrapper>
                    </IconWrapper>
                    <div>
                        {chainId[`pool${props.id}`].base}/{chainId[`pool${props.id}`].target}
                    </div>
                </div>
                <div>
                    <APYBalance disabled={props.disabled} percentage={percentage} />
                    <LPButton
                        disabled={props.disabled}
                        url={chainId[`pool${props.id}`].uniswapUrl}
                    />
                </div>
            </Display>
            <Controller>
                <FlexItem>
                    <PoolClaim
                        disabled={props.disabled}
                        approval={approval}
                        stakedPrice={price[`${props.id}/staked`] ? price[`${props.id}/staked`] : 0}
                        baseUsd={price.baseUsd ? price.baseUsd : 0}
                        claimReward={claimReward}
                    />
                </FlexItem>
                <FlexItem invert={true} approval={approval}>
                    <StakeButton
                        disabled={props.disabled}
                        invert={true}
                        approval={approval}
                        balance={stakeBalance}
                        setApproveSpend={setApproveSpend}
                        stakedTokenBalance={stakedTokenBalanceDeposit}
                        decimals={decimals}
                    />
                </FlexItem>
                <FlexItem invert={true} approval={approval}>
                    <RemovePool
                        disabled={props.disabled}
                        invert={true}
                        approval={approval}
                        stakedTokenBalance={stakedTokenBalanceWithdraw}
                        balance={balance}
                        decimals={18}
                    />
                </FlexItem>
            </Controller>
        </FarmWrapper>
    ) : (
        <div />
    );
};

const IconWrapper = styled.div`
    display: flex;
`;

const ImgWrapper = styled.div`
    > img {
        width: 30px;
        height: auto;
        margin: 0 -2px;
        margin-bottom: 5px;
    }
`;

const FarmWrapper = styled.div`
    display: flex;
    background: #0c141d;
    max-height: 116px;
    min-height: 116px;
    border: 1px solid #333;
    box-shadow: 0 0 40px 0 rgba(72, 191, 187, ${(props) => props.shadowLevel * 0.1});
    margin-bottom: 30px;
    transition-delay: ${(props) => props.delay}s;
    position: relative;
    ${(props) =>
        props.inVisible &&
        `
    ::before {
        display: block;
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }
    ::after {
        display: block;
        position: absolute;
        width: 200px;
        height: 35px;
        content: '${props.contents}';
        line-height:35px;
        border-radius:200px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
    }
  `}
`;

const Display = styled.div`
    display: flex;
    flex: 1;
    > div:first-child {
        margin: auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        > div {
            font-size: 18px;
            text-transform: uppercase;
            margin: auto;
        }
    }
    > div {
        flex: 1;
        padding: 0 20px;
        margin: auto;
    }
`;

const Controller = styled.div`
    display: flex;
    flex: 2.5;
`;

const FlexItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    background: ${(props) => (props.invert && props.approval ? '#19a0d7' : '#0c141d')};
`;
