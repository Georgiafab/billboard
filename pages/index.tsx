import { Image } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';
import { PrevIcon, NextIcon } from '../public/icons';
import style from './index.module.scss';



export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};



{/* <Image preview={false} className={style.avar} src="/images/avar.png" height={40} width={40} alt={'avar'}></Image> */ }
const Home: NextPage = () => {
  return (
    <main>
      <div className='container'>
        <h1 className={style.title}>历史广告牌</h1>

        <div className={style.billItem}>

          <Image width={"100%"} className={style.billImage} src="/images/billimage.png" alt=''
            preview={{
              destroyOnClose: true,
              imageRender: () => (
                <div className={style.previewBox}>
                  <div className={style.billButton + ' ' + style.buttonTop}>
                    <PrevIcon> </PrevIcon>
                  </div>
                  <div className={style.desc} data-preview>
                    <Image className={style.avar} preview={false} src="/images/avar.png" height={40} width={40} alt={'avar'}></Image>
                    <h3>0X2000999393076</h3>
                    <div className={style.date}>24/2/2-24/3/1</div>
                  </div>
                  <Image src='/images/billimage.png' alt='' width={"100%"} preview={false}></Image>
                  <div className={style.billButton}>
                    <NextIcon></NextIcon>
                  </div>
                </div>
              ),
              toolbarRender: () => null,
            }}
          > </Image>
          <div className={style.desc}>

            <Image className={style.avar} preview={false} src="/images/avar.png" height={56} width={56} alt={'avar'}></Image>
            <h3>0X2000999393076</h3>
            <div className={style.date}>24/2/2-24/3/1</div>
          </div>
        </div>

        <div className={style.billItem}>

          <Image width={"100%"} className={style.billImage} src="/images/billimage.png" alt=''> </Image>
          <div className={style.desc}>

            <Image className={style.avar} preview={false} src="/images/avar.png" height={40} width={40} alt={'avar'} ></Image>
            <h3>0X2000999393076</h3>
            <div className={style.date}>24/2/2-24/3/1</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

/* 退出登陆 */

