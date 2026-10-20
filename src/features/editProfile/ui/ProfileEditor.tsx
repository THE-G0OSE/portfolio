"use client";

import { IProfile, ProfileInput, profileApi } from "@/entities/portfolio";
import { IFieldConfig, RecordForm } from "@/shared/form";

interface IProps {
  profile: IProfile;
  onChange: () => void;
}

const FIELDS: IFieldConfig<ProfileInput>[] = [
  { key: "name", label: "Name" },
  { key: "location", label: "Location" },
  { key: "age", label: "Age (0 = placeholder)", type: "number", min: 0, max: 150 },
  { key: "yearsInIt", label: "Years in IT (0 = placeholder)", type: "number", min: 0, max: 100 },
  { key: "hatchedYear", label: "Hatched (birth year)" },
  { key: "firstCodeYear", label: "First code year" },
  { key: "issue", label: "Issue Nº" },
  { key: "issueDate", label: "Issue date" },
  { key: "totalFlock", label: "Total followers" },
  { key: "languages", label: "Speaks", placeholder: "English, Russian" },
  { key: "currently", label: "Currently", placeholder: "Open to work" },
  { key: "hobbies", label: "Off-duty (hobbies)" },
  { key: "email", label: "Contact email", placeholder: "empty = no button" },
  { key: "tagline", label: "Tagline (speech bubble)", wide: true },
  { key: "bio", label: "Bio (2–3 sentences)", type: "textarea", wide: true },
];

// only editable fields, api rejects unknown ones (e.g. updatedAt)
const toInput = (profile: IProfile): ProfileInput => ({
  name: profile.name,
  location: profile.location,
  age: profile.age,
  yearsInIt: profile.yearsInIt,
  hatchedYear: profile.hatchedYear,
  firstCodeYear: profile.firstCodeYear,
  issue: profile.issue,
  issueDate: profile.issueDate,
  totalFlock: profile.totalFlock,
  tagline: profile.tagline,
  bio: profile.bio,
  languages: profile.languages,
  currently: profile.currently,
  hobbies: profile.hobbies,
  email: profile.email,
});

export const ProfileEditor: React.FC<IProps> = ({ profile, onChange }) => {
  return (
    <RecordForm
      title="HERO PROFILE"
      initialValues={toInput(profile)}
      fields={FIELDS}
      onSubmit={async (values) => {
        await profileApi.update(values);
        onChange();
      }}
    />
  );
};
