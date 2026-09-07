export type Manager = {
  id: string;
  name: string;
  slug: string | null;
  joined_year: number | null;
  active: boolean;
  bio: string | null;
  created_at?: string;
};

export type Season = {
  id: string;
  year: number;
  champion_id: string | null;
  runner_up_id: string | null;
  regular_season_id: string | null;
  last_place_id: string | null;
  notes: string | null;
  created_at?: string;
};

export type Team = {
  id: string;
  season_id: string;
  manager_id: string;
  team_name: string | null;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  regular_season_rank: number | null;
  playoff_finish: number | null;
  created_at?: string;
};

export type RosterPlayer = {
  id: string;
  team_id: string;
  player_name: string;
  position: string | null;
  nfl_team: string | null;
  slot: string | null;
  sort_order: number;
  created_at?: string;
};

export type LeagueRecord = {
  id: string;
  title: string;
  holder: string | null;
  value: string | null;
  season_year: number | null;
  description: string | null;
  category: string | null;
  sort_order: number;
  created_at?: string;
};

export type SiteContent = {
  key: string;
  title: string;
  body: string | null;
  sort_order: number;
  updated_at?: string;
};

/** A manager's all-time, aggregated career line. */
export type CareerStat = {
  manager: Manager;
  seasons: number;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  championships: number;
  runnerUps: number;
  playoffAppearances: number;
  winPct: number;
};
