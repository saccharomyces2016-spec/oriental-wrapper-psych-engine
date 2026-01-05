import { ILlmProvider } from "../../ports/ILlmProvider";
import { IPromptBuilder } from "../../ports/IPromptBuilder";

export class NarrativeService {
  constructor(
    private readonly promptBuilder: IPromptBuilder,
    private readonly llmProvider: ILlmProvider
  ) {}

  async generate(context: any): Promise<string> {
    throw new Error("Not implemented");
  }
}
