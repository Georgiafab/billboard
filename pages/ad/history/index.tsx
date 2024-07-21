
import { useEffect, useMemo, useState } from 'react';
import Back from '@/components/Back';
import { Button, Image, Table, Typography } from 'antd';
import { useSessionStorageState, useLocalStorageState } from 'ahooks';
import type { TableProps } from 'antd';
import { ArrawIcon } from '~/icons';
import { GetServerSideProps, GetStaticProps } from 'next/types';
import { getAuditAdvertise } from '@/services';
import { AUD_STATUS, IAdvertise, AUD_STATUS_TEXT, Tabs, UserInfo } from '@/types/response';
import SuffixText from '@/components/SuffixText';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import IndexMobile from './components/IndexMobile';
import { useRequest } from 'ahooks';
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//     return {
//         props: {
//             data: await getAuditAdvertise(),
//         },
//     };
// };

export const getStaticProps = (async (context) => {
    return {
        props: {
            data: await getAuditAdvertise(),
        },
    };
}) satisfies GetStaticProps<{
    data: IAdvertise[]
}>

const History = () => {
    const [data, setData] = useState<IAdvertise[]>([])


    const { loading, run } = useRequest(getAuditAdvertise, {
        manual: false,
        onSuccess: (result, params) => {
            setData(result)
        }
    })

    const [info] = useLocalStorageState<UserInfo | {}>('user-info', {
        defaultValue: { auditor: false },
    });
    const { Paragraph } = Typography;
    const router = useRouter()

    const [currTab, setCurrTab] = useState<AUD_STATUS>(AUD_STATUS.all)
    const [_, setStorageDetail] = useSessionStorageState<IAdvertise | {}>(
        'sui-banner-history-detail',
        { defaultValue: {} },
    );
    const showList = useMemo(() => {
        if (currTab >= 0) {
            return data.filter(item => item.audstatus === currTab)
        }
        return data
    }, [currTab, data])

    const handleDetail = (detail: IAdvertise) => {
        setStorageDetail(detail)
        router.push(`/ad/history/detail`)
    }



    const columns: TableProps<IAdvertise>['columns'] = [
        {
            title: '订单号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '提交时间',
            dataIndex: 'createdate',
            key: 'createdate',
            render: (_, { createdate }) => dayjs(createdate).format('YYYY-MM-DD')
        },
        {
            title: '用户信息',
            dataIndex: 'useraddr',
            key: 'useraddr',
            render: (_, { useraddr }) => {
                return <SuffixText content={useraddr}>useraddr</SuffixText>
            }
        },
        {
            title: '申请留言',
            dataIndex: 'useraddr',
            key: 'useraddr',
            render: (_, { applymsg }) => (
                <div className="w-52">
                    <Paragraph ellipsis={{ rows: 3 }}>
                        {applymsg}
                    </Paragraph>
                </div>
            )
        },
        {
            title: '审核留言',
            dataIndex: 'useraddr',
            key: 'useraddr',
            render: (_, { audmsg }) => (
                <div className="w-52">
                    <Paragraph ellipsis={{ rows: 3 }}>
                        {audmsg}
                    </Paragraph>
                </div>
            )
        },
        {
            title: '审核状态',
            dataIndex: 'audstatus',
            key: 'audstatus',
            render: (_: any, { audstatus }: { audstatus: AUD_STATUS }) => (
                <span className={audstatus === AUD_STATUS.fail ?
                    'text-red' : audstatus === AUD_STATUS.success ?
                        'text-green' : 'text-black'}>
                    {AUD_STATUS_TEXT[audstatus]}</span>
            )
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_: any, record: IAdvertise) => {
                return (
                    <div className="cursor-pointer w-[170px]" onClick={() => handleDetail(record)}>
                        {(info as UserInfo)?.auditor ?
                            (record.audstatus === AUD_STATUS.pending) ? <span className="text-purple hover:text-opacity-70" >去审核</span> :
                                record.audstatus === AUD_STATUS.success ?
                                    <span className="text-purple hover:text-opacity-70" >去查看</span> : '/'
                            : <span className="text-purple hover:text-opacity-70" >去查看</span>}
                    </div>
                )
            },
        },
    ];
    return (
        <main >
            <div className="2xl:max-w-[1400px] 2xl:m-auto lg:mx-40  lg:my-0 md:mx-0 relative z-10">

                {/* pc 端 */}
                <div className='max-lg:hidden'>
                    <Back text={<>历史申请记录<span className='text-black text-opacity-60 text-2xl'>（{data.length}）</span></>} isNotifi={false}></Back>

                    <div className='flex items-center my-8 max-md:flex-wrap max-md:my-4'>
                        {Tabs.map((item, index) => (
                            <p onClick={() => setCurrTab(item.key)}
                                className={`mr-4 max-md:mb-2 rounded-[47px] px-5 py-[6px] h-10 text-lg cursor-pointer ${item.key === currTab ? ' bg-purple text-white' : "bg-white text-black"}`}
                                key={item.label}>{item.label}</p>
                        ))}
                    </div>
                    <Table loading={loading} className="rounded-t-xl overflow-hidden " scroll={{ x: '1200px' }} rowClassName="bg-white px-20" dataSource={showList} columns={columns}></Table>
                </div>


                {/* 移动端 */}

                <div className='lg:hidden'>
                    <IndexMobile data={showList} setCurrTab={setCurrTab} currTab={currTab} />
                </div>

            </div>
        </main >
    )
}

export default History
/* 审核留言 */
