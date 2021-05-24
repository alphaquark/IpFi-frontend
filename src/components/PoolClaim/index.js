import React from 'react';
import { RoundButton } from '../../components';
import { numberWithCommas, toFixedSpecial } from '../../utils';
import styled from 'styled-components';

export const PoolClaim = (props) => {
    return (
        <Wrapper>
            {props.approval && (
                <React.Fragment>
                    <div>
                        <div>Claim</div>
                        <div>
                            <div>
                                {props.stakedPrice && !props.disabled
                                    ? numberWithCommas(toFixedSpecial(props.stakedPrice, 0))
                                    : '--'}
                            </div>
                            <div>
                                =$
                                {props.stakedPrice && !props.disabled
                                    ? numberWithCommas(
                                          toFixedSpecial(props.stakedPrice * props.baseUsd, 0)
                                      )
                                    : '--'}
                            </div>
                        </div>
                    </div>
                    <RoundButton disabled={props.disabled} onClick={props.claimReward}>
                        Claim reward
                    </RoundButton>
                </React.Fragment>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: auto 0;
    > div {
        display: flex;
        max-height: 48px;
        min-height: 48px;
        * {
            font-size: 24px;
            line-height: 24px;
        }

        > div:first-child {
            margin-right: auto;
        }
        > div:last-child {
            margin-left: auto;
            text-align: right;
            > div:last-child {
                font-size: 15px !important;
                opacity: 0.5;
            }
        }
    }
`;
