import React, { CSSProperties } from 'react'
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';



const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: <h3 className='text-2xl px-1 pt-2 flex justify-between'><span>了解哈伯格税（Harberg tax）</span> <span className='text-2xl'>-</span></h3>,
        children: <p className='text-black pt-5 text-opacity-80 p-2 border-t border-t-gray-light'>https://mp.weixin.qq.com/s/KTkMiKsWVdrmuP9IP1Wzyg</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: <h3 className='text-2xl px-1 pt-2 flex justify-between'><span>关于一块广告牌</span> <span className='text-2xl'>-</span></h3>,
        children: <p className='text-black pt-5 text-opacity-80 p-2 border-t border-t-gray-light'>https://mp.weixin.qq.com/s/KTkMiKsWVdrmuP9IP1Wzyg</p>,
        style: panelStyle,
    }
];

export default function Introduce() {

    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        padding: 0,
        background: "#fff",
        borderRadius: token.borderRadiusLG,
        border: 'none',
        content: "#fff"
    };
    return (
        <main>
            <div className='max-w-[816px] pt-[60px] m-auto'>
                <h1 className='text-[32px] mb-8'>介绍</h1>

                <Collapse
                    defaultActiveKey={[1, 2]}
                    ghost
                    expandIcon={() => null}
                    items={getItems(panelStyle)}
                />
            </div>
        </main>
    )
}