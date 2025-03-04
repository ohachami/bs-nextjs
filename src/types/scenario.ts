export type Scenario = {
  creator: string;
  creationDate: Date;
  name: string;
  type: number;
  published: boolean;
  topList: { key: string; value: string }[];
  bottomList: { key: string; value: number }[];
  likes: number;
  dislikes: number;
  comments: number;
  liked: boolean;
  disliked: boolean;
  id: string
};
