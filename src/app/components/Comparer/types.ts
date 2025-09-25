export interface RecommendationResult {
  recommended: string;
  rationale: string;
  ranking: { title: string; score: number }[];
}
