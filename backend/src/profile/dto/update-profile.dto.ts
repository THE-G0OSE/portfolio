import {
  IsEmail,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  location: string;

  // 0 shows a placeholder on the site
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsInt()
  @Min(0)
  @Max(100)
  yearsInIt: number;

  @IsString()
  @MaxLength(20)
  hatchedYear: string;

  @IsString()
  @MaxLength(20)
  firstCodeYear: string;

  @IsString()
  @MaxLength(30)
  issue: string;

  @IsString()
  @MaxLength(30)
  issueDate: string;

  @IsString()
  @MaxLength(20)
  totalFlock: string;

  // short punchy line in the speech bubble
  @IsString()
  @MaxLength(120)
  tagline: string;

  @IsString()
  @MaxLength(1000)
  bio: string;

  @IsString()
  @MaxLength(100)
  languages: string;

  // current role or "open to work"
  @IsString()
  @MaxLength(100)
  currently: string;

  @IsString()
  @MaxLength(150)
  hobbies: string;

  // empty string = no contact button
  @IsString()
  @MaxLength(100)
  @ValidateIf((_, value) => value !== '')
  @IsEmail()
  email: string;
}
