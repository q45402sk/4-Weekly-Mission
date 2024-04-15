import Image from 'next/image';
import {
  useState,
  FocusEvent,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
} from 'react';
import styles from './Input.module.css';
import eyeOnImg from '@/public/images/eye-on.png';
import eyeOffImg from '@/public/images/eye-off.png';

export const VALIDATE_TYPE = {
  email: 'email',
  password: 'password',
  passwordCheck: 'passwordCheck',
};

type Message = {
  email: string;
  password: string;
  passwordCheck: string;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  validateType?: keyof typeof VALIDATE_TYPE;
  isVisibleToggle?: boolean;
  isValidationCheck?: boolean;
  onBlur?: any;
  width?: number;
  height?: number;
  message?: Message;
  ref?: ForwardedRef<HTMLInputElement>;
  setMessage?: React.Dispatch<React.SetStateAction<Message>>;
}

const Input = forwardRef(
  (
    {
      type,
      className,
      validateType,
      isVisibleToggle,
      isValidationCheck,
      onBlur,
      width,
      height,
      message,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState('');
    const [inputType, setInputType] = useState(type);

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
    let warning = false;
    let errorMessage = '';
    if (validateType === 'email') {
      errorMessage = message ? message.email : '';
      if (message !== undefined && message.email !== '') {
        warning = true;
      } else {
        warning = false;
      }
    }
    if (validateType === 'password') {
      errorMessage = message ? message.password : '';
      if (message !== undefined && message.password !== '') {
        warning = true;
      } else {
        warning = false;
      }
    }
    if (validateType === 'passwordCheck') {
      errorMessage = message ? message.passwordCheck : '';
      if (message !== undefined && message.passwordCheck !== '') {
        warning = true;
      } else {
        warning = false;
      }
    }

    return (
      <>
        <div
          className={`${styles.inputContainer} ${warning && styles.warning}`}
          style={{ width: width, height: height }}
        >
          <input
            className={classNames}
            type={inputType}
            value={value}
            {...rest}
            onBlur={onBlur}
            onChange={handleInputChange}
            ref={ref}
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
          <p className={styles.message}>{errorMessage}</p>
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
