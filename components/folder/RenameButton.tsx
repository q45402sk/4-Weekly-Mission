import { useState } from 'react';
import rename from '@/public/images/pen.png';
import EditModal from '../modals/EditModal';
import Image from 'next/image';
import styles from './FolderLinkList.module.css';

function RenameButton() {
  const [modalOn, setModalOn] = useState(false);
  const handleModalOn = () => {
    setModalOn(true);
  };
  const handleModalOff = () => {
    setModalOn(false);
  };
  return (
    <>
      <button
        onClick={handleModalOn}
        className={styles.shareRenameDeleteButton}
      >
        <Image width={18} height={18} src={rename} alt="rename" />
        이름 변경
      </button>
      {modalOn && (
        <EditModal purpose={'폴더 이름 변경'} handleModalOff={handleModalOff} />
      )}
    </>
  );
}
export default RenameButton;
