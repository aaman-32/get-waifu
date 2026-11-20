export interface imageMetadata {
  id: number;
  hash: number;
  extension: '.png' | '.jpg' | '.webp'
  tags: {
    id: number;
    name: string;
    description: string;
  }[];
  nsfw: boolean;
  uploaded: Date;
  width: number;
  height: number;
  preview: string;
  url: string;
  size: number;
  animated: boolean;
}

export interface responseData {
  query: string | null;
  filters: {
    query: string | number | null;
    includedTags: string[] | null;
    excludedTags: string[] | null;
    nsfw: boolean;
  }
  items: imageMetadata[];
  count: number;
}