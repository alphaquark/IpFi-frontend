import React from 'react';
import { RoundButton } from '../../components';
import { useIntl } from 'react-intl';

export const LPButton = (props) => {
    const intl = useIntl();
    return (
        <RoundButton
            disabled={props.disabled}
            onClick={() => {
                window.open(`${props.url}`);
            }}>
            {intl.formatMessage({ id: 'protocolScreen.controller.getLpToken' })}
        </RoundButton>
    );
};
