import Image from 'next/image';
import { useState, FocusEvent, ChangeEvent } from 'react';
import styles from './Input.module.css';
import eyeOnImg from '@/public/images/eye-on.png';
import eyeOffImg from '@/public/images/eye-off.png';
import { validateEmail, validatePassword } from '@/util/validation';
import { PostEmail } from '@/api';

export const VALIDATE_TYPE = {
  email: 'email',
  password: 'password',
  passwordCheck: 'passwordCheck',
};

type InputProps = {
  className?: string;
  validateType?: keyof typeof VALIDATE_TYPE;
  isVisibleToggle?: boolean;
  isValidationCheck?: boolean;
  setIsValidateValue?: any;
  submittedValue: { email: string; password: string };
  setSubmittedValue: any;
  purpose?: string;
  isLoginSuccess?: boolean;
  width?: number;
  height?: number;
  message?: { email: string; password: string; passwordCheck: string };
  setMessage?: any;
  [key: string]: any;
};

function Input({
  type,
  className,
  validateType,
  isVisibleToggle,
  isValidationCheck,
  setIsValidateValue,
  setSubmittedValue,
  submittedValue,
  isLoginSuccess,
  purpose,
  width,
  height,
  message,
  setMessage,
  ...rest
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState(type);

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    if (!isValidationCheck) return;
    const value = e.target.value;

    switch (validateType) {
      case VALIDATE_TYPE.email:
        if (value.trim() === '') {
          setMessage((prev: any) => ({
            ...prev,
            email: '이메일을 입력해 주세요',
          }));
          return;
        }
        if (!validateEmail(value)) {
          setMessage((prev: any) => ({
            ...prev,
            email: '유효한 이메일을 입력해 주세요',
          }));
          return;
        }
        if (purpose === 'signup') {
          try {
            const response = await PostEmail(value);
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
        setSubmittedValue((prev: any) => ({ ...prev, email: value }));

        setMessage((prev: any) => ({
          ...prev,
          email: '',
        }));
        setIsValidateValue((prev: any) => ({ ...prev, email: true }));

        break;
      case VALIDATE_TYPE.password:
        if (value.trim() === '') {
          setMessage((prev: any) => ({
            ...prev,
            password: '비밀번호를 입력해 주세요',
          }));
          return;
        }
        if (!validatePassword(value)) {
          setMessage((prev: any) => ({
            ...prev,
            password: '유효한 비밀번호를 입력해 주세요',
          }));
          return;
        }
        setSubmittedValue((prev: any) => ({ ...prev, password: value }));

        setMessage((prev: any) => ({
          ...prev,
          password: '',
        }));
        setIsValidateValue((prev: any) => ({ ...prev, password: true }));

        break;
      case VALIDATE_TYPE.passwordCheck:
        if (value.trim() === '') {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '비밀번호를 입력해 주세요',
          }));
          return;
        }
        if (!validatePassword(value)) {
          setMessage((prev: any) => ({
            ...prev,
            passwordCheck: '유효한 비밀번호를 입력해 주세요',
          }));
          return;
        }

        if (submittedValue.password !== value) {
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
  };

  const handleVisibleToggle = () => {
    setIsVisible(preIsVisible => !preIsVisible);
    if (inputType === 'text') {
      setInputType('password');
      return;
    }
    if (inputType === 'password') {
      setInputType('text');
    }
  };

  const classNames = `${styles.input} ${className}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <div
        className={`${styles.inputContainer} ${
          message !== undefined &&
          (validateType === 'email'
            ? message.email !== ''
              ? styles.red
              : ''
            : validateType === 'password'
              ? message.password !== ''
                ? styles.red
                : ''
              : validateType === 'passwordCheck'
                ? message.passwordCheck !== ''
                  ? styles.red
                  : ''
                : '')
        }`}
        style={{ width: width, height: height }}
      >
        <input
          className={classNames}
          type={inputType}
          value={value}
          {...rest}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        {isVisibleToggle && (
          <button
            type="button"
            onClick={handleVisibleToggle}
            className={styles.eyeButton}
          >
            <Image
              src={isVisible ? eyeOnImg : eyeOffImg}
              alt="눈 감음"
              priority={true}
            />
          </button>
        )}
      </div>
      {message !== undefined && (
        <p className={styles.message}>
          {validateType === 'email'
            ? message.email
            : validateType === 'password'
              ? message.password
              : validateType === 'passwordCheck'
                ? message.passwordCheck
                : ''}
        </p>
      )}
    </div>
  );
}

export default Input;
