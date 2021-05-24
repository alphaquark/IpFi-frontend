import React from 'react';
import styled from 'styled-components';

const ImageButtonWrapper = styled.div`
    display: inline-flex;
    button {
        color: white;
        background: #2a6d7e;
        border: none;
        min-height: 50px;
        font-size: 20px;
        padding: 0 20px;
        border-radius: 50px;
    }
`;

const ImageButton = (props) => {
    return (
        <ImageButtonWrapper>
            <button onClick={props.onClick}>{props.children}</button>
        </ImageButtonWrapper>
    );
};

export { ImageButton };
