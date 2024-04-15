import Image from 'next/image';
import Info from './Info';
import Link from 'next/link';

interface ProfileInfo {
  info: Info;
}

function Profile({ info }: ProfileInfo) {
  if (
    info === undefined ||
    info.data === null ||
    Object.keys(info).length === 0
  ) {
    return (
      <Link href="/signin" className="cta btn">
        로그인
      </Link>
    );
  }

  return (
    <div className="profile">
      <Image
        width={10}
        height={10}
        className="profile-img"
        src={info.data[0].image_source}
        alt="profileImage"
      />
      <div className="profile-email">{info.data[0].email}</div>
    </div>
  );
}

export default Profile;
