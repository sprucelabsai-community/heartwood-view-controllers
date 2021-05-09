import { Schema } from '@sprucelabs/schema'
import { BigFormViewControllerOptions } from '../viewControllers/BigForm.vc'

type BigForm<S extends Schema> = BigFormViewControllerOptions<S>

export default function buildBigForm<S extends Schema>(form: BigForm<S>) {
	return form as unknown as BigForm<Schema>
}
