import Profile from './Profile';
import logo from '@/public/images/logo.png';
import { useEffect, useState } from 'react';
import { GetProfile } from '../api';
import Info from './Info.js';
import Image from 'next/image';

function Navbar() {
  const [myProfile, setMyProfile] = useState<Info>({} as Info);

  useEffect(() => {
    const GetMyProfile = async () => {
      const result = await GetProfile();
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
        <Image width={133} height={24} src={logo} alt="logo" />
        <Profile info={myProfile} />
      </nav>
    </header>
  );
}
export default Navbar;
