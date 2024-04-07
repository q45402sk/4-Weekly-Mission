import { postEmail, postUserInfoSignUp } from '@/api';
import Input from '@/components/Input';
import { validateEmail, validatePassword } from '@/util/validation';
import { useRouter } from 'next/router';
import styles from './signup.module.css';
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
  const [isValidateValue, setIsValidateValue] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });
  const [submittedValue, setSubmittedValue] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [isValidate, setIsValidate] = useState(false);
  const router = useRouter();
  const purpose = 'signup';
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordCheckRef: RefObject<HTMLInputElement> = useRef(null);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      router.push('./folder');
    }
  });
  useEffect(() => {
    if (
      isValidateValue.email === true &&
      isValidateValue.password === true &&
      isValidateValue.passwordCheck === true
    ) {
      setIsValidate(true);
    }
  }, [isValidateValue]);

  const VALIDATE_TYPE = {
    email: 'email',
    password: 'password',
    passwordCheck: 'passwordCheck',
  };
  const handleBlur = async (validateType: string) => {
    console.log('c');
    switch (validateType) {
      case VALIDATE_TYPE.email:
        const emailValue = emailRef.current?.value;
        if (emailValue === undefined) return;
        if (emailValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            email: '이메일을 입력해 주세요.',
          }));

          return;
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

              return;
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

        setIsValidateValue((prev: any) => ({ ...prev, email: true }));

        break;
      case VALIDATE_TYPE.password:
        const passwordValue = passwordRef.current?.value;
        if (passwordValue === undefined) return;
        if (passwordValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            password: '비밀번호를 입력해 주세요.',
          }));

          return;
        }
        if (!validatePassword(passwordValue)) {
          setMessage((prev: any) => ({
            ...prev,
            password: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
          }));

          return;
        }
        setSubmittedValue((prev: any) => ({
          ...prev,
          password: passwordValue,
        }));

        setMessage((prev: any) => ({
          ...prev,
          password: '',
        }));

        console.log('d');

        setIsValidateValue((prev: any) => ({ ...prev, password: true }));

        break;
      case VALIDATE_TYPE.passwordCheck:
        const passwordCheckValue = passwordCheckRef.current?.value;
        if (passwordCheckValue === undefined) return;
        if (passwordCheckValue === '') {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호를 입력해 주세요.',
          }));

          return;
        }
        if (!validatePassword(passwordCheckValue)) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
          }));

          return;
        }

        if (submittedValue.password !== passwordCheckValue) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호가 일치하지 않아요.',
          }));

          return;
        }

        setMessage((prev: any) => ({
          ...prev,
          passwordCheck: '',
        }));

        setIsValidateValue((prev: any) => ({ ...prev, passwordCheck: true }));

        break;
      default:
        return;
    }
    console.log('After handleBlur:', isValidateValue);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(isValidateValue);
    console.log('a');
    await handleBlur('email');
    console.log(isValidateValue);
    await handleBlur('password');
    console.log(isValidateValue);
    await handleBlur('passwordCheck');
    console.log('b');

    if (!isValidate) return;
    try {
      const response = await postUserInfoSignUp(submittedValue);
      if (!response.ok) {
        throw new Error('회원가입이 불가합니다.');
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
            <p className={styles.p}>이미 회원이신가요? </p>
            <Link href="/signin" className={styles.signupLink}>
              로그인 하기
            </Link>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p className={styles.label}>이메일</p>
          <Input
            type="text"
            validateType="email"
            isValidationCheck={true}
            onBlur={() => handleBlur('email')}
            message={message}
            width={400}
            height={60}
            ref={emailRef}
            placeholder="이메일을 입력해 주세요."
          />
          <p className={styles.label}>비밀번호</p>
          <Input
            type="text"
            validateType="password"
            isVisibleToggle={true}
            isValidationCheck={true}
            onBlur={() => handleBlur('password')}
            ref={passwordRef}
            message={message}
            width={400}
            height={60}
            placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
          />
          <p className={styles.label}>비밀번호 확인</p>
          <Input
            type="text"
            validateType="passwordCheck"
            isVisibleToggle={true}
            isValidationCheck={true}
            onBlur={() => handleBlur('passwordCheck')}
            ref={passwordCheckRef}
            message={message}
            width={400}
            height={60}
            placeholder="비밀번호와 일치하는 값을 입력해 주세요."
          />
          <button type="submit" className={`btn cta ${styles.button}`}>
            회원가입
          </button>
        </form>
        <div className={styles.socialLoginContainer}>
          <p className={styles.socialLogin}>소셜 로그인</p>
          <Link href="https://www.google.com/">
            <Image
              className={styles.socialIcon}
              src={google}
              alt="googleIcon"
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image className={styles.socialIcon} src={kakao} alt="kakaoIcon" />
          </Link>
        </div>
        {isValidate && <div>값들이 유효합니다.</div>}
      </div>
    </div>
  );
}
