import React, { useEffect } from 'react'
import SideBar from '../components/SideBar';
import useCheckNet from '@/hooks/useCheckNet';
type Props = {
    children: React.ReactElement,
    pathname: string
}
export default function Layout({ children, pathname }: Props) {
    useCheckNet()
    return (
        <div className='max-lg:pb-[76px]'>
            {pathname !== '/login' && <>
                <SideBar></SideBar></>}
            {children}</div>
    )
}