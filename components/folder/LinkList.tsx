import { formatDate, getDaysAgo } from '@/util/date-calculator';
import card from '@/public/images/linkbrary-card.png';
import star from '@/public/images/star.png';
import kebab from '@/public/images/kebab.png';
import styles from './FolderLinkList.module.css';
import cardStyles from '@/components/shared/CardList.module.css';
import { FocusEvent, MouseEvent, useState } from 'react';
import AddModal from '../modals/AddModal';
import DeleteModal from '../modals/DeleteModal';
import FolderData from './FolderData';
import LinkData from './LinkData';
import Image from 'next/image';

function LinkListItem({
  folderListData,
  linkData,
}: {
  folderListData: FolderData[];
  linkData: LinkData;
}) {
  const [kebabOn, setKebabOn] = useState(false);
  const [addModalOn, setAddModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const url = linkData.url;
  let image = linkData.image_source || card.src;

  const handleKebab = (
    e: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
    isIn: boolean,
  ) => {
    e.preventDefault();
    setKebabOn(isIn);
  };

  function handleAddModalOn() {
    setAddModalOn(true);
  }
  function handleAddModalOff() {
    setAddModalOn(false);
  }
  function handleDeleteModalOn() {
    setDeleteModalOn(true);
  }
  function handleDeleteModalOff() {
    setDeleteModalOn(false);
  }

  function kebabMenuBlur(e: FocusEvent<HTMLButtonElement>) {
    const kebabMenuButtons = document.querySelectorAll(`${styles.kebabMenu}`);

    if (
      e.relatedTarget !== kebabMenuButtons[0] &&
      e.relatedTarget !== kebabMenuButtons[1]
    ) {
      handleKebab(e, false);
    }
  }
  return (
    <>
      <a
        href={url}
        className={`a ${cardStyles.card} flex flex-col`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          key={image}
          className={cardStyles.cardImage}
          style={{ backgroundImage: `url(${image})` }}
        >
          <button className={styles.star}>
            <Image width={30} height={30} src={star} alt="star" />
          </button>
        </div>
        <div className={cardStyles.cardContent}>
          <div>
            <button
              onClick={e => {
                handleKebab(e, true);
              }}
              onBlur={e => {
                kebabMenuBlur(e);
              }}
              className={styles.kebab}
            >
              <Image width={21} height={17} src={kebab} alt={styles.kebab} />
            </button>
            {kebabOn && (
              <div className={styles.kebabMenus}>
                <button
                  onClick={e => {
                    handleKebab(e, false);
                    handleDeleteModalOn();
                  }}
                  className={styles.kebabMenu}
                >
                  삭제하기
                </button>
                <button
                  onClick={e => {
                    handleKebab(e, false);
                    handleAddModalOn();
                  }}
                  className={styles.kebabMenu}
                >
                  폴더에 추가
                </button>
              </div>
            )}
          </div>

          <p>{getDaysAgo(linkData.created_at)}</p>
          <h2 className={cardStyles.h2}>{linkData.title}</h2>
          <p>{formatDate(linkData.created_at)}</p>
        </div>
      </a>
      {addModalOn && (
        <AddModal
          purpose="폴더에 추가"
          url={url}
          handleModalOff={handleAddModalOff}
          folderListData={folderListData}
        />
      )}
      {deleteModalOn && (
        <DeleteModal
          purpose="링크 삭제"
          link={linkData.url}
          folderName=""
          handleModalOff={handleDeleteModalOff}
        />
      )}
    </>
  );
}

function LinkList({
  linksData,
  folderListData,
  keywords,
}: {
  linksData: LinkData[];
  folderListData: FolderData[];
  keywords: string;
}) {
  const filteredLinksData = linksData.filter(el => {
    return (
      (el.description !== null && el.description.includes(keywords)) ||
      (el.title !== null && el.title.includes(keywords)) ||
      (el.url !== null && el.url.includes(keywords))
    );
  });
  return (
    <div className={styles.linkList}>
      {filteredLinksData.map(data => {
        return (
          <LinkListItem
            folderListData={folderListData}
            key={data.id}
            linkData={data}
          />
        );
      })}
    </div>
  );
}

export default LinkList;
