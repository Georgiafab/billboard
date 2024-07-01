
import { useState } from 'react';
import Back from '@/components/Back';
import { Image } from 'antd';
import { ArrawIcon } from '~/icons';

const Tabs = [{
    text: "全部"
},
{
    text: "待审核"
}, {
    text: "审核失败"
}, {
    text: '审核成功'
}]
const History = () => {

    const [currTab, setCurrTab] = useState<number>(0)
    return (
        <main >
            <div className="w-[1428px] m-auto overflow-hidden">
                <Back text={<>历史申请记录<span>（262）</span></>} isNotifi={false}></Back>

                <div className='flex items-center my-8'>
                    {Tabs.map((item, index) => (
                        <p onClick={() => setCurrTab(index)}
                            className={`mr-4 rounded-[47px] px-5 py-1 h-8 bg-white cursor-pointer border ${index === currTab ? ' border-purple' : "border-white"}`}
                            key={item.text}>{item.text}</p>
                    ))}
                </div>

                <div className='grid gap-2 grid-cols-4  text-sm'>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-purple pt-5 pb-8 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-[#ACACB1] pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-[#E66448] pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-purple pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-purple pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-purple pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl w-[345px]  relative overflow-hidden">
                        <div className="bg-purple pt-5 pb-5 px-5">
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>

                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-14'>订单号</span>
                                <span className='text-white ml-5'>000000002</span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5'>
                                <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                <Image src='/images/textmobile.png' alt='' className="max-h-[115px]"></Image>

                                <p className='text-black text-opacity-60 my-3'>电脑端图片</p>
                                <Image src='/images/textpx.png' alt='' className="max-h-[115px]"></Image>
                            </div>


                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                            <div className='flex items-center justify-between cursor-pointer py-4 px-5 border-t border-gray-light text-sm text-black text-opacity-60'>
                                <span>审核留言</span>
                                <ArrawIcon />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default History
/* 审核留言 */
