export interface Artista {
  id?: string | number;
  user_id: string | number;
  stage_name: string;
  bio: string;
  photo: string;
  city: string;
  state: string;
  genres: string[];
  spotify: string;
  instagram: string;
  likes: number;
}
