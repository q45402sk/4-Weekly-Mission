import { useEffect, useState } from 'react';
import { getFolder } from '../../api';
import Image from 'next/image';

function Favorites() {
  const [folderName, setFolderName] = useState<string>('');
  const [owner, setOwner] = useState<{
    id: number | null;
    name: string;
    profileImageSource: string;
  }>({ id: null, name: '', profileImageSource: '' });

  useEffect(() => {
    const GetMyFolder = async () => {
      const { folder } = await getFolder();
      const { id, name: folderName, owner, links } = folder;
      setFolderName(folderName);
      setOwner(owner);
    };
    try {
      GetMyFolder();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="favorites flex flex-col justify-between items-center">
      <Image
        width={60}
        height={60}
        src={owner.profileImageSource}
        alt="profileImage"
      />
      <p className="avatar-id">{owner.name}</p>
      <h1>{folderName}</h1>
    </div>
  );
}

export default Favorites;
