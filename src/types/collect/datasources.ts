import { RefSiteIF } from "../refExercise/config";

interface DataSourceIF {
  id: string;
  name: string;
  code: string;
  sites: RefSiteIF[];
}

interface DataVersionIF {
  id: string;
  version: string | null;
  path: string;
  name: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  site: RefSiteIF;
}


export type {
  DataSourceIF,
  DataVersionIF
}