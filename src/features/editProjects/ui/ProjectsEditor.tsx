"use client";

import { IProject, ProjectInput, projectApi } from "@/entities/portfolio";
import { IFieldConfig, ListEditor } from "@/shared/form";

interface IProps {
  projects: IProject[];
  onChange: () => void;
}

const FIELDS: IFieldConfig<ProjectInput>[] = [
  { key: "name", label: "Name" },
  { key: "tag", label: "Tag", placeholder: "Latest release" },
  { key: "color", label: "Screenshot color", type: "color" },
  { key: "order", label: "Order", type: "number", min: 0 },
  { key: "liveUrl", label: "Live url", placeholder: "https://…" },
  { key: "codeUrl", label: "Code url", placeholder: "https://github.com/…" },
  { key: "tech", label: "Tech", type: "tags", wide: true },
  { key: "description", label: "Description", type: "textarea", wide: true },
];

const toInput = ({ tag, name, description, tech, color, liveUrl, codeUrl, order }: IProject): ProjectInput => ({
  tag,
  name,
  description,
  tech,
  color,
  liveUrl,
  codeUrl,
  order,
});

export const ProjectsEditor: React.FC<IProps> = ({ projects, onChange }) => {
  return (
    <ListEditor
      items={projects}
      fields={FIELDS}
      toInput={toInput}
      emptyInput={{
        tag: "",
        name: "",
        description: "",
        tech: [],
        color: "YELLOW",
        liveUrl: null,
        codeUrl: null,
        order: projects.length,
      }}
      getTitle={({ name }) => name || "Project"}
      addLabel="PROJECT"
      onCreate={projectApi.create}
      onUpdate={projectApi.update}
      onDelete={projectApi.remove}
      onChange={onChange}
    />
  );
};
