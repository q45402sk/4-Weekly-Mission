import Footer from '@/components/Footer';
import styles from './hompage.module.css';
import logo from '@/public/images/landing_image/logo.png';
import heroImage from '@/public/images/landing_image/image-25.png';
import landingImage1 from '@/public/images/landing_image/_img-1.png';
import landingImage2 from '@/public/images/landing_image/img-4.png';
import landingImage3 from '@/public/images/landing_image/img3-1.png';
import landingImage4 from '@/public/images/landing_image/feature-4.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Info from '@/components/Info';
import { GetProfile } from '@/api';
import Profile from '@/components/Profile';
export default function Home() {
  const [profileOn, setProfileOn] = useState(false);
  const [myProfile, setMyProfile] = useState<Info>({} as Info);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const GetMyProfile = async () => {
      const result = await GetProfile();
      setMyProfile(result);
    };

    try {
      GetMyProfile();
    } catch (err) {
      console.log(err);
    }
    if (storedAccessToken) {
      setProfileOn(true);
    }
  }, []);
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <Link className={styles.logo} href="/">
            <Image width={133} height={24} src={logo} alt="logo" />
          </Link>
          {!profileOn ? (
            <Link href="/signin" className="cta btn">
              로그인
            </Link>
          ) : (
            <Profile info={myProfile} />
          )}
        </nav>
      </div>
      <main className={styles.main}>
        <div className={`${styles.heroSection} flex flex-col`}>
          <div className={`${styles.heading} flex flex-col`}>
            <div>
              <span className={styles.textRainbow}>세상의 모든 정보</span>를
              <br />
            </div>
            <div className={styles.headingAlign}>
              <span>쉽게 저장하고</span>
              <span> 관리해 보세요</span>
            </div>
          </div>
          <Link className={`${styles.addLink} btn`} href="/signup">
            링크 추가하기
          </Link>
          <Image
            className={styles.imageHero}
            src={heroImage}
            alt="세상의 모든 정보를 쉽게 저장하고 관리해 보세요"
            priority={true}
          />
        </div>
        <div id="feature" className={styles.section}>
          <div className={styles.featureDescriptionBox}>
            <h2 className={styles.h2}>
              <div>
                <span className={styles.textRainbow2}>원하는 링크</span>를
              </div>
              <span> 저장하세요</span>
            </h2>
            <Image
              width={325}
              height={266}
              className={styles.hideOnTablet}
              alt="landingImage1"
              src={landingImage1}
            />
            <p className={styles.p}>
              <span>나중에 읽고 싶은 글, 다시 보고 싶은 영상,</span>
              <span>사고 싶은 옷, 기억하고 싶은 모든 것을</span>
              <span>한 공간에 저장하세요.</span>
            </p>
          </div>
          <div className={styles.featureImageBox}>
            <Image
              className={styles.hideOnMobile}
              src={landingImage1}
              alt="landingImage1Tablet"
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={`${styles.featureDescriptionBox} order-1`}>
            <h2 className={styles.h2}>
              <span>링크를 폴더로</span>
              <div>
                <span className={styles.textRainbow3}> 관리</span>하세요
              </div>
            </h2>
            <Image
              width={325}
              height={266}
              className={styles.hideOnTablet}
              src={landingImage2}
              alt="landingImage2"
            />
            <p className={styles.p}>
              <span>나만의 폴더를 무제한으로 만들고</span>
              <span>다양하게 활용할 수 있습니다.</span>
            </p>
          </div>
          <div className={styles.featureImageBox}>
            <Image
              className={styles.hideOnMobile}
              src={landingImage2}
              alt="landingImage2Tablet"
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.featureDescriptionBox}>
            <h2 className={styles.h2}>
              <span>저장한 링크를</span>
              <div>
                <span className={styles.textRainbow4}> 공유</span>해 보세요.
              </div>
            </h2>
            <Image
              width={325}
              height={266}
              className={styles.hideOnTablet}
              src={landingImage3}
              alt="landingImage3"
            />
            <p className={styles.p}>
              <span>여러 링크를 폴더에 담고 공유할 수 있습니다.</span>
              <span>가족, 친구, 동료들에게 쉽고 빠르게 링크를</span>
              <span>공유해 보세요.</span>
            </p>
          </div>
          <div className={styles.featureImageBox}>
            <Image
              className={styles.hideOnMobile}
              src={landingImage3}
              alt="landingImage3Tablet"
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={`${styles.featureDescriptionBox} order-1`}>
            <h2 className={styles.h2}>
              <span>저장한 링크를</span>
              <div>
                <span className={styles.textRainbow5}> 검색</span>해 보세요
              </div>
            </h2>
            <Image
              className={styles.hideOnTablet}
              src={landingImage4}
              alt="landingImage4"
              width={325}
              height={266}
            />
            <p className={styles.p}>중요한 정보들을 검색으로 쉽게 찾아보세요</p>
          </div>
          <div className={styles.featureImageBox}>
            <Image
              className={styles.hideOnMobile}
              src={landingImage4}
              alt="landingImage4Tablet"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
