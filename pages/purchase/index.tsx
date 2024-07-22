import React, { useEffect, useState } from 'react'
import { Button, Skeleton, Space, Modal, Input, message } from 'antd';
import style from './index.module.scss';
import SuffixText from '@/components/SuffixText';
import { getAuditAdvertise } from '@/services';
import { IAdvertise, IShdDetails } from '@/types/response';
import { useReadContracts, useWriteContract, type UseReadContractsReturnType } from 'wagmi'
import { useSession } from 'next-auth/react';
import { contractMsg } from '@/wagmi';
import Avatar from '@/components/Avatar';
import dayjs from 'dayjs';
import { parseEther, formatEther } from 'viem'
import Deposit from '@/components/Deposit';
interface IbuyProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    price: string
}
const Buy = ({ setOpen, open, price }: IbuyProps) => {

    const { writeContractAsync, isPending } = useWriteContract()
    const { data: session } = useSession();

    const comfirmBuy = () => {
        writeContractAsync({
            ...contractMsg,
            functionName: "purchase",
            args: ["0"],
            value: parseEther(price), // 将金额转换为 Wei
        }).then(() => {
            setOpen(false)
            setPriceOpen(true)
        }).catch(error => {
            // console.log(error.message)
            message.error(error.shortMessage)
        })
    }

    const { data, isSuccess } = useReadContracts({
        contracts: [
            {
                ...contractMsg,
                functionName: "checkFundsOf",
                args: [session?.address]

            }, {
                ...contractMsg,
                functionName: "_calculateTotalUsageFees",
                args: ["0"]

            }
            , {
                ...contractMsg,
                functionName: "_calculateUsageFees",
                args: ["0"]
            }
        ]
    })

    const [funds, totalUsageFee, usagefee] = data || []


    const [priceOpen, setPriceOpen] = useState(false)
    const [selPrice, setSelPrice] = useState('')
    const submitPrice = () => {
        if (totalUsageFee?.result as bigint > 0) {
            setPriceOpen(false)
            setDepositOpen(true)
        } else {
            writeContractAsync({
                ...contractMsg,
                functionName: "setPrice",
                args: ["0", selPrice]
            }).then(() => {
                setPriceOpen(false)
            }).catch(error => {
                message.error(error.message)
            })
        }

    }

    const [depositOpen, setDepositOpen] = useState(false)





    return <>
        <Modal
            footer={null}
            onCancel={() => setOpen(false)}
            className="max-w-md"
            centered
            open={open}
        >
            <p className="text-2xl max-md:text-lg text-center pr-6 pt-3 max-md:pt-0 font-semibold max-w-[80%] m-auto">是否已 {price} See 购买
                广告牌30天的使用权</p>
            <Button loading={isPending} type="primary" className='w-full mt-10 max-md:mt-8 text-lg max-md:text-md' onClick={comfirmBuy}>{price} See/Buy</Button>
        </Modal>

        <Modal
            footer={null}
            onCancel={() => setPriceOpen(false)}
            className="max-w-md"
            centered
            open={priceOpen}
        >
            <h3 className='text-center text-2xl max-lg:text-lg font-semibold'>设置广告牌售出价</h3>
            <Input value={selPrice} onInput={(e) => setSelPrice(e.currentTarget.value)} className={`rounded  text-black !bg-[#F6F6F6] mt-8 h-12 border-0 text-xl max-md:text-lg max-md:h-8 `}
                suffix={<span className='text-black text-opacity-20 text-base'>See</span>} />

            {isSuccess ? <p className='text-black text-opacity-70 mt-4  max-lg:text-sm'>
                当前质押余额： {funds?.result ? formatEther(funds?.result as bigint) : 0} see <br />
                需质押 {totalUsageFee?.result ? formatEther(totalUsageFee?.result as bigint) : 0} see<br />
                每天使用费：{usagefee?.result ? formatEther(usagefee?.result as bigint) : 0} see
            </p> : <div className='animate-pulse mt-2.5'>
                <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full"></div>
            </div>}
            <Button loading={isPending} type="primary" className='w-full mt-10 max-md:mt-8 text-sm' onClick={submitPrice}>提交</Button>
        </Modal>

        <Deposit depositOpen={depositOpen} setDepositOpen={setDepositOpen}
            errorCb={() => setPriceOpen(true)} totalUsageFee={totalUsageFee?.result ? formatEther(totalUsageFee?.result as bigint) : "0"}></Deposit>

    </>
}

export default function Purchase() {
    const [openBuy, setOpenBuy] = useState(false)
    const { isPending, data, isSuccess } = useReadContracts({
        contracts: [{
            ...contractMsg,
            functionName: 'getShdDetails',
            args: ['0']
        }, {
            ...contractMsg,
            functionName: 'checkShdKeeperUsageTime',
            args: ['0']
        }]

    })

    const [details, usageTime] = data || []

    const [billboard, setBillboard] = useState<IAdvertise>()
    const init = async () => {

        await getAuditAdvertise().then(res => {
            setBillboard(res[0])
        })
    }
    useEffect(() => {
        init()
    }, [])

    return (

        <main>
            <div className={`${style.container} flex-col`}>
                <h1 className="lg:text-[32px] lg:absolute lg:top-[60px] lg:text-center w-full top-0 sticky text-xl h-14 flex items-center justify-center max-lg:backdrop-blur-md max-lg:bg-mh max-lg:shadow-2xl">购买广告</h1>
                <div className={style.purchaseList}>
                    {isSuccess ?
                        <> <div className={style.purItem}>
                            <picture className='w-full'>
                                <source media="(max-width: 1024px)" srcSet={`${process.env.NEXT_PUBLIC_API_BASE_URL}${billboard?.mobimage}`} />
                                <img className="w-full" src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${billboard?.pcimage}`} alt='' />
                            </picture>


                            <div className='max-lg:flex flex-col justify-between max-lg:min-w-[40vw]'>
                                <div>
                                    <h3 >一块广告牌</h3>
                                    <div className={style.desc}>

                                        <div className={style.descItems}>
                                            <span className={style.left}>展示开始日期： </span>
                                            <span className={style.right}>{(details?.result as IShdDetails)?.keeperReceiveTime ? dayjs((details?.result as IShdDetails)?.keeperReceiveTime?.toString()).format('YY/MM/DD') : '--'}</span>
                                        </div>
                                        <div className={style.descItems}>
                                            <span className={style.left}>展示结束日期： </span>
                                            <span className={style.right}>{usageTime?.result ? dayjs(usageTime?.result?.toString()).format('YY/MM/DD') : '--'}</span>
                                        </div>
                                        <div className={`${style.descItems} max-lg:flex-col`}>
                                            <span className={`${style.left} ml-0`}>购买人： </span> yu
                                            <div className={`${style.right} max-lg:mt-[6px]`}>
                                                <Avatar address={(details?.result as IShdDetails)?.keeper} className="!size-8" />
                                                <span className="text-xs"><SuffixText content={(details?.result as IShdDetails)?.keeper}></SuffixText></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <div className={style.amount}>
                                        <p className='max-lg:mr-[17px]'>金额</p>
                                        <span className='max-lg:text-base'>See {formatEther((details?.result as IShdDetails)?.price)}</span>
                                    </div>
                                    <Button block className={style.button} type="primary" onClick={() => setOpenBuy(true)} >购买</Button>
                                </div>
                            </div>


                        </div>
                            <Buy open={openBuy} setOpen={setOpenBuy} price={formatEther((details?.result as IShdDetails)?.price)}></Buy>
                        </>
                        : <Loading />

                    }
                </div>
            </div>
        </main>
    )
}


const Loading = () => {
    return <div role="status" className="p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
            <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>

        <div className="h-2 bg-gray-200 rounded-full "></div>
        <div className="flex items-center mt-4">
            <svg className="w-10 h-10 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full "></div>
            </div>
        </div>
    </div>
}

