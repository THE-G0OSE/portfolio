import { IProfile } from "@/entities/portfolio/model/types";

// shown when the database has no profile yet
export const EMPTY_PROFILE: IProfile = {
  id: 1,
  name: "[YOUR NAME]",
  location: "[CITY, COUNTRY]",
  age: 0,
  yearsInIt: 0,
  hatchedYear: "[YEAR]",
  firstCodeYear: "[YEAR]",
  issue: "Nº 01",
  issueDate: "[MONTH YEAR]",
  totalFlock: "[N]",
  tagline: "",
  bio: "",
  languages: "",
  currently: "",
  hobbies: "",
  email: "",
};
