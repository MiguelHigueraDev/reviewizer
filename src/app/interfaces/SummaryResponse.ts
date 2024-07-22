// This represents the parsed JSON object that the AI model generates
export interface SummaryResponse {
  title: string;
  summary: string;
  positive: string[];
  negative: string[];
  error?: Error;
}
