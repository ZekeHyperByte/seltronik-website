export interface Certificate {
  id?: number;
  name: string;
  category: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  certificate_url: string;
  image_url: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}