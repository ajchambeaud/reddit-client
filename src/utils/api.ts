import { Entry, ID } from "../store/entries/types";

interface Response {
  data?: {
    children: EntryResponseData[];
  };
}

interface EntryResponseData {
  data: {
    name: string;
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

  return list.map(item => ({
    id: item.data.name,
    title: item.data.title,
    author: item.data.author,
    created: item.data.created,
    thumbnail: item.data.thumbnail,
    numComments: item.data.num_comments,
    visited: item.data.visited
  }));
}

export async function getEntries(after?: ID, limit = 50): Promise<Entry[]> {
  const url = `https://www.reddit.com/top.json?limit=${limit}${
    after ? `&after=${after}` : ""
  }`;

  const response = await fetch(url);
  const data = await response.json();

  const entries = parseEntries(data);

  return Promise.resolve(entries);
}
