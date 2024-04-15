import { useEffect, useState } from 'react';
import { getFolder, getProfile } from '../../api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import avatar from '../../public/images/Avatar.png';

function Favorites({ folderId }: { folderId: number }) {
  const [folderName, setFolderName] = useState<string>('');
  const [owner, setOwner] = useState<{
    id: number | null;
    userName: string;
    profileImageSource: string;
  }>({ id: null, userName: '', profileImageSource: '' });

  useEffect(() => {
    const GetMyFolder = async () => {
      const { data } = await getFolder(folderId);
      if (!data || data.length === 0) {
        // console.warn('폴더 데이터가 비어 있습니다.');
        return;
      }
      const { id, name: folderName, user_id, favorite } = data[0];
      setFolderName(folderName);
      const { data: userData } = await getProfile(user_id);
      if (!userData || userData.length === 0) {
        // console.warn('사용자 데이터가 비어 있습니다.');
        return;
      }
      const {
        id: userId,
        name: userName,
        image_source: profileImageSource,
        email,
      } = userData[0];
      setOwner(prev => ({
        ...prev,
        id: userId,
        userName: userName,
        profileImageSource: profileImageSource,
      }));
    };
    try {
      GetMyFolder();
    } catch (err) {
      console.log(err);
    }
  }, [folderId]);
  return (
    <div className="favorites flex flex-col justify-between items-center">
      <Image
        width={60}
        height={60}
        src={owner.profileImageSource || avatar}
        alt="profileImage"
        className="avatar-image"
        priority={true}
      />
      <p className="avatar-id">{owner.userName}</p>
      <h1>{folderName}</h1>
    </div>
  );
}

export default Favorites;
