import { Button, Carousel, Image } from 'antd'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { AUD_STATUS, IAdvertise, AUD_STATUS_TEXT, Tabs, UserInfo } from '@/types/response';
import SuffixText from '@/components/SuffixText';
import { ArrawIcon } from '@/public/icons';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps, CollapseProps } from 'antd';
import { Dropdown, Space, Collapse } from 'antd';
import dayjs from 'dayjs';
import { useLocalStorageState } from 'ahooks';

type Props = {
    data: IAdvertise[],
    setCurrTab: Dispatch<SetStateAction<AUD_STATUS>>,
    currTab: AUD_STATUS
}

const DetailMobile = ({ data = [], setCurrTab, currTab }: Props) => {
    const [currItemIndex, setCurItemIndex] = useState<number>(0)
    const [currItem, setCurrItem] = useState<IAdvertise>(data[currItemIndex])
    const [reason, setReason] = useState('')
    const onChange = useCallback((currentSlide: number) => {
        setCurItemIndex(currentSlide)
    }, [])
    useEffect(() => {
        setCurItemIndex(0)
    }, [data])
    useEffect(() => {
        setCurrItem(data[currItemIndex])
    }, [currItemIndex, data])

    const items: MenuProps['items'] = Tabs;

    const menuClick: MenuProps['onClick'] = ({ key }) => {
        setCurrTab(Number(key))
    };

    const [info] = useLocalStorageState<UserInfo | {}>('user-info', {
        defaultValue: { auditor: false },
    });



    return (
        <>
            <div className="w-full flex justify-center pt-[54px] pb-[26px]">
                <Dropdown menu={{ items, onClick: menuClick }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className='hover:text-black'>
                        <Space>
                            {AUD_STATUS_TEXT[currTab]}<span className="text-[#C1C1C1] text-xl">({data.length})</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <Carousel afterChange={onChange} dots={false} infinite={false} className='w-10/12 m-auto ad-history-carousel'>
                {data.map((item: IAdvertise) => {
                    return (<div className="rounded-xl relative overflow-hidden cursor-pointer" key={item.id} >
                        <div className={`${item.audstatus === AUD_STATUS.pending ? 'bg-[#2C2B50]' : item.audstatus === AUD_STATUS.success ? 'bg-green' : 'bg-orange'} pt-5 pb-8 px-5`}>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-16'>提交时间</span>
                                <span className='text-white ml-5'>{dayjs(item.createdate).format('YYYY-MM-DD')}</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-16'>审核结果</span>
                                <span className='text-white ml-5'>{AUD_STATUS_TEXT[item.audstatus]}</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-16'>订单编号</span>
                                <span className='text-white ml-5'>{item.id}</span>
                            </p>
                            <p className='flex items-center mb-[10px]'>
                                <span className='text-white text-opacity-60 w-16'>用户信息</span>
                                <span className='text-white ml-5'><SuffixText className="text-white" content={item.useraddr}></SuffixText></span>
                            </p>
                        </div>
                        <div className='bg-white rounded-xl w-full relative  -top-5 border border-gray-light '>
                            <div className='p-5 flex justify-start'>
                                <div>
                                    <p className='text-black text-opacity-60 mb-3'>手机端图片</p>
                                    <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + item.mobimage} alt={item.useraddr} className="max-h-[115px]"></Image>
                                </div>

                                <div><p className='text-black text-opacity-60 mb-3'>电脑端图片</p>
                                    <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + item.pcimage} alt={item.useraddr} className="max-h-[115px]"></Image></div>
                            </div>


                            <div className='cursor-pointer py-1 px-1 border-t border-gray-light history-collapse'>
                                <Collapse items={[{
                                    key: '1',
                                    label: '申请留言',
                                    style: {
                                    },
                                    children: <div className='text-sm text-black text-opacity-60 bg-[#F6F6F6] rounded-lg py-2 px-3'>留言留言留言留言留言留言留言留言留言</div>,
                                }]} bordered={false} ghost expandIconPosition="end" defaultActiveKey={['1']} />

                            </div>

                        </div>


                    </div>)
                })}




            </Carousel>


            {currItem && <div className='fixed bottom-[76px] w-full min-h-[138px] rounded-t-xl bg-white z-20 shadow-md py-3 px-5'>
                <p className='pb-1 text-sm'>审核留言</p>
                <textarea value={reason} disabled={currItem.audstatus !== AUD_STATUS.pending} onInput={e => setReason(e.currentTarget.value)}
                    placeholder='审核不通过必须写明原因' className={`flex-1 mb-1 text-sm w-full h-[45px] p-3 bg-[#F4F4F4] rounded-xl`} style={{ resize: "none" }}></textarea>
                {(info as UserInfo).auditor && <div className='flex items-center gap-4 '>
                    {(currItem.audstatus === AUD_STATUS.success || currItem.audstatus === AUD_STATUS.pending) && <Button disabled={currItem.audstatus !== AUD_STATUS.pending} type="primary" className='text-sm flex-1 rounded-lg bg-green hover:!bg-green hover:opacity-70 disabled:bg-green  disabled:opacity-70 disabled:text-white h-[40px]'>同意</Button>}
                    {(currItem.audstatus === AUD_STATUS.fail || currItem.audstatus === AUD_STATUS.pending) && <Button disabled={currItem.audstatus !== AUD_STATUS.pending} type="primary" className='text-sm flex-1 rounded-lg h-[40px]' danger>不同意</Button>}
                </div>}
            </div>}
        </>
    )
}
export default DetailMobile