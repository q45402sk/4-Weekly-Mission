import { postEmail, postUserInfoSignIn } from '@/api';
import Input from '@/components/Input';
import { validateEmail, validatePassword } from '@/util/validation';
import { useRouter } from 'next/router';
import styles from './signin.module.css';
import {
  FocusEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/signin-image/logo.png';
import kakao from '@/public/images/signin-image/kakao.png';
import google from '@/public/images/signin-image/google.png';

export default function Home() {
  const [submittedValue, setSubmittedValue] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const router = useRouter();
  const purpose: string = 'signin';
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordCheckRef: RefObject<HTMLInputElement> = useRef(null);
  //질문: useEffect훅을 사용하면 컴포넌트가 클라이언트 측에서만 렌더링될 때 실행되는 코드를 구성할 수 있다고 해서
  //이 코드들을 useEffect 안에 넣었습니다. 근데 이렇게 하면 렌더링이 된 후에 useEffect를 실행하는 거라 그런지
  //로그인 페이지가 잠깐 보였다가 folder페이지로 이동하는데, 이 문제를 해결하는 방법이 있을까요?
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      router.push('./folder');
    }
  });

  const VALIDATE_TYPE = {
    email: 'email',
    password: 'password',
    passwordCheck: 'passwordCheck',
  };

  const handleBlur = async (validateType: string) => {
    switch (validateType) {
      case VALIDATE_TYPE.email:
        const emailValue = emailRef.current?.value;
        if (emailValue === undefined) return;
        if (emailValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            email: '이메일을 입력해 주세요.',
          }));

          return false;
        }
        if (!validateEmail(emailValue)) {
          setMessage((prev: any) => ({
            ...prev,
            email: '올바른 이메일 주소가 아닙니다.',
          }));

          return;
        }
        if (purpose === 'signup') {
          try {
            const response = await postEmail(emailValue);
            if (!response.ok) {
              setMessage((prev: any) => ({
                ...prev,
                email: '이미 사용 중인 이메일입니다.',
              }));

              return false;
            }
          } catch (err) {
            console.log(err);
          }
        }
        setSubmittedValue((prev: any) => ({ ...prev, email: emailValue }));

        setMessage((prev: any) => ({
          ...prev,
          email: '',
        }));

        return true;
      case VALIDATE_TYPE.password:
        const passwordValue = passwordRef.current?.value;
        if (passwordValue === undefined) return;
        if (passwordValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            password: '비밀번호를 입력해 주세요.',
          }));

          return false;
        }
        if (!validatePassword(passwordValue)) {
          setMessage((prev: any) => ({
            ...prev,
            password: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
          }));

          return false;
        }
        setSubmittedValue((prev: any) => ({
          ...prev,
          password: passwordValue,
        }));

        setMessage((prev: any) => ({
          ...prev,
          password: '',
        }));

        return true;
      case VALIDATE_TYPE.passwordCheck:
        const passwordCheckValue = passwordCheckRef.current?.value;
        if (passwordCheckValue === undefined) return;
        if (passwordCheckValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호를 입력해 주세요.',
          }));

          return false;
        }
        if (!validatePassword(passwordCheckValue)) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '유효한 비밀번호를 입력해 주세요.',
          }));

          return false;
        }

        if (submittedValue.password !== passwordCheckValue) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호가 일치하지 않아요.',
          }));

          return false;
        }

        setMessage((prev: any) => ({
          ...prev,
          passwordCheck: '',
        }));

        return true;
      default:
        return;
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = await handleBlur('email');
    const isValidPassword = await handleBlur('password');

    if (!isValidEmail || !isValidPassword) return;

    try {
      const response = await postUserInfoSignIn(submittedValue);
      if (!response.ok) {
        setMessage((prev: any) => ({
          ...prev,
          password: '비밀번호를 확인해 주세요',
          email: '이메일을 확인해 주세요',
        }));
        return;
      }
      const result = await response.json();
      const accessToken = result.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      router.push('/folder');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className={styles.logo}
              priority={true}
            />
          </Link>
          <div className={styles.titleMessage}>
            <p className={styles.p}>회원이 아니신가요? </p>
            <Link href="/signup" className={styles.signupLink}>
              회원 가입하기
            </Link>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p className={styles.label}>이메일</p>
          <Input
            type="text"
            validateType="email"
            onBlur={() => handleBlur('email')}
            width={400}
            height={60}
            message={message}
            ref={emailRef}
            placeholder="이메일을 입력해 주세요."
          />
          <p className={styles.label}>비밀번호</p>
          <Input
            type="text"
            validateType="password"
            isVisibleToggle={true}
            onBlur={() => handleBlur('password')}
            width={400}
            height={60}
            message={message}
            ref={passwordRef}
            placeholder="비밀번호를 입력해 주세요."
          />
          <button type="submit" className={`btn cta ${styles.button}`}>
            로그인
          </button>
        </form>
        <div className={styles.socialLoginContainer}>
          <p className={styles.socialLogin}>소셜 로그인</p>
          <Link href="https://www.google.com/">
            <Image
              className={styles.socialIcon}
              src={google}
              alt="googleIcon"
              width={44}
              height={44}
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image
              className={styles.socialIcon}
              src={kakao}
              alt="kakaoIcon"
              width={44}
              height={44}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
