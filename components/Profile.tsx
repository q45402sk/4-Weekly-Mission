import Image from 'next/image';
import Info from './Info';

function Profile({ info }: { info: Info }) {
  if (Object.keys(info).length === 0) {
    return <button className="btn cta">로그인</button>;
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
