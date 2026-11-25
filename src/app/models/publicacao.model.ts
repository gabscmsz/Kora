export interface Publicacao {
  id?: string | number;
  artist_id: string | number;
  title: string;
  text: string;
  image: string[];
  date: string;
  time: string;
  likes: number;
}
