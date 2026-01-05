export interface ILlmProvider {
  generateNarrative(prompt: string): Promise<string>;
}
