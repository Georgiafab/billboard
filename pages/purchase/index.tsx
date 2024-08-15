import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Skeleton, Space, Modal, Input, message } from 'antd';
import style from './index.module.scss';
import SuffixText from '@/components/SuffixText';
import { getAuditAdvertise } from '@/services';
import { IAdvertise, IShdDetails } from '@/types/response';
import { useReadContracts, useWriteContract, useWatchContractEvent, usePublicClient, type UseReadContractsReturnType } from 'wagmi'

import { useSession } from 'next-auth/react';
import { contractMsg } from '@/wagmi';
import Avatar from '@/components/Avatar';
import dayjs from 'dayjs';
import { parseEther, formatEther, size } from 'viem'
import Deposit from '@/components/Deposit';
import * as echarts from 'echarts';
import { ethers } from 'ethers';
import { CloseIcon } from '@/public/icons';
import Steps from '@/components/steps';
import { getMouth } from '@/libs/utils';
// import { Line } from '@ant-design/charts';
interface IbuyProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    price: string
}

const modalClassNames = {
    content: 'max-w-[88%] h-[322px] max-md:mx-[6%] md:min-w-[540px] md:min-h-[346px] !py-0',
}
const Buy = ({ setOpen, open, price }: IbuyProps) => {
    const { writeContractAsync, isPending } = useWriteContract()
    const { data: session } = useSession();

    const comfirmBuy = () => {
        writeContractAsync({
            ...contractMsg,
            functionName: "purchase",
            args: ["0"],
            account: session?.address as `0x${string}`,
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
                args: ["0", selPrice],
                account: session?.address as `0x${string}`,
            }).then(() => {
                setPriceOpen(false)
            }).catch(error => {
                message.error(error.message)
            })
        }

    }

    const [depositOpen, setDepositOpen] = useState(false)

    const needDeposit = useMemo(() => {

    }, [])



    return <>
        <Modal
            footer={null}
            onCancel={() => setOpen(false)}
            classNames={modalClassNames}
            centered
            open={open}
            closeIcon={<CloseIcon />}
        >
            <Steps step={1}></Steps>
            <div className="text-center flex flex-col justify-center items-center h-[300px] max-md:h-[260px]">
                <p className="text-2xl max-md:text-lg text-center pr-6  max-md:pt-0 font-semibold max-w-[80%] mx-auto">是否已 {price} See
                    <br />购买广告牌30天的使用权</p>
                <Button loading={isPending} type="primary" className='w-[288px] h-[48px] mt-10 max-md:mt-8 text-sm' onClick={comfirmBuy}>{price} See/Buy</Button>
            </div>
        </Modal>

        <Modal
            footer={null}
            onCancel={() => setPriceOpen(false)}
            classNames={modalClassNames}
            centered
            open={priceOpen}
        >
            <Steps step={2}></Steps>
            <div className="text-center flex flex-col justify-center items-center max-w-[288px] mx-auto h-[300px] max-md:h-[300px]">
                <h3 className='text-center text-lg max-lg:text-lg font-semibold'>设置广告牌售出价</h3>
                <Input value={selPrice} onInput={(e) => setSelPrice(e.currentTarget.value)} className={`rounded  text-black !bg-[#F6F6F6] py-0 mt-4 h-8 border-0 text-lg max-md:text-lg max-md:h-8 `}
                    suffix={<span className='text-black text-opacity-20 text-base'>See</span>} />

                {isSuccess ? <p className='text-black text-opacity-70 mt-4  max-lg:text-sm'>
                    当前质押余额： {funds?.result ? formatEther(funds?.result as bigint) : 0} see <br />
                    需质押 {totalUsageFee?.result ? formatEther(totalUsageFee?.result as bigint) : 0} see<br />
                    <span className="md:text-nowrap">每天使用费：{usagefee?.result ? formatEther(usagefee?.result as bigint) : 0} see</span>
                </p> : <div className='animate-pulse mt-2.5'>
                    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full"></div>
                </div>}
                <Button loading={isPending} type="primary" className='w-full mt-8 max-md:mt-8 text-sm' onClick={submitPrice}>下一步</Button>
            </div>
        </Modal>

        <Deposit depositOpen={depositOpen} setDepositOpen={setDepositOpen}
            errorCb={() => setPriceOpen(true)} totalUsageFee={totalUsageFee?.result ? formatEther(totalUsageFee?.result as bigint) : "0"}></Deposit>

    </>
}

export default function Purchase() {
    const { data: session } = useSession();
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

    // const [billboard, setBillboard] = useState<IAdvertise>()
    // const init = async () => {

    //     await getAuditAdvertise().then(res => {
    //         setBillboard(res[0])
    //     })
    // }
    // useEffect(() => {
    //     init()
    // }, [])

    return (

        <main>
            <h1 className="lg:text-[32px] lg:static lg:text-center w-full top-0 sticky text-xl h-14 flex items-center justify-center max-lg:backdrop-blur-md max-lg:bg-mh max-lg:shadow-2xl">购买广告</h1>
            <div className={`max-w-[1400px] max-2xl:mx-36 flex-col lg:justify-center m-auto`}>

                {/* <div className="max-w-[1400px]"> */}
                {isSuccess ?
                    <> <div className={`${style.purItem} flex bg-white rounded-lg p-5`}>
                        <picture className='max-lg:mr-5'>
                            <source media="(max-width: 1024px)" srcSet="/images/ad_m.png" />
                            <img className="w-full" src="/images/ad_pc.png" alt='' />
                        </picture>


                        <div className='ml-6'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-2xl font-semibold'>一块广告牌</h3>
                                <p className="text-purple text-2xl"> {formatEther((details?.result as IShdDetails)?.price || BigInt(0))} <span className='text-sm'>See</span></p>
                            </div>
                            <div className={style.desc}>

                                <div className={style.descItems}>
                                    <span className={style.left}>展示开始日期： </span>
                                    <span className={style.right}>{(details?.result as IShdDetails)?.keeperReceiveTime ? dayjs((details?.result as IShdDetails)?.keeperReceiveTime?.toString()).format('YY /MM/DD') : '--'}</span>
                                </div>
                                <div className={style.descItems}>
                                    <span className={style.left}>展示结束日期： </span>
                                    <span className={style.right}>{usageTime?.result ? dayjs(usageTime?.result?.toString()).format('YY/MM/DD') : '--'}</span>
                                </div>
                                <div className={`${style.descItems} max-lg:flex-col`}>
                                    <span className={`${style.left} ml-0`}>购买人： </span>
                                    <div className={`${style.right} max-lg:mt-[6px] max-w-[40vw]`}>
                                        <Avatar address={(details?.result as IShdDetails)?.keeper} className="!size-6" />
                                        <span className="text-xs"><SuffixText content={(details?.result as IShdDetails)?.keeper}></SuffixText></span>
                                    </div>
                                </div>

                            </div>
                            {/* <div className={style.amount}>
                                    <p className='max-lg:mr-[17px]'>金额</p>
                                    
                                </div> */}
                            <Button block disabled={(details?.result as IShdDetails)?.keeper === session?.address} className={style.button} type="primary" onClick={() => setOpenBuy(true)} >购买</Button>
                        </div>
                    </div>


                        {/* </div> */}
                        <Buy open={openBuy} setOpen={setOpenBuy} price={formatEther((details?.result as IShdDetails)?.price || BigInt(0))}></Buy>
                    </>
                    : <Loading />

                }
                <div className='bg-white rounded-lg p-5 w-full mt-5'>
                    <h3 className='text-xl font-semibold text-black text-center pt-2 pb-6'>历史价格 (see)</h3>
                    <PricesChart></PricesChart>
                </div>

            </div >
        </main >
    )
}


const Loading = () => {
    return <div className="bg-gray-100">
        <div className="mx-auto bg-white rounded-lg p-4">
            {/* <!-- Image Section --> */}
            <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg"></div>

            {/* <!-- Info Section --> */}
            <div className="flex justify-between items-center mt-4">
                <div className="w-1/2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                </div>
                <div className="w-1/2 text-right">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mx-auto"></div>
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4 mx-auto mt-2"></div>
                </div>
            </div>
        </div>


    </div >
}

// 定义价格更新事件的类型
interface PriceUpdateEvent {
    previousPrice: ethers.BigNumber;
    newPrice: ethers.BigNumber;
}
const PricesChart: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const chartRef = useRef(null);
    // const publicClient = usePublicClient(); // 使用 usePublicClient 获取 provider

    // 获取过去的 PriceUpdate 事件
    const fetchPastEvents = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractMsg.address, contractMsg.abi, provider);
        const events = await contract.queryFilter('CreateShd', 0, 'latest');
        const prices: number[] = []
        const dates: number[] = []
        events.forEach((event => {
            prices.push(event.args?.newPrice)
            dates.push(event.args?.priceUpdateTime && getMouth(event.args.priceUpdateTime))
        }));
        return { prices, dates }
    };

    const drawChart = (prices: number[], dates: number[]) => {
        let chartInstance = echarts.init(chartRef.current);
        const option = {
            // title: {
            //     text: '历史价格 (see)',
            //     left: 'center',
            //     top: 'top',
            // },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#fff',
                borderColor: '#EDEDED',
                borderWidth: 0.5,
                borderRadius: 4,
                shadowColor: "gba(0, 0, 0, 0.13)",
                shadowOffsetX: "0px",
                shadowOffsetY: "0.422794px",
                shadowBlur: "13.5294px",
                padding: 5,
                width: 140,
                height: 76,
                // boxShadow: "0px 0.422794px 13.5294px rgba(0, 0, 0, 0.13)",
                textStyle: {
                    color: '#000',
                    size: 12
                },
                formatter: function (params: any) {
                    const { data, name } = params[0];
                    return `<div style="width: 140px; text-align:center;">
                    <p>${data} See</p>
                    <p style="color: #7D7B7B">
                    ${name}. price: ${data} See<br/>
                    Num. sales: 1
                    </p>
                    </div>`;
                },
                axisPointer: {
                    type: 'none', // 去掉标线
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                // data: dates,
                axisTick: {
                    show: false, // 去掉标尺
                },
                axisLine: {
                    lineStyle: {
                        color: '#e0e0e0'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: '#f5f5f5'
                    }
                }
            },
            series: [
                {
                    name: 'Price',
                    type: 'line',
                    data: [820, 932, 901, 934, 1290, 1330],
                    // data: prices,
                    // smooth: true,
                    lineStyle: {
                        color: 'rgba(102, 102, 255, 0.8)'
                    },
                    itemStyle: {
                        color: 'rgba(102, 102, 255, 0.8)'
                    }
                }
            ]
        };
        chartInstance.setOption(option);
    }
    useEffect(() => {
        fetchPastEvents().then(({ prices, dates }) => {
            setLoading(false)
            drawChart(prices, dates)
        })
    }, [])
    return (
        <>
            <div className="mt-6 bg-white p-5" style={{ "display": loading ? "block" : "none" }}>
                {/* <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div> */}
                <div className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div ref={chartRef} style={{ height: "400px", width: '100%' }}></div>
        </>)
};

