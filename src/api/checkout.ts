import { CartLine, cartTotal } from "../domain/cart";
import { Ore, formatPrice } from "../domain/money";
import { Result, err, ok } from "../domain/result";
import { redeemDiscount } from "./discounts";

export interface CheckoutRequest {
	lines: CartLine[];
	discountCode?: string;
}

export interface CheckoutResponse {
	totalOre: Ore;
	display: string;
}

export function checkout(request: CheckoutRequest): Result<CheckoutResponse> {
	for (const line of request.lines) {
		if (!Number.isInteger(line.unitPriceOre) || line.unitPriceOre < 0) {
			return err(`Invalid price for ${line.sku}`);
		}
		if (!Number.isInteger(line.quantity) || line.quantity < 1) {
			return err(`Invalid quantity for ${line.sku}`);
		}
	}
	let totalOre = cartTotal(request.lines);
	if (request.discountCode !== undefined) {
		const discounted = redeemDiscount(request.discountCode, totalOre, new Date());
		if (!discounted.ok) {
			return err(discounted.error);
		}
		totalOre = discounted.value;
	}
	return ok({ totalOre, display: formatPrice(totalOre) });
}
