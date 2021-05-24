import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { TOKENS_BY_NETWORK } from '../utils';
import ChefABI from '../abi/Chef.abi.json';
import { Contract } from '@ethersproject/contracts';
import { setPrice } from '../modules';
import { useDispatch } from 'react-redux';
import { useInterval } from '../hooks';
import axios from 'axios';

export const useEtherscan = (chainId) => {
    const { library } = useWeb3React();
    const dispatch = useDispatch();
    const setPriceReduxAction = (t) => {
        dispatch(setPrice(t));
    };
    const CHAIN_ID = TOKENS_BY_NETWORK[chainId];
    const chefContract = new Contract(CHAIN_ID['chef'].address, ChefABI, library.getSigner());
    const [dateTime, setdateTime] = useState(0);

    const getBalanceInfo = async () => {
        try {
            const startBlock = await chefContract.startBlock();
            const currentWeek = await chefContract.getCurrentHalvFactor();
            const currentBlock = await chefContract.getBlockNumber();
            const period = await chefContract.halvingPeriod();

            setPriceReduxAction({
                target: 'period',
                value: parseFloat(period),
            });
            setPriceReduxAction({
                target: 'currentBlock',
                value: parseFloat(currentBlock),
            });
            setPriceReduxAction({
                target: 'currentWeek',
                value: Math.log2(parseFloat(currentWeek)) + 1,
            });
            setPriceReduxAction({
                target: 'startBlock',
                value: parseFloat(startBlock),
            });
            const { data } = await axios.get(
                `https://${
                    chainId === 1 ? 'api.etherscan.io' : 'api-goerli.etherscan.io'
                }/api?module=block&action=getblockcountdown&blockno=${
                    parseFloat(startBlock) +
                    Math.log2(parseFloat(currentWeek)) +
                    1 * parseFloat(period)
                }&apikey=SX37M2RUZQFZ9S4214MCAUG9TGY94S6F6P`
            );
            setdateTime(data.result['EstimateTimeInSec']);
        } catch (e) {
            console.log(e);
        }
    };
    useInterval(() => {
        getBalanceInfo();
    }, 30000);
    useInterval(() => {
        setdateTime(dateTime - 1);
    }, 1000);
    useEffect(() => {
        getBalanceInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { dateTime };
};
