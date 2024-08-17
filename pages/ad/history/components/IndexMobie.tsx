import SuffixText from '@/components/SuffixText'
import { AUD_STATUS, AUD_STATUS_TEXT, IAdvertise } from '@/types/response'
import { Pagination } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

type Props = {
  pageChange: (page: number) => void,
  total: number,
  data: IAdvertise[],
  handleDetail: (item: IAdvertise, index: number) => void
}

export default function IndexMobie({ pageChange, total, data, handleDetail }: Props) {
  return (
    <>
      <div className='px-4'>
        {data?.map((item, index) => (
          <div onClick={() => handleDetail(item, index)} key={item.id} className={` rounded-t-xl ${item.audstatus === AUD_STATUS.pending ? 'bg-[#2C2B50]' : item.audstatus === AUD_STATUS.success ? 'bg-green' : 'bg-orange'} pt-5 pb-8 px-5`}>
            <p className='flex items-center mb-[10px] '>
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
          </div>))}
      </div>
      <Pagination onChange={pageChange} total={total} simple align="end" hideOnSinglePage={true} />
    </>
  )
}