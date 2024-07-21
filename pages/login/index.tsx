import { WalletButton, ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { message, Modal, Spin } from 'antd';
import { login } from '@/services';
import { useSwitchChain, useChainId } from 'wagmi'



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
                    ...all
                }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const walletConnected = ready && account && chain
                    const authed =
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    if (walletConnected && customConnect) {

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
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { callbackUrl } = router.query;
    const { chains, switchChainAsync } = useSwitchChain()
    const { chainId, isConnected } = useAccount();
    const allowChainId = useChainId()
    useEffect(() => {
        if (isConnected && chainId !== allowChainId) {
            Modal.error({
                title: '错误的网络',
                content: `您似乎没有切换到支持的网络上`,
                okText: '切换网络',
                onOk() {
                    switchChainAsync({ chainId: allowChainId }).then(res => {
                        message.success(`已成功切换到${res.name}!`)
                    }).catch(error => {
                        message.error(error.shortMessage)
                    })
                },
            });

        }
    }, [allowChainId, chainId, isConnected, switchChainAsync])

    useEffect(() => {
        if (session) {
            setLoading(true)

            const { user } = session

            const message = btoa(user.message!)
            login({ useraddr: user.address, message, signature: user.signature }).then(res => {
                const setCookieValue = res.headers['set-cookie'];
                // const setCookieValue = res.headers?.get?.("set-cookie")
                // let allCookies = document.cookie
                console.log(setCookieValue, document.cookie)
            })


        }
    }, [session]);

    return (
        <div className={style.logins}>
            {/* {session.address} */}
            <div className={style.loginBox}>
                <p>欢迎来到“一块广告牌”</p>
                <h1 >登陆</h1>
                <Spin spinning={loading} className='w-full' indicator={<LoadingOutlined spin />} >
                    <LoginButton type='metamask' />
                </Spin>
                <Spin spinning={loading} indicator={<LoadingOutlined spin />} >
                    <LoginButton type='WalletConnect' />
                </Spin>
            </div>
        </div>
    )
}   