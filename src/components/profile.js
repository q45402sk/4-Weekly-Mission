function Profile({ info }) {
  if (Object.keys(info).length === 0) {
    return <button className="btn cta">로그인</button>;
  }

  return (
    <div className="profile">
      <img className="profile-img" src={info.data[0].image_source} />
      <div className="profile-email">{info.data[0].email}</div>
    </div>
  );
}

export default Profile;
