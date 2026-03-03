export function isRequirementMet(state, requirement) {
  if (!requirement) {
    return true;
  }

  switch (requirement.type) {
    case 'progress':
      return state.progress?.[requirement.key] === requirement.equals;
    case 'clue':
      return Boolean(state.clues?.[requirement.key]);
    case 'inventory_contains':
      return state.player?.inventory?.includes(requirement.itemId) ?? false;
    default:
      return true;
  }
}

export function areRequirementsMet(state, requirements = []) {
  return requirements.every((requirement) => isRequirementMet(state, requirement));
}
