import { Image, Carousel, Pagination } from 'antd';
import { getAdvertise } from '../services';
import { PrevIcon, NextIcon } from '../public/icons';
import style from './index.module.scss';
import SuffixText from '../components/SuffixText';
import Avatar from "@/components/Avatar"

import { IAdvertise } from '../types/response';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useReadContract } from 'wagmi';
import { contractMsg } from '@/wagmi';
import { formatEther } from 'viem';
import { useRequest } from 'ahooks';




const Home = () => {

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const [curItemIndex, setCurItemIndex] = useState<number>(0)
  const [data, setData] = useState<IAdvertise[]>([])
  const [curItem, setCurItem] = useState<IAdvertise>(data[curItemIndex])

  const [total, setTotal] = useState<number>(0)
  function getAdPage(page: number): Promise<{ results: IAdvertise[], count: number }> {
    return getAdvertise({ page, size: 10 })
  }
  const { loading, run } = useRequest(getAdPage, {
    manual: false,
    onSuccess: (result, params) => {
      setData(result.results)
      setTotal(result.count)
    }
  })

  const changeItem = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      setCurItemIndex(prev => {
        if (prev > 0) {
          const index = --prev;
          setCurItem(data[index])
          return index
        }
        return prev
      })
    } else if (type === 'next') {
      setCurItemIndex(prev => {
        if (prev < data.length - 1) {
          const index = ++prev;
          setCurItem(data[index])
          return index
        }
        return prev
      })
    }
  }

  const previewChange = (item: IAdvertise, index: number) => {
    setCurItem(item)
    setCurItemIndex(index)
  }

  const { data: price } = useReadContract({
    ...contractMsg,
    functionName: 'getCurrentPrice',
    args: ['0']
  })

  return (
    <main className='home'>

      <div className="3xl:max-w-[1400px] 3xl:m-auto lg:mx-40  lg:my-0 md:mx-0 ">
        <h1 className=" lg:pb-[39px] text-xl lg:text-[32px] lg:pt-[44px] pl-[36px] py-[17px] lg:pl-0">历史广告牌</h1>
        <div className='lg:block hidden'> {data.map((item: IAdvertise, index) => {
          return (<div className={`${style.billItem} `} key={item.id}>
            <Image width={'100%'} fallback="/images/image_err.png" className={`bg-deep-black drop-shadow-lg w-full max-h-[498px] rounded-3xl object-contain`} src={process.env.NEXT_PUBLIC_API_BASE_URL + item.pcimage} alt={item.useraddr}
              preview={{
                getContainer: false,
                onVisibleChange: () => previewChange(item, index),
                imageRender: () => (
                  <div className={style.previewBox}>
                    <div className={`${style.billButton} ${style.buttonTop} ${curItemIndex > 0 ? 'flex' : 'hidden'}`} onClick={() => changeItem('prev')}>
                      <PrevIcon > </PrevIcon>
                    </div>
                    <div className={`${style.desc} justify-between`} data-preview>
                      <div className='flex items-center'>
                        <Avatar className={style.avar} address={item.useraddr} />
                        {/* <Image className={style.avar} preview={false} src="/images/avar.png" height={40} width={40} alt={'avar'}></Image> */}
                        <h3>{curItem?.useraddr}</h3>
                        <div className={`font-light ${style.date}`}>{dayjs(curItem?.createdate).format('YYYY-MM-DD')}</div>
                      </div>
                      <div>
                        <span className="text-[28px]">{price ? formatEther(price as bigint) : 0}</span>
                        <span className='text-2xl font-light ml-1'>See</span>
                      </div>
                    </div>
                    <Image className=' h-[498px] max-h-[60vh] w-auto object-contain' fallback="/images/image_err.png" src={process.env.NEXT_PUBLIC_API_BASE_URL + curItem?.pcimage} alt='' preview={false}></Image>
                    <div className={`${style.billButton} ${curItemIndex < data.length - 1 ? 'flex' : 'hidden'}`} onClick={() => changeItem('next')}>
                      <NextIcon ></NextIcon>
                    </div>
                  </div>
                ),
                toolbarRender: () => null,
              }}
            > </Image>
            <div className={`${style.desc} justify-between`} >
              <div className='flex items-center'>
                <Avatar className={style.avar} address={item.useraddr} />
                {/* <Image className={style.avar} preview={false} src="/images/avar.png" height={40} width={40} alt={'avar'}></Image> */}
                <h3>{curItem?.useraddr}</h3>
                <div className={`font-normal ${style.date}`}>{dayjs(curItem?.createdate).format('YYYY-MM-DD')}</div>
              </div>
              <div>
                <span className="text-[28px]">{price ? formatEther(price as bigint) : 0}</span>
                <span className='text-2xl font-normal ml-1'>See</span>
              </div>
            </div>


          </div>)
        })}

          <Pagination onChange={run} total={total} align="end" hideOnSinglePage={true} />
        </div>


        <div className='lg:hidden'>
          <Carousel afterChange={onChange} className='w-10/12 m-auto home-caroual'>

            {data.map((item: any) => {
              return (<div className={style.billItem} key={item.id}>

                <Image width={"100%"} className={style.billImage} src={process.env.NEXT_PUBLIC_API_BASE_URL + item.pcimage} alt=''
                  preview={false}
                > </Image>
                <div className={style.desc}>
                  <Avatar className={style.avar} address={item.useraddr} />
                  <h3><SuffixText content={item.useraddr}></SuffixText></h3>
                  <div className={style.date}>{dayjs(item.createdate).format('YYYY-MM-DD')}</div>
                </div>
              </div>)
            })}

          </Carousel>
          <Pagination onChange={run} total={total} simple align="end" hideOnSinglePage={true} />
        </div>


      </div >
    </main >
  );
};

export default Home;


