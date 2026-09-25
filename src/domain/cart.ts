import { Ore } from "./money";

export interface CartLine {
	sku: string;
	unitPriceOre: Ore;
	quantity: number;
}

export function cartTotal(lines: CartLine[]): Ore {
	let total = 0;
	for (const line of lines) {
		total += line.unitPriceOre * line.quantity;
	}
	return total;
}
