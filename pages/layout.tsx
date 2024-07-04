import React from 'react'
import Image from 'next/image';
import SideBar from '../components/SideBar';
import { Session } from 'next-auth';
import MHeader from '../components/MHeader';
type Props = {
    children: React.ReactElement,
    pathname: string,
    session: Session
}
export default function Layout({ children, pathname }: Props) {
    return (
        <>
            {pathname !== '/login' && <>
                <SideBar></SideBar></>}
            {children}</>
    )
}