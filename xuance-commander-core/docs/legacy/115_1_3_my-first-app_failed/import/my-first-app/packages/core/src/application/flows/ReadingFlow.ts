import { ReadingFacade } from "../../domain/services/ReadingFacade";
import { NarrativeService } from "../../domain/services/NarrativeService";

export class ReadingFlow {
  constructor(
    private readonly readingFacade: ReadingFacade,
    private readonly narrativeService: NarrativeService
  ) {}

  async run(input: any): Promise<any> {
    const readingResult = this.readingFacade.calculate(input);
    const narrative = await this.narrativeService.generate({
      input,
      readingResult
    });

    return {
      readingResult,
      narrative
    };
  }
}
