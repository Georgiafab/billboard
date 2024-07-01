import React from 'react'
import Image from 'next/image';
import SideBar from '../components/SideBar';
import { getServerSession } from 'next-auth/next';
import { getAuthOptions } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
type Props = {
    children: React.ReactElement,
    pathname: string,
    session: Session
}
export default function Layout({ children, pathname, session }: Props) {
    console.log(session)
    return (
        <>
            {pathname !== '/login' && <>
                <div className="logo">
                    <Image src="/images/logo.svg" alt="logo" width={50} height={48} />
                </div>
                <SideBar></SideBar></>}
            {children}</>
    )
}