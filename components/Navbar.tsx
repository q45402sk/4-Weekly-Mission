import Profile from './Profile';
import logo from '@/public/images/logo.png';
import { useEffect, useState } from 'react';
import { getProfile } from '../api';
import Info from './Info.js';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';

function Navbar() {
  const [myProfile, setMyProfile] = useState<Info>({} as Info);
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const GetMyProfile = async () => {
      const result = await getProfile();
      setMyProfile(result);
    };

    try {
      GetMyProfile();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <header>
      <nav>
        <button className={styles.logoButton} onClick={handleLogoClick}>
          <Image
            width={133}
            height={24}
            src={logo}
            alt="logo"
            priority={true}
          />
        </button>
        <Profile info={myProfile} />
      </nav>
    </header>
  );
}
export default Navbar;
