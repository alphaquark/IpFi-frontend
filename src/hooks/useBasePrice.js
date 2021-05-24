import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { TOKENS_BY_NETWORK } from '../utils';
import UniSwapABI from '../abi/Uniswap.abi.json';
import TokenABI from '../abi/Token.abi.json';
import { Contract } from '@ethersproject/contracts';
import { setPrice } from '../modules';
import { useDispatch } from 'react-redux';

export const useBasePrice = (chainId) => {
    const { account, library } = useWeb3React();
    const dispatch = useDispatch();
    const setPriceReduxAction = (t) => {
        dispatch(setPrice(t));
    };
    const CHAIN_ID = TOKENS_BY_NETWORK[chainId];
    const poolContract = new Contract(CHAIN_ID['pool0'].address, UniSwapABI, library.getSigner());
    const baseContract = new Contract(CHAIN_ID['uni1'].address, UniSwapABI, library.getSigner());
    const tokenContract = new Contract(CHAIN_ID['token'].address, TokenABI, library.getSigner());

    useEffect(() => {
        const getReserved = async () => {
            try {
                const r1 = await poolContract.getReserves();
                const r2 = await baseContract.getReserves();
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
                    target: 'marketCap',
                    value: (tokenSupply / Math.pow(10, 18)) * baseEth * ethUsd,
                });
            } catch (e) {
                console.log(e);
            }
        };
        getReserved();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
