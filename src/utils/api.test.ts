import { getEntries, parseEntries } from "./api";
import mockedResponse from "./top.json";

test("parseEntries() should parse response data", () => {
  const parsed = parseEntries(mockedResponse);
  const expected = [
    {
      title: "Man trying to return a dog's toy gets tricked into playing fetch",
      author: "washedupwornout",
      created: 1411975314,
      thumbnail:
        "http://b.thumbs.redditmedia.com/9N1f7UGKM5fPZydrsgbb4_SUyyLW7A27um1VOygY3LM.jpg",
      numComments: 958,
      visited: false
    }
  ];
  expect(parsed).toEqual(expect.arrayContaining(expected));
});
