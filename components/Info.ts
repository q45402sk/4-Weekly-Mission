import Data from './Data';

export default interface Info {
  id: number | null;
  name: string;
  email: string;
  profileImageSource: string;
  data: Data[];
}
