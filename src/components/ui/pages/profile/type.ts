import { ChangeEvent, SyntheticEvent } from 'react';

export interface ProfileUIProps {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  errorText?: string;
  successText?: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleCancel: (e: React.SyntheticEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
