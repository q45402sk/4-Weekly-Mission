import { postEmail, postUserInfoSignIn } from '@/api';
import Input from '@/components/Input';
import { validateEmail, validatePassword } from '@/util/validation';
import { useRouter } from 'next/router';
import {
  FocusEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function Home() {
  const [isValidateValue, setIsValidateValue] = useState({
    email: false,
    password: false,
    passwordCheck: true,
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
            email: '이메일을 입력해 주세요',
          }));

          return;
        }
        if (!validateEmail(emailValue)) {
          setMessage((prev: any) => ({
            ...prev,
            email: '유효한 이메일을 입력해 주세요',
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
            password: '비밀번호를 입력해 주세요',
          }));

          return;
        }
        if (!validatePassword(passwordValue)) {
          setMessage((prev: any) => ({
            ...prev,
            password: '유효한 비밀번호를 입력해 주세요',
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
            passwordCheck: '비밀번호를 입력해 주세요',
          }));

          return;
        }
        if (!validatePassword(passwordCheckValue)) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '유효한 비밀번호를 입력해 주세요',
          }));

          return;
        }

        if (submittedValue.password !== passwordCheckValue) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호가 일치하지 않습니다.',
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
    <>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          validateType="email"
          // setIsValidateValue={setIsValidateValue}
          // submittedValue={submittedValue}
          // setSubmittedValue={setSubmittedValue}
          onBlur={() => handleBlur('email')}
          width={400}
          height={60}
          message={message}
          ref={emailRef}
        />
        <Input
          type="text"
          validateType="password"
          isVisibleToggle={true}
          // setIsValidateValue={setIsValidateValue}
          // submittedValue={submittedValue}
          // setSubmittedValue={setSubmittedValue}
          onBlur={() => handleBlur('password')}
          width={400}
          height={60}
          message={message}
          ref={passwordRef}
        />
        <button type="submit">제출</button>
      </form>

      {isValidate && <div>값들이 유효합니다.</div>}
    </>
  );
}
