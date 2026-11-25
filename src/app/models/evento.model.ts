export interface Evento {
  id?: string | number;
  owner_id: string | number;
  artist_ids: string[];
  name: string;
  description: string;
  cover: string;
  genres: string[];
  city: string;
  state: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  price: number;
  ticket_link: string;
}
