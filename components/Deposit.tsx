import { SuccessIcon } from "@/public/icons"
import { contractMsg } from "@/wagmi"
import { message, Modal, Input, Button } from "antd"
import { useState } from "react"
import { formatEther, parseEther } from "viem"
import NotifAlert from "./NotifAlert"
import { useWriteContract } from "wagmi"
interface IDeposit {
    totalUsageFee: string,
    errorCb?: () => void,
    depositOpen: boolean,
    setDepositOpen: React.Dispatch<React.SetStateAction<boolean>>

}
const Deposit = ({ totalUsageFee, errorCb, depositOpen, setDepositOpen }: IDeposit) => {
    const { writeContractAsync, isPending } = useWriteContract()
    // const [depositOpen, setDepositOpen] = useState(false)
    const [deposit, setdeposit] = useState(totalUsageFee || '')
    const [notifShow, setNotifShow] = useState(false)
    const supplyDeposit = () => {
        writeContractAsync({
            ...contractMsg,
            functionName: "deposit",
            args: ["0"],
            value: parseEther(deposit)
        }).then(res => {
            setNotifShow(true)
        }).catch(error => {
            message.error(error.message)
            setDepositOpen(false)
            // setPriceOpen(true)
            errorCb && errorCb()

        })
    }


    return <>
        <Modal
            footer={null}
            className="max-w-md"
            onCancel={() => setDepositOpen(false)}
            centered
            open={depositOpen}
        >
            <h3 className='text-center text-2xl max-lg:text-lg font-semibold'>请补充质押额</h3>
            <Input value={deposit} onInput={(e) => setdeposit(e.currentTarget.value)} className={`rounded  text-black !bg-[#F6F6F6] mt-8 h-12 border-0 text-xl max-md:text-lg max-md:h-8 max-md:py-1 `}
                suffix={<span className='text-black text-opacity-20 text-base'>See</span>} />

            <Button loading={isPending} type="primary" className='w-full mt-10 max-md:mt-8 text-lg max-md:text-md' onClick={supplyDeposit}>提交</Button>
        </Modal>
        <NotifAlert show={notifShow} setShow={setNotifShow}>
            <SuccessIcon className="inline-block" />
            <p className='mt-[6px]'>补充成功</p>
        </NotifAlert></>

}

export default Deposit