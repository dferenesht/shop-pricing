import { CartLine, cartTotal } from "../domain/cart";
import { Ore, formatPrice } from "../domain/money";
import { Result, err, ok } from "../domain/result";

export interface CheckoutRequest {
	lines: CartLine[];
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
	const totalOre = cartTotal(request.lines);
	return ok({ totalOre, display: formatPrice(totalOre) });
}
