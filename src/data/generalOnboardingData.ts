import focusDefaultVisual from "../assets/packaged-onboarding/focus-default.png";
import focusSalesVisual from "../assets/packaged-onboarding/focus-sales.png";
import focusPeopleVisual from "../assets/packaged-onboarding/focus-people.png";
import solutionTrackTasksImage from "../assets/packaged-onboarding/solution-track-tasks.png";
import solutionProjectOnTrackImage from "../assets/packaged-onboarding/solution-project-on-track.png";
import solutionDependenciesTimelinesImage from "../assets/packaged-onboarding/solution-dependencies-timelines.png";
import type { AgentFlowId } from "./agentFlows";

export interface GeneralFocusOption {
  id: string;
  title: string;
  description: string;
  fullWidth?: boolean;
}

export interface GeneralSolutionTag {
  label: string;
  withAi?: boolean;
}

export interface GeneralSolutionCard {
  id: string;
  title: string;
  tags: readonly GeneralSolutionTag[];
  summary: string;
  image: string;
  agentName: string;
  agentRole: string;
  description: string;
  flowId: AgentFlowId;
}

export const GENERAL_DEFAULT_FOCUS_ID = "people";
export const GENERAL_SCRATCH_FOCUS_ID = "scratch";
/** @deprecated Use GENERAL_SCRATCH_FOCUS_ID */
export const GENERAL_OTHER_FOCUS_ID = GENERAL_SCRATCH_FOCUS_ID;
export const GENERAL_PROJECTS_FOCUS_ID = "projects";

export function skipsGeneralSolutionSelection(focusId: string): boolean {
  return focusId === GENERAL_SCRATCH_FOCUS_ID;
}

/** @deprecated Use skipsGeneralSolutionSelection */
export function skipsGeneralAgentSelection(focusId: string): boolean {
  return skipsGeneralSolutionSelection(focusId);
}

export function startsProjectsAgentChat(_focusId: string): boolean {
  return false;
}

export const GENERAL_FOCUS_OPTIONS: readonly GeneralFocusOption[] = [
  {
    id: "projects",
    title: "Projects & delivery",
    description: "Timelines, tasks, team coordination",
  },
  {
    id: "sales",
    title: "Sales & CRM",
    description: "Leads, deals, customer relationships",
  },
  {
    id: "people",
    title: "People & recruiting",
    description: "Hiring, onboarding, HR processes",
  },
  {
    id: "marketing",
    title: "Marketing & content",
    description: "Campaigns, launches, creative work",
  },
  {
    id: "dev",
    title: "Dev & product",
    description: "Sprints, bugs, roadmap planning",
  },
  {
    id: "ops",
    title: "Ops & finance",
    description: "Processes, budgets, reporting",
  },
  {
    id: "design",
    title: "Design & Creative",
    description: "Projects, feedback, delivery",
  },
  {
    id: "it",
    title: "IT",
    description: "Requests, assets, incidents",
  },
  {
    id: "construction",
    title: "Construction",
    description: "Jobsites, bids, punch lists",
  },
  {
    id: GENERAL_SCRATCH_FOCUS_ID,
    title: "Other",
    description: "",
  },
];

export const HR_SOLUTION_CARDS: readonly GeneralSolutionCard[] = [
  {
    id: "track-teams-tasks",
    title: "Track teams tasks",
    tags: [
      { label: "Board with sample tasks" },
      { label: "Clear ownership" },
      { label: "Track status" },
      { label: "Priority rating" },
      { label: "AI Task Summary", withAi: true },
      { label: "AI Risk Level", withAi: true },
    ],
    summary:
      "A board built around your team's workflow, with tasks organised by stage, owner, and priority. Automations move items forward as work progresses, and AI keeps you updated with task summaries and risk scores.",
    image: solutionTrackTasksImage,
    agentName: "Liam",
    agentRole: "Project Manager",
    description:
      "Sets up a board around your team's workflow so tasks stay organized by stage, owner, and priority.",
    flowId: "jade",
  },
  {
    id: "project-on-track",
    title: "Keep every project on track",
    tags: [
      { label: "Task breakdown" },
      { label: "Effort tracking" },
      { label: "Dependency tracking" },
      { label: "Priority rating" },
      { label: "AI Task Summary", withAi: true },
      { label: "AI Risk Level", withAi: true },
    ],
    summary:
      "A board built for running one project end-to-end, with tasks organized by phase, owner, and priority, and broken into subtasks. Automations track completion and flag missed deadlines, and AI keeps you updated with activity summaries and risk scores.",
    image: solutionProjectOnTrackImage,
    agentName: "Dave",
    agentRole: "Project Risk Analyzer",
    description:
      "Sets up an end-to-end project board with phases, owners, priorities, and subtasks.",
    flowId: "jade",
  },
  {
    id: "dependencies-and-timelines",
    title: "Map dependencies and timelines",
    tags: [
      { label: "Phase-based planning" },
      { label: "Dependency mapping" },
      { label: "Effort estimates" },
      { label: "Project brief" },
      { label: "Progress tracking" },
      { label: "AI Dependency Suggestion", withAi: true },
    ],
    summary:
      "A board built for planning work before it starts, with tasks organized by phase, dependency, and effort estimate. Automations flag work as soon as it's unblocked and roll up progress automatically, and AI suggests how your tasks depend on each other.",
    image: solutionDependenciesTimelinesImage,
    agentName: "Blake",
    agentRole: "Roadmap Builder",
    description:
      "Sets up a roadmap board organized by phase, dependencies, and effort estimates.",
    flowId: "jade",
  },
];

export function getFocusLabel(focusId: string): string {
  return (
    GENERAL_FOCUS_OPTIONS.find((option) => option.id === focusId)?.title ??
    "People & recruiting"
  );
}

export function getFocusVisualSrc(focusId: string): string {
  if (focusId === "sales") return focusSalesVisual;
  if (focusId === "people") return focusPeopleVisual;
  return focusDefaultVisual;
}

export function getSolutionCardsForFocus(
  _focusId: string,
): readonly GeneralSolutionCard[] {
  return HR_SOLUTION_CARDS;
}

/** @deprecated Use getSolutionCardsForFocus */
export function getAgentCardsForFocus(focusId: string) {
  return getSolutionCardsForFocus(focusId);
}

/** Compatibility alias while the selection page is being rewritten. */
export type GeneralAgentCard = GeneralSolutionCard;
