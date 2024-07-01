import React from 'react'
import Back from '@/components/Back'
import { Button, Input } from 'antd'

export default function Transaction() {

    return (
        <main className="bg-gradient-to-b from-[#F9E8D9] to-[#FFFBF7]">
            <div className="w-[816px] m-auto overflow-hidden">
                <Back text="交易配置"></Back>

                <div className='w-full bg-white rounded-xl overflow-hidden px-8 py-4 mt-8 drop-shadow-md'>
                    <p className='w-full border-b-gray-light border-b pb-4 ' >设置售出价</p>

                    <div className='flex items-center pt-4'>
                        <Input className="rounded bg-[#F6F6F6] text-black h-12 border-0 text-xl"
                            suffix={<span className='text-black text-opacity-20 text-base'>See</span>} />
                        <Button className="ml-3 w-[120px] h-12 rounded text-sm" type="primary" ghost>提交</Button>
                    </div>

                    <div className='text-black text-opacity-70 pt-4'>
                        <p>当前质押余额： xxx see</p>
                        <p> 需质押：xxx see</p>
                        <p>每天使用费：xxx see</p>
                    </div>
                </div>

                <div className='w-full bg-white rounded-xl overflow-hidden px-8 py-4 mt-8 drop-shadow-md'>
                    <p className='w-full border-b-gray-light border-b pb-4 ' >质押提取</p>

                    <div className='flex items-center pt-4'>
                        <Input className="rounded bg-[#F6F6F6] text-black h-12 border-0 text-xl"
                            suffix={<span className='text-black text-opacity-20 text-base'>See</span>} />
                        <Button className="ml-3 w-[120px] h-12 rounded text-sm" type="primary" ghost>提交</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}




