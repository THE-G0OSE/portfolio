import { ComicColor } from "@/shared/comic";

// mirrors the NestJS api responses

export interface IProfile {
  id: number;
  name: string;
  location: string;
  // 0 shows a placeholder
  age: number;
  yearsInIt: number;
  hatchedYear: string;
  firstCodeYear: string;
  issue: string;
  issueDate: string;
  totalFlock: string;
  // fullscreen hero card, empty string shows a placeholder
  tagline: string;
  bio: string;
  languages: string;
  currently: string;
  hobbies: string;
  // empty string hides the contact button
  email: string;
}

export interface IStackItem {
  id: number;
  name: string;
  level: number;
  order: number;
  categoryId: number;
}

export interface IStackCategory {
  id: number;
  label: string;
  title: string;
  sfx: string;
  part: string;
  color: ComicColor;
  order: number;
  items: IStackItem[];
}

export interface IJob {
  id: number;
  period: string;
  role: string;
  company: string;
  impact: string;
  color: ComicColor;
  order: number;
}

export interface IProject {
  id: number;
  tag: string;
  name: string;
  description: string;
  tech: string[];
  color: ComicColor;
  liveUrl: string | null;
  codeUrl: string | null;
  order: number;
}

export interface ISocial {
  id: number;
  name: string;
  handle: string;
  count: string;
  unit: string;
  href: string;
  color: ComicColor;
  tilt: number;
  order: number;
}

export interface IPortfolio {
  profile: IProfile | null;
  stack: IStackCategory[];
  jobs: IJob[];
  projects: IProject[];
  socials: ISocial[];
}

// request bodies

export type ProfileInput = Omit<IProfile, "id">;
export type StackCategoryInput = Omit<IStackCategory, "id" | "items">;
export type StackItemInput = Omit<IStackItem, "id">;
export type JobInput = Omit<IJob, "id">;
export type ProjectInput = Omit<IProject, "id">;
export type SocialInput = Omit<ISocial, "id">;
