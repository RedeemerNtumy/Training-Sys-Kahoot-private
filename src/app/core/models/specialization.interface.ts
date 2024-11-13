export interface Ispecialization {
  id?: number ;
  name: string;
  description: string;
  prerequisites: string[];
  dateCreated: string;
  traineesCount?: number;
}


interface ContentItem {
  id: number;
  name: string;
  description: string;
  prerequisites: string[];
  createdAt: string;
  // Add additional fields if necessary
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface IContentResponse {
  content: ContentItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

