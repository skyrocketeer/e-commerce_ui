export type Api_Error = {
  statusCode: number;
  error: string;
  message: string;
};

export interface CellFields {
  width?: string | number;
  label: string;
  name: string;
  validation: (value: any) => boolean;
  error: string | null;
  isInputable: boolean;
  type?: string;
}
