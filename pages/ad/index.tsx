import React from 'react'
import { Button } from 'antd';
import Link from 'next/link';
import style from './index.module.scss';

type Props = {}

export default function Ad({ }: Props) {
    return (
        <main className='ad flex items-center justify-center'>
            <div className="max-w-[1338px] flex h-[700px]">
                <div className="mr-6 flex flex-col justify-between w-[500px] text-[#726DF9] rounded-xl pt-8 pb-8 pr-6 pl-6 bg-gradient-to-b from-[#fff] from-0% via-[#F7F7FF] via-15.08% to-[#D4D2FF] to-98.93%">
                    <div>
                        <h3 className="text-2xl mb-3 font-semibold">图片配置</h3>
                        <p>配置PC端广告图片 <br />&移动端广告图片</p>
                    </div>
                    <img src="/images/adimgset.svg" alt="set" className='mb-[70px] ' />

                    <Link href="/ad/image"><Button block type="primary" className="h-14 rounded-lg flex-shrink-0">去配置</Button></Link>
                </div>

                <div className={`mr-6 flex flex-col justify-between  w-[500px] text-[#E99430] rounded-xl pt-8 pb-8 pr-6 pl-6 bg-gradient-to-b from-[#FFFBF7] from-0% to-[#F9E8D9] to-100% ${style.transItem}`}>
                    <div>
                        <h3 className="text-2xl mb-3 font-semibold">图片配置</h3>
                        <p>配置PC端广告图片 <br />&移动端广告图片</p>
                    </div>
                    <img src="/images/adtranset.svg" alt="set" className='mb-[76px]' />

                    <Link href="/ad/transaction"> <Button block className={`h-14 bg-[#E99430] rounded-lg ${style.transBtn}`} type="primary">去配置</Button></Link>
                </div>
                <div className='flex flex-col justify-between  bg-[#fff] width-[300px] text-[#726DF9] rounded-xl pt-8 pb-8 pr-6 pl-6 border-[#E9E9E9]'>
                    <div>
                        <h3 className='text-2xl mb-3 font-semibold'>申请历史记录</h3>
                        <p >查看历史申请记录和审核结果</p>
                    </div>
                    <Link href="ad/history"><Button block className='h-14 text-[#726DF9] rounded-lg border-none'>去查看</Button></Link>
                </div>
            </div>
        </main>
    )
}

