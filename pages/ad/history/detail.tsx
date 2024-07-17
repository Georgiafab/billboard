import React, { useEffect, useState } from 'react'
import { useSessionStorageState, useMount, useUnmount } from 'ahooks';
import { Image, Button } from 'antd';
import dayjs from 'dayjs';
import SuffixText from '@/components/SuffixText';
import Back from '@/components/Back'
import { IAdvertise, AUD_STATUS_TEXT, AUD_STATUS } from '@/types/response';
import { getCsrfToken, useSession } from "next-auth/react"
import { CtxOrReq } from 'next-auth/client/_utils';
import { auditAdvertise } from '@/services';
import { useSignMessage } from 'wagmi'


// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq | undefined) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
type IDetail = {
    csrfToken: string
}
const Detail = ({ csrfToken }: IDetail) => {
    const { signMessage, isSuccess, data: usersignature } = useSignMessage();
    const [status, setStatus] = useState<AUD_STATUS>()
    // @ts-ignore
    const [detail, setDetail] = useState<IAdvertise>({})
    const { data: session } = useSession()
    const [storageDetail, setStorageDetail] = useSessionStorageState<IAdvertise | {}>(
        'sui-banner-history-detail',
        { defaultValue: {} },
    );
    const [reason, setReason] = useState('')
    useEffect(() => {
        storageDetail && setDetail(storageDetail as IAdvertise)
    }, [])
    useEffect(() => {
        if (isSuccess) {
            auditAdvertise({
                id: detail.id, data: {
                    useraddr: session?.address,
                    pcimage: detail.pcimage,
                    mobimage: detail.mobimage,
                    audstatus: status,
                    audsignature: '',
                    audmsg: reason
                }, config: {
                    headers: {
                        'X-Csrftoken': csrfToken
                    }
                }
            }).then(res => {
                console.log(res)
            })
        }
    }, [isSuccess])
    const handleAudit = (status: AUD_STATUS) => {
        setStatus(status)
        signMessage({ message: `id:${detail.id}\npcimage:${detail.pcimage}\nmobimage:${detail.mobimage}\naudstatus:${status}\naudmsg:${reason}` })
    }
    return (
        <main>
            <div className="2xl:m-auto 2xl:max-w-[1260px] lg:mx-40 lg:my-0 md:mx-0">
                <Back className="z-10" isNotifi={false} text={<>订单号{detail.id}<span className='text-base text-black text-opacity-60'>（{AUD_STATUS_TEXT[detail.audstatus]}）</span></>}></Back>

                <div className="rounded-xl bg-white overflow-hidden mt-8"  >
                    <div className={`${detail.audstatus === AUD_STATUS.pending ? 'bg-[#2C2B50]' : detail.audstatus === AUD_STATUS.fail ? 'bg-orange' : 'bg-green'} p-5 flex items-center justify-between `}>
                        <div className=''>
                            <span className='text-white text-opacity-60 w-14'>订单号</span>
                            <span className='text-white ml-5'>{detail.id}</span>
                        </div>
                        <span className="block w-[1px] h-4 bg-white bg-opacity-50"></span>
                        <div className=''>
                            <span className='text-white text-opacity-60 w-14'>提交时间</span>
                            <span className='text-white ml-5'>{dayjs(detail.createdate).format('YYYY-MM-DD')}</span>
                        </div>
                        <span className="block w-[1px] h-4 bg-white bg-opacity-50"></span>
                        <div className=''>
                            <span className='text-white text-opacity-60 w-14'>审核状态</span>
                            <span className='text-white ml-5'>{AUD_STATUS_TEXT[detail.audstatus]}</span>
                        </div>
                        <span className="block w-[1px] h-4 bg-white bg-opacity-50"></span>
                        <div className=''>
                            <span className='text-white text-opacity-60 w-14'>用户信息</span>
                            <span className='text-white ml-5'><SuffixText content={detail.useraddr}>useraddr</SuffixText></span>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className='border-r border-r-gray-light max-w-[826px] w-full'>
                            <div className='flex p-5 text-black text-opacity-70 text-sm'>
                                <div className=''>
                                    <p className='mb-3'>手机端图片</p>
                                    <Image fallback="/images/image_err.png" src={process.env.NEXT_PUBLIC_API_BASE_URL + detail.mobimage} alt='' className="max-h-[319px]"></Image>
                                </div>
                                <div className='ml-5'>
                                    <p className='mb-3'>电脑端图片</p>
                                    <Image fallback="/images/image_err.png" src={process.env.NEXT_PUBLIC_API_BASE_URL + detail.pcimage} alt='' className="max-h-[319px]"></Image>
                                </div>


                            </div>
                            <div className='border-t border-t-gray-light p-5 pr-9'>
                                <p className='py-4'>申请留言</p>
                                <textarea value={''} disabled className={`w-full h-[112px] p-[22px] bg-[#F4F4F4] rounded-xl`} style={{ resize: "none" }}></textarea>
                            </div>
                        </div>

                        <div className='pl-5 pr-5 pb-5 flex-1 flex flex-col justify-between'>
                            <p className='py-4'>审核留言</p>
                            <textarea value={reason} disabled={detail.audstatus !== AUD_STATUS.pending} onInput={e => setReason(e.currentTarget.value)}
                                placeholder='审核不通过必须写明原因' className={`flex-1 mb-4 text-sm max-w-[394px] w-full min-w-[300px] h-[112px] p-[22px] bg-[#F4F4F4] rounded-xl`} style={{ resize: "none" }}></textarea>
                            <div className='flex items-center gap-4'>
                                {(detail.audstatus === AUD_STATUS.success || detail.audstatus === AUD_STATUS.pending) &&
                                    <Button onClick={() => handleAudit(AUD_STATUS.success)} disabled={detail.audstatus !== AUD_STATUS.pending} type="primary" className='text-sm flex-1 rounded-lg bg-green hover:!bg-green hover:opacity-70 disabled:bg-green disabled:opacity-70 disabled:text-w'>同意</Button>}
                                {(detail.audstatus === AUD_STATUS.fail || detail.audstatus === AUD_STATUS.pending) &&
                                    <Button onClick={() => handleAudit(AUD_STATUS.fail)} disabled={detail.audstatus !== AUD_STATUS.pending} type="primary" className='text-sm flex-1 rounded-lg' danger>不同意</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )
}


export default Detail