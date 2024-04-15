import styles from './CardList.module.css';
import card1 from '@/public/images/card1.png';
import { formatDate, getDaysAgo } from '../../util/date-calculator';
import { useEffect, useState } from 'react';
import { getFolder, getLinks } from '../../api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Item {
  id: number;
  created_at: string;
  updated_at: string;
  url: string;
  title: string;
  description: string;
  imageSource: string;
  folder_id: number;
}

function CardListItem({ item }: { item: Item }) {
  const href = item.url;

  return (
    <Link
      href={href}
      className={`${styles.card} flex flex-col`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        key={item.imageSource || card1.src}
        className={styles.cardImage}
        style={{ backgroundImage: `url(${item.imageSource || card1})` }}
      />

      <div className={styles.cardContent}>
        <p>{getDaysAgo(item.created_at)}</p>
        <h2 className={styles.h2}>{item.title}</h2>
        <p>{formatDate(item.created_at)}</p>
      </div>
    </Link>
  );
}

function CardList({ folderId }: { folderId: number }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const GetMyFolder = async () => {
      const { data } = await getFolder(folderId);
      if (!data || data.length === 0) {
        console.warn('폴더 데이터가 비어 있습니다.');
        return;
      }
      const { id, name: folderName, user_id, favorite } = data[0];
      const { data: linksData } = await getLinks(folderId, user_id);
      setLinks(linksData);
    };
    try {
      GetMyFolder();
    } catch (err) {
      console.log(err);
    }
  }, [folderId]);
  return (
    <ul className={styles.ul}>
      {links.map((item: Item, i) => {
        return (
          <li className={styles.li} key={item.id}>
            <CardListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
export default CardList;
