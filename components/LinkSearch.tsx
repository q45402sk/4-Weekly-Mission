import styles from './LinkSearch.module.css';
import search from '@/public/images/Search.png';
import close from '@/public/images/_close.png';
import Image from 'next/image';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';

function LinkSearch({ setKeywords }: { setKeywords: any }) {
  const [value, setValue] = useState('');
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetInput = target.children[1] as HTMLInputElement;
    setKeywords(targetInput.value);
  }
  function handleCancelButtonClick(e: MouseEvent) {
    e.preventDefault();
    setKeywords('');
    setValue('');
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return (
    <form onSubmit={handleSearch} className={styles.linkSearchContainer}>
      <button className={styles.searchButton}>
        <Image width={16} height={16} src={search} alt="search" />
      </button>
      <input
        className={styles.linkSearch}
        type="text"
        placeholder="링크를 검색해 보세요."
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleCancelButtonClick} className={styles.closeButton}>
        <Image width={24} height={24} src={close} alt="close" />
      </button>
    </form>
  );
}
export default LinkSearch;
