import blockies from 'ethereum-blockies';
import { useEnsAvatar } from 'wagmi'
import { normalize } from 'viem/ens'
import { Image } from 'antd';
// import Image from 'next/image';
import { useMemo } from 'react';
import useDomAlready from '@/hooks/useDomAlready';
import React from 'react';

const Avatar = React.forwardRef(({ address, className }: { address: string, className?: string }, _) => {

    const result = useEnsAvatar({
        name: normalize('wevm.eth'),
    })
    const { documentMouned } = useDomAlready()
    const imgSrc = useMemo(() => {
        if (address && documentMouned) {
            return blockies.create({ seed: address.toLowerCase() }).toDataURL()
        } else {
            return ""
        }
    }, [address, documentMouned])

    return <Image preview={false} className={`rounded-full ${className}`} src={result.data || imgSrc || '/icons/avatarerr.svg'} alt={'avar'}></Image>
})

Avatar.displayName = "Avatar"
export default Avatar