import React from 'react';
import styled from 'styled-components';

export const RoundButton = (props) => {
    return (
        <ButtonWrapper
            disabled={props.disabled}
            color={props.color}
            type={props.type}
            onClick={props.onClick}>
            {props.children}
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.button`
    background: ${(props) => (props.type ? '#0c141d' : '#19a0d7')};
    color: ${(props) => (!props.type ? '#0c141d' : '#19a0d7')};
    border-radius: 100px;
    height: 35px;
    line-height: 35px;
    border: none;
    flex: 1;
    display: block;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
`;
