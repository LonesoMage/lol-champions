export const formatStatValue = (value: number, decimals: number = 0): string => {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
};

export const formatCooldown = (cooldown: number[]): string => {
  if (cooldown.length === 1) return `${cooldown[0]}s`;
  return `${cooldown[0]}-${cooldown[cooldown.length - 1]}s`;
};

export const formatCost = (cost: number[], costType: string): string => {
  if (cost.length === 0 || cost[0] === 0) return 'No Cost';
  if (cost.length === 1) return `${cost[0]} ${costType}`;
  return `${cost[0]}-${cost[cost.length - 1]} ${costType}`;
};

export const cleanHtmlDescription = (description: string): string => {
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};