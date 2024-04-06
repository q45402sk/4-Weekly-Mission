import { PostUserInfoSignIn } from '@/api';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

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
  const [isLoginSuccess, setIsLoginSuccess] = useState(true);
  const router = useRouter();

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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidate) return;
    try {
      const response = await PostUserInfoSignIn(submittedValue);
      if (!response.ok) {
        setMessage((prev: any) => ({
          ...prev,
          password: '비밀번호를 확인해 주세요',
          email: '이메일을 확인해 주세요',
        }));
        return;
      }
      const result = await response.json();
      setIsLoginSuccess(true);
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
          isValidationCheck={true}
          setIsValidateValue={setIsValidateValue}
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
          purpose="signin"
          width={400}
          height={60}
          message={message}
          setMessage={setMessage}
          isLoginSuccess={isLoginSuccess}
        />
        <Input
          type="text"
          validateType="password"
          isVisibleToggle={true}
          isValidationCheck={true}
          setIsValidateValue={setIsValidateValue}
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
          purpose="signin"
          width={400}
          height={60}
          message={message}
          setMessage={setMessage}
          isLoginSuccess={isLoginSuccess}
        />
        <button type="submit">제출</button>
      </form>

      {isValidate && <div>값들이 유효합니다.</div>}
    </>
  );
}
