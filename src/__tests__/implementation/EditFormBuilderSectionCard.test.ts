import { assert, test } from '@sprucelabs/test'
import { interactor } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import EditFormBuilderSectionCardViewController, {
	EditFormBuilderSectionOptions,
	SimpleSection,
} from '../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'

export default class EditFormBuilderSectionCardTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		sectionCard: EditFormBuilderSectionCardViewController,
	}

	@test('first field being select drops in empty choices', 0)
	@test('third field being select drops in empty choices', 2)
	protected static async addingASelectFieldDropsInEmptyChoices(idx: number) {
		let passedValues: any

		//@ts-ignore
		const vc = this.Vc({
			onDone: (values: SimpleSection) => {
				passedValues = values
			},
		})

		vc.addField()
		vc.addField()
		vc.addField()

		const listVc = vc.getFieldListVc()
		await interactor.selectChoiceInRow({
			vc: listVc,
			row: idx,
			newChoice: 'select',
		})

		await interactor.submitForm(vc.getFormVc())

		assert.isEqualDeep(passedValues.fields[idx].options?.choices, [])
	}

	private static Vc(options: EditFormBuilderSectionOptions) {
		return this.Controller(
			//@ts-ignore
			'sectionCard',
			options
		) as EditFormBuilderSectionCardViewController
	}
}
