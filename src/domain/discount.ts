import { Ore } from "./money";

export interface DiscountCode {
	code: string;
	percent: number;
	validUntil: Date;
}

export function isExpired(discount: DiscountCode, now: Date): boolean {
	return now > discount.validUntil;
}

export function applyDiscount(totalOre: Ore, percent: number): Ore {
	return totalOre - Math.floor((totalOre * percent) / 100);
}
