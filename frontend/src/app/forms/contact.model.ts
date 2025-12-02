export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  groupId: number;

  group?: {
    id: number;
    name: string;
  };
}
