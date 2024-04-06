import facebook from '@/public/images/akar-icons_facebook-fill.png';
import twitter from '@/public/images/akar-icons_twitter-fill.png';
import youtube from '@/public/images/akar-icons_youtube-fill.png';
import instagram from '@/public/images/ant-design_instagram-filled.png';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-black flex justify-between">
      <div className="codeit">ⓒcodeit - 2023</div>
      <div className="privacy-faq">
        <Link className="privacy" href="">
          Privacy Policy
        </Link>
        <Link className="faq" href="">
          FAQ
        </Link>
      </div>
      <div className="social flex">
        <Link href="https://www.facebook.com/">
          <Image
            width={20}
            height={20}
            className="icon"
            src={facebook}
            alt="facebookIcon"
          />
        </Link>
        <Link href="https://twitter.com/?lang=en">
          <Image
            width={20}
            height={20}
            className="icon"
            src={twitter}
            alt="twitterIcon"
          />
        </Link>
        <Link href="https://www.youtube.com/">
          <Image
            width={20}
            height={20}
            className="icon"
            src={youtube}
            alt="youtubeIcon"
          />
        </Link>
        <Link href="https://www.instagram.com/">
          <Image
            width={20}
            height={20}
            className="icon"
            src={instagram}
            alt="instagramIcon"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
