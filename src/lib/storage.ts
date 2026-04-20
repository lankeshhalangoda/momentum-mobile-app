export const ONBOARDING_KEY = "momentum_onboarding_v1";

export function hasCompletedOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(ONBOARDING_KEY) === "1";
}

export function setOnboardingComplete(): void {
  localStorage.setItem(ONBOARDING_KEY, "1");
}
