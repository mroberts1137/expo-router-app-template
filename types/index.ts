export interface SGFProblem {
  id: string;
  filename: string;
  category?: string;
  sgfContent?: string;
  difficulty?: string;
  description?: string;
  // Add other metadata as needed
}
