import { Entry } from "../store/entries/types";

interface Response {
  data?: {
    children: EntryResponseData[];
  };
}

interface EntryResponseData {
  data: {
    title: string;
    author: string;
    created: number;
    thumbnail: string;
    num_comments: number;
    visited: boolean;
  };
}

export function parseEntries(data: Response): Entry[] {
  const list = data?.data?.children || [];
  const keys = [
    "title",
    "author",
    "created",
    "thumbnail",
    "num_comments",
    "visited"
  ];

  return list.map(item => ({
    title: item.data.title,
    author: item.data.author,
    created: item.data.created,
    thumbnail: item.data.thumbnail,
    numComments: item.data.num_comments,
    visited: item.data.visited
  }));
}

export async function getEntries(): Promise<Entry[]> {
  const response = await fetch("https://www.reddit.com/top.json");
  const data = await response.json();

  const entries = parseEntries(data);

  return Promise.resolve(entries);
}
