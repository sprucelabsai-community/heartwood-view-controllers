import { buildSchema } from '@sprucelabs/schema'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { FormViewController } from '../../../types/heartwood.types'

export default class ControllingFormFooterTest extends AbstractViewControllerTest {
	@test()
	protected static async canSetFooterRenderer() {
		const vc = this.Vc()
		let wasHit = false

		vc.setTriggerRenderForFooter(() => {
			wasHit = true
		})

		assert.isFalse(wasHit)
		await vc.setValue('firstName', generateId())
		assert.isTrue(wasHit)
	}

	private static Vc(): FormViewController<FormSchema> {
		return this.Controller(
			'form',
			buildForm({
				schema: formSchema,
				sections: [
					{
						id: generateId(),
					},
					{
						id: generateId(),
					},
				],
			})
		)
	}
}

const formSchema = buildSchema({
	id: 'schema',
	fields: {
		firstName: {
			type: 'text',
		},
		lastName: {
			type: 'text',
		},
	},
})

type FormSchema = typeof formSchema
