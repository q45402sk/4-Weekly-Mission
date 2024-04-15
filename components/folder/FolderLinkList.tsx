import { ReactNode, useEffect, useState } from 'react';
import { getAllLinks, getFolderList, getLinks, getUser } from '../../api';
import styles from './FolderLinkList.module.css';
import '@/components/shared/CardList.module.css';
import addButton from '@/public/images/add.png';
import ShareRenameDelete from './ShareRenameDelete';
import LinkList from './LinkList';
import EditModal from '../modals/EditModal';
import FolderData from './FolderData';
import LinkData from './LinkData';
import Image from 'next/image';

function FolderLinkList({ keywords }: { keywords: string }) {
  const [currentFolderName, setCurrentFolderName] = useState('전체');
  const [currentFolderId, setCurrentFolderId] = useState(1);
  const [folderListData, setFolderListData] = useState<FolderData[]>([]);
  const [linksData, setLinksData] = useState<LinkData[]>([]);
  //prevId값과 같은 Id를 가진 폴더버튼은 배경색이 변경된다
  const [prevId, setPrevId] = useState(1);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    const GetMyFolderList = async () => {
      const result = await getFolderList();
      const { data } = result;
      setFolderListData(data);
    };
    const GetInitialLinks = async () => {
      const result = await getAllLinks();
      const { data } = result;
      setLinksData(data);
    };
    try {
      GetMyFolderList();
      GetInitialLinks();
    } catch (err) {
      console.log(err);
    }
  }, []);

  interface NamedButtonProps {
    children: ReactNode;
    onClick: any;
    folderData: any;
    prevId: number;
  }

  const NamedButton = ({
    children,
    onClick,
    folderData,
    prevId,
  }: NamedButtonProps) => {
    const dataNameClick = () => onClick(folderData);

    return (
      <button
        className={
          //prevId값과 폴더 버튼의 Id값이 일치하면(해당 폴더버튼이 이전 폴더 버튼이 되었다면) 폴더버튼의 배경색을 바꾼다
          prevId === folderData.id
            ? `${styles.folderButton} ${styles.color}`
            : styles.folderButton
        }
        onClick={dataNameClick}
      >
        {children}
      </button>
    );
  };

  const handleDataNameClick = async (folderData: FolderData) => {
    const userDataResult = await getUser();
    const { data: userData } = userDataResult;
    const { id: userId } = userData[0];
    const result = await getLinks(folderData.id, userId);
    const { data } = result;
    setLinksData(data);
    setCurrentFolderName(folderData.name);
    setCurrentFolderId(folderData.id);
    //만약 이전 버튼 상태일 때 현재 버튼이 클릭됐다면
    if (prevId !== folderData.id) {
      //현재 누른 버튼이 이전 버튼이 되고 버튼 배경색이 바뀐다
      setPrevId(folderData.id);
    }
  };
  const handleAllButtonClick = async () => {
    const result = await getAllLinks();
    const { data } = result;
    setLinksData(data);
    setCurrentFolderName('전체');
    if (prevId !== 1) {
      setPrevId(1);
    }
  };

  function handleModalOn() {
    setModalOn(true);
  }
  function handleModalOff() {
    setModalOn(false);
  }
  return (
    <>
      <button className={styles.floatingAddFolder}>폴더 추가+</button>
      {folderListData.length !== 0 || linksData.length !== 0 ? (
        <div>
          <div className={styles.folderButtons}>
            <div>
              <button
                className={
                  prevId === 1 ? `${styles.allButton} color` : styles.allButton
                }
                onClick={handleAllButtonClick}
              >
                전체
              </button>
              {folderListData.map((data: FolderData) => {
                return (
                  <NamedButton
                    key={data.id}
                    onClick={handleDataNameClick}
                    folderData={data}
                    prevId={prevId}
                  >
                    {data.name}
                  </NamedButton>
                );
              })}
            </div>
            <button onClick={handleModalOn} className={styles.addFolder}>
              폴더추가{' '}
              <Image width={16} height={16} src={addButton} alt="addbutton" />
            </button>
            {modalOn && (
              <EditModal
                purpose={'폴더 추가'}
                handleModalOff={handleModalOff}
              />
            )}
          </div>
          <div className={styles.currentFolderNameShareRenameDelete}>
            <div className={styles.currentFolderName}>{currentFolderName}</div>
            {currentFolderName === '전체' ? (
              <></>
            ) : (
              <ShareRenameDelete
                folderName={currentFolderName}
                folderId={currentFolderId}
              />
            )}
          </div>
          {linksData.length === 0 && <div className={styles.noLinksData}></div>}

          <LinkList
            folderListData={folderListData}
            linksData={linksData}
            keywords={keywords}
          />
        </div>
      ) : (
        <div className={styles.noLink}>
          <div>저장된 링크가 없습니다.</div>
        </div>
      )}
    </>
  );
}
export default FolderLinkList;
