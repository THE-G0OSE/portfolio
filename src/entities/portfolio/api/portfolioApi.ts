import {
  IJob,
  IPortfolio,
  IProfile,
  IProject,
  ISocial,
  IStackCategory,
  IStackItem,
  JobInput,
  ProfileInput,
  ProjectInput,
  SocialInput,
  StackCategoryInput,
  StackItemInput,
} from "@/entities/portfolio/model/types";
import { apiRequest, createCrudApi } from "@/shared/api";

// browser side, fresh data for the admin panel
export const fetchPortfolio = () => apiRequest<IPortfolio>("/portfolio");

export const profileApi = {
  update: (input: ProfileInput) => apiRequest<IProfile>("/profile", { method: "PUT", body: input }),
};

export const stackCategoryApi = createCrudApi<IStackCategory, StackCategoryInput>("/stack/categories");
export const stackItemApi = createCrudApi<IStackItem, StackItemInput>("/stack/items");
export const jobApi = createCrudApi<IJob, JobInput>("/jobs");
export const projectApi = createCrudApi<IProject, ProjectInput>("/projects");
export const socialApi = createCrudApi<ISocial, SocialInput>("/socials");
