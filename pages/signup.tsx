import { PostUserInfoSignUp } from '@/api';
import Input from '@/components/Input';
import { Router, useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

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
  const [isValidate, setIsValidate] = useState(false);
  const router = useRouter();

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
      const response = await PostUserInfoSignUp(submittedValue);
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
    <>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          validateType="email"
          isVisibleToggle={true}
          isValidationCheck={true}
          setIsValidateValue={setIsValidateValue}
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
          purpose="signup"
          width={400}
          height={60}
        />
        <Input
          type="text"
          validateType="password"
          isVisibleToggle={true}
          isValidationCheck={true}
          setIsValidateValue={setIsValidateValue}
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
          width={400}
          height={60}
        />
        <Input
          type="text"
          validateType="passwordCheck"
          isVisibleToggle={true}
          isValidationCheck={true}
          setIsValidateValue={setIsValidateValue}
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
          width={400}
          height={60}
        />
        <button type="submit">제출</button>
      </form>

      {isValidate && <div>값들이 유효합니다.</div>}
    </>
  );
}
