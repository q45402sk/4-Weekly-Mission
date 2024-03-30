import { useState } from 'react';
import share from '@/public/images/share.png';
import ShareModal from '../modals/ShareModal';
import Image from 'next/image';

function ShareButton({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) {
  const [modalOn, setModalOn] = useState(false);
  function handleModalOn() {
    setModalOn(true);
  }
  function handleModalOff() {
    setModalOn(false);
  }
  return (
    <>
      <button onClick={handleModalOn} className="share-rename-delete-button">
        <Image width={18} height={18} src={share} alt="share" />
        공유
      </button>
      {modalOn && (
        <ShareModal
          purpose={'폴더 공유'}
          folderName={folderName}
          folderId={folderId}
          handleModalOff={handleModalOff}
        />
      )}
    </>
  );
}
export default ShareButton;
