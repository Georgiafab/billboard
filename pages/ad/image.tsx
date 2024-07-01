import React, { useCallback, useState } from 'react'
import type { UploadProps, } from 'antd';
import { message, Upload, Button, Input } from 'antd';
import { PlusIcon, Step1Icon, Step2Icon, Step3Icon } from '~/icons';
import style from './image.module.scss';
import Back from '@/components/Back';

const STEPS = [
    {
        title: "step1",
        lable: "PC端图片上传"
    },
    {
        title: "step2",
        lable: "手机端图片上传"
    },
    {
        title: "step3",
        lable: "审核附注"
    }
]
const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


export function StepsIcon({ index }: { index: number }) {
    const icons = [Step1Icon, Step2Icon, Step3Icon];
    index = index <= 0 ? 1 : index - 1
    const IconComponent = icons[index];
    return <IconComponent />;
}
export default function Image() {
    const [currStep, setCurrStep] = useState<number>(1)
    const [note, setNote] = useState<string>('')


    const handleNext = useCallback(() => {
        setCurrStep(prev => prev + 1)
    }, [setCurrStep])


    const handlePrev = useCallback(() => {
        setCurrStep(prev => prev - 1)
    }, [setCurrStep])

    return (
        <main className='ad '>
            <div className="w-[816px] m-auto overflow-hidden text-white">

                <Back text="图片配置" >
                    {currStep > 1 && <span className='text-xl' onClick={handlePrev}>上一步</span>}
                </Back>

                <div className='mt-8 relative'>
                    <div className='absolute flex items-center w-full  mx-4'>
                        {STEPS.map((item, index) => (
                            <div className={`w-1/3 px-2 py-3 cursor-pointer mt-1 ${currStep === (index + 1) ? 'text-purple' : 'text-white'}`} key={item.title}>
                                <p className={`${currStep === (index + 1) ? 'text-purple' : 'text-white'} text-xs text-opacity-60`}>{item.title}</p>
                                <p className='text-sm mt-1'>{item.lable}</p>
                            </div>
                        ))}
                    </div>
                    <StepsIcon index={currStep} />
                </div>
                <div className='w-full h-[468px] bg-purple_sub flex items-center rounded-md justify-center border-[#A9A6FF] drop-shadow-md '>
                    {
                        currStep == 1 && (

                            <Dragger {...props} className={`w-full h-[200px] text-center bg-white block border-none ${style.upload}`}>

                                <p className=" text-purple inline-block">
                                    <PlusIcon></PlusIcon>
                                </p>
                                <p className=" text-center text-base text-black mt-2">
                                    建议上传比例？？图片，<br />
                                    图片小于5M
                                </p>
                            </Dragger>

                        )
                    }


                    {
                        currStep == 2 && (

                            <Dragger {...props} className={`h-full w-[300px] text-center bg-white block border-none ${style.upload}`}>

                                <p className=" text-purple inline-block">
                                    <PlusIcon></PlusIcon>
                                </p>
                                <p className=" text-center text-base text-black mt-2">
                                    建议上传比例？？图片，<br />
                                    图片小于5M
                                </p>
                            </Dragger>
                        )
                    }

                    {
                        currStep == 3 && (
                            <div className={`w-full h-full bg-purple_sub relative rounded-md text-black border border-[#A9A6FF] overflow-hidden`}>
                                <textarea value={note} onInput={e => { setNote(e.currentTarget.value) }}
                                    className={`w-full h-full p-[22px]  `} style={{ height: "100%", resize: "none" }}></textarea>
                                {!note && <p className='absolute top-[22px] left-[22px] z-10 text-[#000] text-opacity-20'>
                                    本项目是XXXX <br />
                                    联系方式为1234567890
                                </p>}
                            </div>
                        )
                    }
                </div>

                {currStep < 3 ?
                    <Button block className='h-14 text-purple rounded-lg border-none mt-8 bg-white' onClick={handleNext}>下一步</Button> :
                    <Button block type="primary" className="h-14 rounded-lg flex-shrink-0 mt-8">提交</Button>}
            </div>
        </main >
    )


}
