import { ReadingFlow } from "../src/application/flows/ReadingFlow";
import { ReadingFacade } from "../src/domain/services/ReadingFacade";
import { NarrativeService } from "../src/domain/services/NarrativeService";
import type { IPromptBuilder } from "../src/ports/IPromptBuilder";
import type { ILlmProvider } from "../src/ports/ILlmProvider";
import round1Domains from "@packages/data/ontology/round1Domains.v1.json" assert { type: "json" };

// Simple stubs to keep smoke runnable without pulling legacy logic.
class SmokeReadingFacade extends ReadingFacade {
  calculate(input: any): any {
    return {
      input,
      scores: {
        fire: 42,
        water: 58
      }
    };
  }
}

class SmokePromptBuilder implements IPromptBuilder {
  buildPrompt(): string {
    return "smoke_prompt";
  }
}

class SmokeLlmProvider implements ILlmProvider {
  async generateNarrative(prompt: string): Promise<string> {
    return `smoke_narrative:${prompt}`;
  }
}

class SmokeNarrativeService extends NarrativeService {
  constructor() {
    super(new SmokePromptBuilder(), new SmokeLlmProvider());
  }

  async generate(context: any): Promise<string> {
    return `narrative_for_${context?.input?.choices?.q1_domain ?? "unknown"}`;
  }
}

async function main() {
  const input = {
    userProfile: { birthYear: 1990, gender: "male" as const },
    choices: { q1_domain: "career" }
  };

  const flow = new ReadingFlow(
    new SmokeReadingFacade(),
    new SmokeNarrativeService()
  );
  const result = await flow.run(input);

  const domainKeys = Object.keys(round1Domains ?? {});
  const preview = {
    domainKeysCount: domainKeys.length,
    firstDomainKey: domainKeys[0] ?? null
  };

  const out = {
    status: "success",
    preview,
    result
  };

  console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error("smoke_reading failed:", err);
  process.exit(1);
});
