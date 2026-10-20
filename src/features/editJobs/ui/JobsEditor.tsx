"use client";

import { IJob, JobInput, jobApi } from "@/entities/portfolio";
import { IFieldConfig, ListEditor } from "@/shared/form";

interface IProps {
  jobs: IJob[];
  onChange: () => void;
}

const FIELDS: IFieldConfig<JobInput>[] = [
  { key: "period", label: "Period", placeholder: "2021–NOW" },
  { key: "role", label: "Role" },
  { key: "company", label: "Company" },
  { key: "color", label: "Badge color", type: "color" },
  { key: "order", label: "Order", type: "number", min: 0 },
  { key: "impact", label: "Impact (one line)", type: "textarea", wide: true },
];

const toInput = ({ period, role, company, impact, color, order }: IJob): JobInput => ({
  period,
  role,
  company,
  impact,
  color,
  order,
});

export const JobsEditor: React.FC<IProps> = ({ jobs, onChange }) => {
  return (
    <ListEditor
      items={jobs}
      fields={FIELDS}
      toInput={toInput}
      emptyInput={{ period: "", role: "", company: "", impact: "", color: "RED", order: jobs.length }}
      getTitle={({ role, company }) => [role, company].filter(Boolean).join(" @ ") || "Job"}
      addLabel="JOB"
      onCreate={jobApi.create}
      onUpdate={jobApi.update}
      onDelete={jobApi.remove}
      onChange={onChange}
    />
  );
};
