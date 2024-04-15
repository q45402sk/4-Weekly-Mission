import AddLink from '../../components/folder/AddLink';
import LinkSearch from '../../components/LinkSearch';
import Navbar from '../../components/Navbar';
import styles from '../Folder.module.css';
import FolderLinkList from '../../components/folder/FolderLinkList';
import Footer from '../../components/Footer';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

function Folder() {
  const [Folderkeywords, setFolderKeywords] = useState('');
  const [addLinkOn, setAddLinkOn] = useState(false);
  const [addLinkState, setAddLinkState] = useState(true);
  const [footerState, setFooterState] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const addLinkRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/signin');
    }
  }, [router]);

  let AddLinkElement: HTMLDivElement;
  let footerElement: HTMLDivElement;

  const handleIntersect = (entries: any, observe: any) => {
    entries.forEach((entry: any) => {
      if (entry.target === AddLinkElement) {
        if (entry.isIntersecting === false) {
          setAddLinkState(false);
        } else {
          setAddLinkState(true);
        }
      }
      if (entry.target === footerElement) {
        if (entry.isIntersecting === false) {
          setFooterState(false);
        } else {
          setFooterState(true);
        }
      }
    });
  };

  function createObserver() {
    let observer;

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(footerElement);
    observer.observe(AddLinkElement);
  }
  // if (typeof window !== "undefined") {
  //   window.addEventListener(
  //     "load",
  //     (event) => {
  //       if (addLinkRef.current !== null && footerRef.current !== null) {
  //         AddLinkElement = addLinkRef.current;
  //         footerElement = footerRef.current;
  //         createObserver();
  //       }
  //     },
  //     false
  //   );
  // }
  useEffect(() => {
    if (addLinkRef.current !== null && footerRef.current !== null) {
      AddLinkElement = addLinkRef.current;
      footerElement = footerRef.current;
      createObserver();
    }
  }, []);

  useEffect(() => {
    if (addLinkState === false && footerState === false) {
      setAddLinkOn(true);
    } else {
      setAddLinkOn(false);
    }
  }, [addLinkState, footerState]);

  return (
    <>
      <Navbar />
      <div className={styles.addLinkBackground} ref={addLinkRef}>
        <AddLink />
      </div>
      <div className={styles.linkSearchCardList}>
        <LinkSearch setKeywords={setFolderKeywords} />
        <FolderLinkList keywords={Folderkeywords} />
      </div>
      {addLinkOn && (
        <div className={styles.addLinkBackgroundBottom}>
          <AddLink />
        </div>
      )}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}

export default Folder;
