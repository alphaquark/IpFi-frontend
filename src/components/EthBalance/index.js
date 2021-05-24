import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import React, { useEffect } from 'react';
import { formatEther } from '@ethersproject/units';

export const EthBalance = () => {
    const { account, library } = useWeb3React();
    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest']);

    useEffect(() => {
        library.on('block', () => {
            mutate(undefined, true);
        });
        return () => {
            library.removeAllListeners('block');
        };
    }, [library, mutate]);

    if (!balance) {
        return <div>...</div>;
    }
    return <div>{parseFloat(formatEther(balance)).toPrecision(4)} Ξ</div>;
};
