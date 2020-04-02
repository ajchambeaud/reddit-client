import data from "./top.json";
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

export function getEntries(): Promise<Entry[]> {
  const entries = parseEntries(data);

  return Promise.resolve(entries);
}
