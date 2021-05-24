import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import React, { useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import ERC20ABI from '../../abi/ERC20.abi.json';
import { formatUnits } from '@ethersproject/units';
import { toFixedSpecial } from '../../utils';

export const TokenBalance = ({ symbol, address, decimals, ...args }) => {
    const { account, library } = useWeb3React();
    const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);
    useEffect(() => {
        const contract = new Contract(address, ERC20ABI, library.getSigner());
        contract.balanceOf(account).then((res) => {
            console.log(res);
        });
        console.log(contract);

        const fromMe = contract.filters.Transfer(account, null);
        library.on(fromMe, (from, to, amount, event) => {
            mutate(undefined, true);
        });
        const toMe = contract.filters.Transfer(null, account);
        library.on(toMe, (from, to, amount, event) => {
            mutate(undefined, true);
        });
        return () => {
            library.removeAllListeners(toMe);
            library.removeAllListeners(fromMe);
        };
    }, [account, address, library, mutate]);

    if (!balance) {
        return <div>...</div>;
    }

    return (
        <div>
            <div>
                token {toFixedSpecial(parseFloat(formatUnits(balance, 18)), 2)} {symbol}
            </div>
        </div>
    );
};
