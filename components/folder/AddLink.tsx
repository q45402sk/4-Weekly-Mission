import { useEffect, useState } from 'react';
import link from '@/public/images/link.png';
import AddModal from '../modals/AddModal';
import styles from './AddLink.module.css';
import { GetFolderList } from '../../api';
import Image from 'next/image';

function AddLink() {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [folderListData, setFolderListData] = useState<any[]>([]);

  useEffect(() => {
    const GetMyFolderList = async () => {
      const result = await GetFolderList();
      const { data } = result;
      setFolderListData(data);
    };
    try {
      GetMyFolderList();
    } catch (err) {
      console.log(err);
    }
  }, []);
  function handleModalOff() {
    setModalOn(false);
  }

  return (
    <>
      <div className={styles.addLinkInputForm}>
        <Image
          width={20}
          height={20}
          className={styles.linkImage}
          src={link}
          alt="link"
        />
        <input
          className={styles.addLinkInput}
          placeholder="링크를 추가해 보세요"
        />

        <button
          onClick={() => setModalOn(true)}
          className={`btn cta ${styles.addButton}`}
        >
          추가하기
        </button>
      </div>
      {modalOn && (
        <AddModal
          purpose={'폴더에 추가'}
          url={''}
          handleModalOff={handleModalOff}
          folderListData={folderListData}
        />
      )}
    </>
  );
}
export default AddLink;
