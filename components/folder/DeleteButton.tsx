import { useState } from 'react';
import deleteimg from '@/public/images/delete.png';
import DeleteModal from '../modals/DeleteModal';
import Image from 'next/image';

function DeleteButton({ folderName }: { folderName: string }) {
  const [modalOn, setModalOn] = useState(false);
  const handleModalOn = () => {
    setModalOn(true);
  };
  const handleModalOff = () => {
    setModalOn(false);
  };
  return (
    <>
      <button onClick={handleModalOn} className="share-rename-delete-button">
        <Image width={18} height={18} src={deleteimg} alt="deleteimg" />
        삭제
      </button>
      {modalOn && (
        <DeleteModal
          link=""
          purpose={'폴더 삭제'}
          folderName={folderName}
          handleModalOff={handleModalOff}
        />
      )}
    </>
  );
}
export default DeleteButton;
