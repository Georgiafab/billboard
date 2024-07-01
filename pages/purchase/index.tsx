import React from 'react'
import Image from 'next/image';
import { Button } from 'antd';
import style from './index.module.scss';

type Props = {}

export default function purchase({ }: Props) {
    return (
        <main>
            <div className={`${style.container} container`}>
                <h1 className={style.title}>购买广告</h1>
                <div className={style.purchaseList}>
                    <div className={style.purItem}>
                        <img src="/images/billimage.png" alt='' />
                        <h3>一块广告牌</h3>
                        <div className={style.desc}>
                            <div className={style.descItems}>
                                <span className={style.left}>购买人： </span>
                                <div className={style.right}>
                                    <Image src="/images/avar.png" width={31} height={31} alt=''></Image>
                                    <span>0X200000302000000</span>
                                </div>
                            </div>
                            <div className={style.descItems}>
                                <span className={style.left}>展示开始日期： </span>
                                <span className={style.right}>24/2/12</span>
                            </div>
                            <div className={style.descItems}>
                                <span className={style.left}>展示结束日期： </span>
                                <span className={style.right}>24/2/12</span>
                            </div>

                            <div className={style.amount}>
                                <p>金额</p>
                                <span>See 200000.00</span>
                            </div>
                        </div>
                        <Button block className={style.button} type="primary" >购买</Button>


                    </div>
                </div>
            </div>
        </main>
    )
}