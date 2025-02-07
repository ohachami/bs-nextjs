import { RefSbu, RefSiteIF } from "../refExercise/config";

interface DataSourceIF {
  id: string;
  type: string;
  name: string;
  code: string;
  sbu: RefSbu;
  site: RefSiteIF;
}

export type {
  DataSourceIF
}