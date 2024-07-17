import { WalletButton, ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';



const LoginButton = ({ type }: { type: "metamask" | "WalletConnect" }) => {
    const { address, isConnected } = useAccount();
    const [customConnect, setCustomConnect] = useState(false)

    return (
        <>{!isConnected ?
            <WalletButton.Custom wallet={type}>
                {({ ready, connect, connected }) => {
                    return (
                        <button
                            type="button"
                            disabled={!ready}
                            onClick={() => { connect(); setCustomConnect(true) }}
                            className={`${style.loginButton} ${style[type]}  `}>
                            <img src={`/images/${type}.svg`} alt={type} />
                        </button>
                    );
                }}
            </WalletButton.Custom> :
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const walletConnected = ready && account && chain
                    const authed =
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    if (walletConnected && customConnect) {
                        console.log(walletConnected, customConnect)
                        openConnectModal()
                    }

                    return (
                        <div
                            className='w-full'
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (walletConnected && !authed) {
                                    return (
                                        <button onClick={openConnectModal} type="button"
                                            className={`${style.loginButton} ${style[type]} `}>
                                            <img src={`/images/${type}.svg`} alt={`type`} />
                                        </button>
                                    );
                                }

                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>}</>
    );
}
export default function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    const { callbackUrl } = router.query;
    useEffect(() => {
        if (session) {
            // const redirectUrl = '/';
            router.push('/');
        }
    }, [session]);

    return (
        <div className={style.logins}>
            {/* {session.address} */}
            <div className={style.loginBox}>
                <p>欢迎来到“一块广告牌”</p>
                <h1 >登陆</h1>
                <LoginButton type='metamask' />
                <LoginButton type='WalletConnect' />
            </div>
        </div>
    )
}