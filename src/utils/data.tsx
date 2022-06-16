import { FaFilm, FaQq, FaSmileWink } from 'react-icons/fa';
import { GiAngelOutfit } from 'react-icons/gi';
import { IoGameController, IoMusicalNote } from 'react-icons/io5';
import { MdEmojiNature } from 'react-icons/md';

export interface ICategory {
  id: number;
  name: string;
  iconSrc: React.ReactNode;
}

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'Games',
    iconSrc: <IoGameController fontSize={30} />,
  },
  {
    id: 2,
    name: 'Funny',
    iconSrc: <FaSmileWink fontSize={30} />,
  },
  {
    id: 3,
    name: 'Stories',
    iconSrc: <FaQq fontSize={30} />,
  },
  {
    id: 4,
    name: 'Movies',
    iconSrc: <FaFilm fontSize={30} />,
  },
  {
    id: 5,
    name: 'Anime',
    iconSrc: <GiAngelOutfit fontSize={30} />,
  },
  {
    id: 6,
    name: 'Music',
    iconSrc: <IoMusicalNote fontSize={30} />,
  },
  {
    id: 7,
    name: 'Nature',
    iconSrc: <MdEmojiNature fontSize={30} />,
  },
];
