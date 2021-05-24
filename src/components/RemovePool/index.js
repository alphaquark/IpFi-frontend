import React from 'react';
import { RoundButton } from '../../components';
import { toFixedSpecial } from '../../utils';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';

export const RemovePool = (props) => {
    return (
        <Wrapper>
            {props.approval && (
                <React.Fragment>
                    <div>
                        <div>Staked</div>
                        <div>
                            {new BigNumber(props.balance)
                                .dividedBy(new BigNumber(10).pow(props.decimals))
                                .toPrecision(4)}
                        </div>
                    </div>
                    <RoundButton
                        type={true}
                        onClick={() => {
                            const vv2 = prompt(
                                'amount',
                                new BigNumber(props.balance)
                                    .dividedBy(new BigNumber(10).pow(props.decimals))
                                    .toString()
                            );
                            if (vv2) {
                                props.stakedTokenBalance(vv2);
                            }
                        }}>
                        Withdraw
                    </RoundButton>
                </React.Fragment>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: auto 0;
    * {
        font-size: 24px;
        color: #0c141d;
    }
    > div:first-child {
        display: flex;
        min-height: 48px;
        max-height: 48px;
        > div:last-child {
            margin-left: auto;
        }
    }
`;
