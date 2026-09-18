import type { Opportunity, LocationType, CommitmentType } from '@/types/database.types';

export type MatchPreferences = {
  interests: string[]; // category slugs, e.g. ['animals', 'education']
  preferredLocationType: LocationType | 'no_preference';
  preferredCommitmentType: CommitmentType | 'no_preference';
};

export type ScoredOpportunity = {
  opportunity: Opportunity;
  score: number; // 0-100
  reasons: string[];
};

const WEIGHTS = {
  cause: 50,
  location: 25,
  commitment: 25,
};

const BASELINE = 10; // nothing shows up as a 0% match

export function scoreOpportunity(
  prefs: MatchPreferences,
  opportunity: Opportunity
): ScoredOpportunity {
  let score = BASELINE;
  const reasons: string[] = [];

  const causeMatch = opportunity.categories?.some((c) => prefs.interests.includes(c.slug));
  if (causeMatch) {
    score += WEIGHTS.cause;
    const matched = opportunity.categories?.find((c) => prefs.interests.includes(c.slug));
    if (matched) reasons.push(`Matches your interest in ${matched.name}`);
  }

  if (prefs.preferredLocationType !== 'no_preference') {
    if (opportunity.location_type === prefs.preferredLocationType) {
      score += WEIGHTS.location;
      reasons.push(
        opportunity.location_type === 'virtual' ? 'Virtual, like you prefer' : 'In-person, like you prefer'
      );
    } else if (opportunity.location_type === 'hybrid') {
      score += WEIGHTS.location * 0.6;
      reasons.push('Flexible (hybrid) format');
    }
  }

  if (prefs.preferredCommitmentType !== 'no_preference') {
    if (opportunity.commitment_type === prefs.preferredCommitmentType) {
      score += WEIGHTS.commitment;
      reasons.push(
        opportunity.commitment_type === 'one_time' ? 'A one-time commitment' : 'An ongoing role'
      );
    }
  }

  return { opportunity, score: Math.min(100, Math.round(score)), reasons };
}

export function getRecommended(
  prefs: MatchPreferences,
  opportunities: Opportunity[],
  limit = 3
): ScoredOpportunity[] {
  return opportunities
    .filter((o) => o.status === 'verified')
    .map((o) => scoreOpportunity(prefs, o))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
