export interface Usuario {
  id?: string | number;
  username: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  fav_genres: string[];
  artists_liked: string[];
}
