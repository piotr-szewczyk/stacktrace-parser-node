export interface Trace {
  filename?: string;
  function?: string;
  lineNo?: number;
  columnNo?: number;
  internal?: boolean;
  absPath?: string;
  extension?: string;
  preCode?: string[];
  code?: string;
  postCode?: string[];
}

export interface SourceCode {
  code: string;
  preCode: string[];
  postCode: string[];
}

export interface ErrorResponse {
  message: string;
  name: string;
  traces: Trace[];
}
