import React from 'react';
import styled from 'styled-components';
export const APYBalance = (props) => {
    return (
        <Wrapper>
            <div>APY</div>
            <div>
                <span>{props.percentage ? props.percentage : '--'}</span>%
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    min-height: 48px;
    max-height: 48px;
    * {
        font-size: 24px;
    }
    > div:last-child {
        margin-left: auto;
    }
`;
