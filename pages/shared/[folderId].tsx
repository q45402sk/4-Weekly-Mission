import Navbar from '../../components/Navbar';
import Favorites from '../../components/shared/Favorites';
import LinkSearch from '../../components/LinkSearch';
import CardList from '../../components/shared/CardList';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFolder } from '@/api';
import { notFound } from 'next/navigation';

function Shared() {
  const [sharedKeywords, setSharedKeywords] = useState('');
  const router = useRouter();
  const { folderId } = router.query;
  useEffect(() => {
    const GetMyFolder = async () => {
      const { data } = await getFolder(Number(folderId));
      if (!data || data.length === 0) {
        // console.warn('폴더 데이터가 비어 있습니다.');
        // notFound();
        return;
      }
    };
    try {
      GetMyFolder();
    } catch (err) {
      console.log(err);
    }
  }, [folderId]);
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <Favorites folderId={Number(folderId)} />
      </div>
      <div className="link-search-card-list">
        <LinkSearch setKeywords={setSharedKeywords} />
        <CardList folderId={Number(folderId)} />
      </div>
      <Footer />
    </>
  );
}

export default Shared;
