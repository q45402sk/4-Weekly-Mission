import Footer from '@/components/Footer';
import logo from '@/public/images/landing_image/logo.png';
import heroImage from '@/public/images/landing_image/image-25.png';
import landingImage1 from '@/public/images/landing_image/_img-1.png';
import landingImage2 from '@/public/images/landing_image/img-4.png';
import landingImage3 from '@/public/images/landing_image/img3-1.png';
import landingImage4 from '@/public/images/landing_image/feature-4.png';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <body>
        <header>
          <nav>
            <Link className="logo" href="/">
              <Image width={133} height={24} src={logo} alt="logo" />
            </Link>
            <Link href="/signin" className="cta btn">
              로그인
            </Link>
          </nav>
        </header>
        <main>
          <div className="hero-section flex flex-col">
            <div className="heading flex flex-col">
              <div>
                <span className="text-rainbow">세상의 모든 정보</span>를<br />
              </div>
              <div className="heading-align">
                <span>쉽게 저장하고</span>
                <span> 관리해 보세요</span>
              </div>
            </div>
            <Link className="add_link btn" href="/signup">
              링크 추가하기
            </Link>
            <Image
              className="image-hero"
              src={heroImage}
              alt="세상의 모든 정보를 쉽게 저장하고 관리해 보세요"
            />
          </div>
          <div id="feature" className="section">
            <div className="feature__description-box">
              <h2>
                <div>
                  <span className="text-rainbow2">원하는 링크</span>를
                </div>
                <span> 저장하세요</span>
              </h2>
              <Image
                width={325}
                height={266}
                className="hide-on-tablet"
                alt="landingImage1"
                src={landingImage1}
              />
              <p>
                <span>나중에 읽고 싶은 글, 다시 보고 싶은 영상,</span>
                <span>사고 싶은 옷, 기억하고 싶은 모든 것을</span>
                <span>한 공간에 저장하세요.</span>
              </p>
            </div>
            <div className="feature__image-box">
              <Image
                className="hide-on-mobile"
                src={landingImage1}
                alt="landingImage1Tablet"
              />
            </div>
          </div>
          <div className="section">
            <div className="feature__description-box order-1">
              <h2>
                <span>링크를 폴더로</span>
                <div>
                  <span className="text-rainbow3"> 관리</span>하세요
                </div>
              </h2>
              <Image
                width={325}
                height={266}
                className="hide-on-tablet"
                src={landingImage2}
                alt="landingImage2"
              />
              <p>
                <span>나만의 폴더를 무제한으로 만들고</span>
                <span>다양하게 활용할 수 있습니다.</span>
              </p>
            </div>
            <div className="feature__image-box">
              <Image
                className="hide-on-mobile"
                src={landingImage2}
                alt="landingImage2Tablet"
              />
            </div>
          </div>
          <div className="section">
            <div className="feature__description-box">
              <h2>
                <span>저장한 링크를</span>
                <div>
                  <span className="text-rainbow4"> 공유</span>해 보세요.
                </div>
              </h2>
              <Image
                width={325}
                height={266}
                className="hide-on-tablet"
                src={landingImage3}
                alt="landingImage3"
              />
              <p>
                <span>여러 링크를 폴더에 담고 공유할 수 있습니다.</span>
                <span>가족, 친구, 동료들에게 쉽고 빠르게 링크를</span>
                <span>공유해 보세요.</span>
              </p>
            </div>
            <div className="feature__image-box">
              <Image
                className="hide-on-mobile"
                src={landingImage3}
                alt="landingImage3Tablet"
              />
            </div>
          </div>
          <div className="section">
            <div className="feature__description-box order-1">
              <h2>
                <span>저장한 링크를</span>
                <div>
                  <span className="text-rainbow5"> 검색</span>해 보세요
                </div>
              </h2>
              <Image
                className="hide-on-tablet"
                src={landingImage4}
                alt="landingImage4"
                width={325}
                height={266}
              />
              <p>중요한 정보들을 검색으로 쉽게 찾아보세요</p>
            </div>
            <div className="feature__image-box">
              <Image
                className="hide-on-mobile"
                src={landingImage4}
                alt="landingImage4Tablet"
              />
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
}
