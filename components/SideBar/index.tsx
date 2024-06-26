import React, { useState } from 'react'
import { Popover } from 'antd';
import style from './index.module.scss';
import { adIcon, homeIcon, introduceIcon, purchaseIcon } from '../../public/icons'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';


const sidebarList = [
    {
        href: '/',
        icon: homeIcon,
        label: "首页"
    },
    {
        href: '/purchase',
        icon: purchaseIcon,
        label: "购买"
    },
    {
        href: '/ad',
        icon: adIcon,
        label: "配置广告"
    },
    {
        href: '/introduce',
        icon: introduceIcon,
        label: "介绍"
    }
]




export default function SideBar({ }) {

    const { pathname } = useRouter()

    return (
        <div className={style.sideBar}>
            <div className={style.barLinks}>
                {
                    sidebarList.map(item => {
                        return (
                            <Link href={item.href} key={item.href} className={`${style.barItem} ${pathname == item.href ? style.curr : ""}`}>
                                <item.icon></item.icon>
                                <span>{item.label}</span>
                            </Link>
                        )
                    })
                }
            </div>
            <Popover
                placement="right"
                content={"退出登陆"}
                arrow={false} overlayClassName="loginoutTip">
                <Image className={style.avar} src="/images/avar.png" height={40} width={40} alt={'avar'}></Image>
            </Popover>
        </div>
    )
}