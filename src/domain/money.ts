// An amount in öre. Always a non-negative integer, see CLAUDE.md.
export type Ore = number;

export function formatPrice(amount: Ore): string {
	const kronor = Math.floor(amount / 100);
	const ore = amount % 100;
	return `${kronor},${ore.toString().padStart(2, "0")} kr`;
}
