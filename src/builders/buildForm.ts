import { Schema } from '@sprucelabs/schema'
import { FormViewControllerOptions } from '../viewControllers/form/Form.vc'

type Form<S extends Schema> = FormViewControllerOptions<S>

export default function buildForm<S extends Schema>(form: Form<S>) {
	return form as unknown as Form<S>
}
