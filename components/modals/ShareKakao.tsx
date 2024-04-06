/* eslint-disable*/

import { useEffect } from 'react';
import kakaoImg from '@/public/images/Kakao.png';
import libraryImg from '@/public/images/library.png';
import styled from 'styled-components';
import Image from 'next/image';

const handleShareKakao = (shareLink: string) => {
  if (typeof window !== undefined) {
    const { Kakao } = window;
    if (Kakao) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'Linkbrary',
          description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요',
          // imageUrl: libraryImg,
          imageUrl: '',
          link: {
            // mobileWebUrl: "https://developers.kakao.com",
            webUrl: shareLink,
          },
        },

        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: shareLink,
            },
          },
          {
            title: '앱으로 이동',
            link: {
              mobileWebUrl: '',
              webUrl: '',
            },
          },
        ],
      });
    }
  }
};
const SNSImg = styled.button`
  background-color: ${props => props.color};
  width: 42px;
  height: 42px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
`;

export default function ShareKakao({ folderId }: { folderId: number }) {
  // 배포한 자신의 사이트
  const realUrl = '';
  // 로컬 주소 (localhost 3000 같은거)
  const host = window.location.host;
  let shareLink = `${host}/shared?user=1&folder=${folderId}`;
  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    if (typeof window !== undefined) {
      const { Kakao } = window;
      if (Kakao) {
        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_INIT_KEY);
        // 잘 적용되면 true 를 뱉는다.
        // console.log(Kakao.isInitialized());
      }
    }
  }, []);

  return (
    <SNSImg
      color="#fee500"
      onClick={e => {
        e.preventDefault();
        handleShareKakao(shareLink);
      }}
    >
      <Image src={kakaoImg} width={18} height={18} alt="kakaoimg" />
    </SNSImg>
  );
}
