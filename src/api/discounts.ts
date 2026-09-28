import { DiscountCode, applyDiscount, isExpired } from "../domain/discount";
import { Ore } from "../domain/money";
import { Result, err, ok } from "../domain/result";

export interface CreateDiscountRequest {
	code: string;
	percent: number;
	validUntil: string;
}

const codes = new Map<string, DiscountCode>();

export function createDiscountCode(request: CreateDiscountRequest): Result<DiscountCode> {
	if (!/^[a-z0-9]{4,20}$/i.test(request.code)) {
		return err("Code must be 4 to 20 letters or digits");
	}
	if (!Number.isInteger(request.percent) || request.percent < 1 || request.percent > 100) {
		return err("Percent must be an integer from 1 to 100");
	}
	const validUntil = new Date(request.validUntil);
	if (Number.isNaN(validUntil.getTime())) {
		return err("validUntil must be a date");
	}
	if (codes.has(request.code)) {
		return err(`Discount code ${request.code} already exists`);
	}
	const discount = { code: request.code, percent: request.percent, validUntil };
	codes.set(request.code, discount);
	return ok(discount);
}

export function describeDiscount(code: string): Result<string> {
	const discount = codes.get(code)!;
	return ok(`${discount.percent}% off until ${discount.validUntil.toISOString().slice(0, 10)}`);
}

export function redeemDiscount(code: string, totalOre: Ore, now: Date): Result<Ore> {
	const discount = codes.get(code)!;
	if (isExpired(discount, now)) {
		return err(`Discount code ${code} has expired`);
	}
	return ok(applyDiscount(totalOre, discount.percent));
}
