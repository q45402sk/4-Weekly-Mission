import styles from './CardList.module.css';
import card1 from '@/public/images/card1.png';
import { formatDate, getDaysAgo } from '../../util/date-calculator';
import { useEffect, useState } from 'react';
import { GetFolder } from '../../api';
import Link from 'next/link';

interface Item {
  id: number;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  imageSource: string;
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
        <p>{getDaysAgo(item.createdAt)}</p>
        <h2 className={styles.h2}>{item.title}</h2>
        <p>{formatDate(item.createdAt)}</p>
      </div>
    </Link>
  );
}

function CardList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const GetMyFolder = async () => {
      const {
        folder: { links },
      } = await GetFolder();
      setLinks(links);
    };
    try {
      GetMyFolder();
    } catch (err) {
      console.log(err);
    }
  }, []);
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
