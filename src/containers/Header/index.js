import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLang } from '../../modules';
import { useIntl } from 'react-intl';

const HeaderWrapper = styled.div`
    background: rgba(0, 0, 0, 0.4);
    padding: 2.5rem;
    display: flex;
    max-height: 133px;
    @media screen and (max-width: 768px) {
        padding: 1rem;
    }
`;

const LogoContainer = styled.div`
    margin-right: auto;
    > img {
        height: 30px;
        cursor: pointer;
        width: auto;
    }
`;

const NavWrapper = styled.div`
    display: flex;
    transition: 0.2s;
    > div {
        > a {
            text-decoration: none;
            color: #c6e8e7;
        }
        padding: 0 2rem;
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        position: fixed;
        display: ${(props) => (props.visible ? 'flex' : 'none')};
        width: 100%;
        height: 100%;
        background: black;
        flex-direction: column;
        left: ${(props) => (props.visible ? 0 : 100)}%;
        top: 0;
        > div {
            padding: 2rem;
            > a {
                font-size: 2rem;
            }
        }
    }
`;
const MobileButton = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        width: 20px;
        height: 20px;
        padding: 0 !important;
    }
`;
const ToggleButton = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        text-align: center;
        padding: 0 !important;
    }
`;

const LangWrapper = styled.div`
    background: url(${require('../../assets/locale.png')});
    min-width: 25px;
    min-height: 25px;
    background-size: 25px 25px;
    padding: 0 !important;
    background-repeat: no-repeat;
    cursor: pointer;
    @media screen and (max-width: 768px) {
        margin: 0 auto;
        margin-bottom: 20px;
    }
`;
const LangContainer = styled.div`
    position: absolute;
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    right: 20px;
    top: 75px;
    @media screen and (max-width: 768px) {
        right: 10px;
        top: auto;
        bottom: 20px;
        left: 10px;
        flex-direction: row;
        position: fixed;
        button {
            flex: 1;
        }
    }
    background: #105762;
    border-radius: 3px;
    padding: 5px 10px;
    button {
        text-transform: uppercase;
        font-size: 13px;
        margin: 5px 10px;
        border: 0;
        background: transparent;
        color: #c6e8e7;
    }
`;

const Header = React.memo(
    withRouter((props) => {
        const [toggleMenu, setToggleMenu] = useState(false);
        const [toggleLang, setToggleLang] = useState(false);
        const dispatch = useDispatch();
        const setLangRedux = (t) => {
            dispatch(setLang(t));
        };
        const intl = useIntl();

        return (
            <HeaderWrapper>
                <LogoContainer>
                    <img
                        src={require('../../assets/logo.png')}
                        alt="logo"
                        onClick={() => props.history.push('/')}
                    />
                </LogoContainer>
                <NavWrapper visible={toggleMenu}>
                    <div>
                        <Link onClick={() => setToggleMenu(false)} to="/">
                            {intl.formatMessage({ id: 'header.navbar.menu.protocols' })}
                        </Link>
                    </div>

                    <LangWrapper onClick={() => setToggleLang(!toggleLang)} />
                    <ToggleButton
                        onClick={() => {
                            setToggleMenu(false);
                            setToggleLang(false);
                        }}>
                        {intl.formatMessage({ id: 'header.navbar.menu.close' })}
                    </ToggleButton>
                </NavWrapper>
                <LangContainer visible={toggleLang}>
                    <button
                        onClick={() => {
                            localStorage.setItem('aqtDeFiLang', 'en');
                            setLangRedux('en');
                            setToggleMenu(false);
                            setToggleLang(!toggleLang);
                        }}>
                        en
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem('aqtDeFiLang', 'cn');
                            setLangRedux('cn');
                            setToggleMenu(false);
                            setToggleLang(!toggleLang);
                        }}>
                        cn
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem('aqtDeFiLang', 'jp');
                            setLangRedux('jp');
                            setToggleMenu(false);
                            setToggleLang(!toggleLang);
                        }}>
                        jp
                    </button>
                </LangContainer>
                <MobileButton onClick={() => setToggleMenu(!toggleMenu)}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M26,16c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,14,26,14.896,26,16z"
                            id="XMLID_314_"
                        />
                        <path
                            d="M26,8c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,6,26,6.896,26,8z"
                            id="XMLID_315_"
                        />
                        <path
                            d="M26,24c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C25.104,22,26,22.896,26,24z"
                            id="XMLID_316_"
                        />
                    </svg>
                </MobileButton>
            </HeaderWrapper>
        );
    })
);

export { Header };
