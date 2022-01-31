import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import talkingSprucebotSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/talkingSprucebot.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import TalkingSprucebotViewController from '../../../viewControllers/TalkingSprucebot.vc'

export default class ControllingATalkingSprucebotTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static mustPassAtLeastOneSentence() {
		const err = assert.doesThrow(() =>
			this.Controller('talkingSprucebot', {
				sentences: [],
			})
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['sentences'],
		})

		//@ts-ignore
		assert.doesThrow(() => this.Controller('talkingSprucebot', {}))
	}

	@test()
	protected static passesThroughAllOptionsToModel() {
		const key = `${Math.random()}`

		const vc = this.Controller('talkingSprucebot', {
			sentences: [{ words: 'yay' }],
			[key]: true,
		})

		const model = this.render(vc)

		//@ts-ignore
		assert.isTrue(model[key])
	}

	@test()
	protected static canCreateControllingATalkingSprucebot() {
		const vc = this.TalkingSprucebot()
		const model = this.render(vc)

		//@ts-ignore
		assert.isTrue(model.controller instanceof TalkingSprucebotViewController)

		//@ts-ignore
		delete model.controller

		validateSchemaValues(talkingSprucebotSchema, model)
	}

	@test()
	protected static async playPauseRestartInvokeHandlers() {
		const vc = this.TalkingSprucebot()

		//@ts-ignore
		assert.isFunction(vc.playHandler)
		//@ts-ignore
		assert.isFunction(vc.pauseHandler)
		//@ts-ignore
		assert.isFunction(vc.restartHandler)

		let wasPlayHit = false

		//@ts-ignore
		vc.playHandler = () => {
			wasPlayHit = true
		}

		void vc.play()

		await this.wait(0)

		assert.isTrue(wasPlayHit)

		let wasPauseHit = false

		//@ts-ignore
		vc.pauseHandler = () => {
			wasPauseHit = true
		}

		void vc.pause()

		await this.wait(0)

		assert.isTrue(wasPauseHit)

		let wasRestartHit = false

		//@ts-ignore
		vc.restartHandler = () => {
			wasRestartHit = true
		}

		void vc.restart()

		await this.wait(0)

		assert.isTrue(wasRestartHit)
	}

	@test()
	protected static onCompleteCalledWhenOnCompleteIsInvoked() {
		let wasHit = false

		const sprucebot = this.Controller('talkingSprucebot', {
			onComplete: () => {
				wasHit = true
			},
			sentences: [
				{
					words: 'how in the world are you?',
				},
			],
		})

		//@ts-ignore
		sprucebot.triggerComplete()

		assert.isTrue(wasHit)
	}

	@test()
	protected static async playHoldsUntilTriggerComplete() {
		const sprucebot = this.Controller('talkingSprucebot', {
			sentences: [
				{
					words: 'how in the world are you?',
				},
			],
		})

		const promise = sprucebot.play()

		let wasHit = false
		const timeout = setTimeout(() => {
			wasHit = true

			//@ts-ignore
			sprucebot.triggerComplete()
		}, 100)

		await promise

		clearTimeout(timeout)

		assert.isTrue(wasHit)
	}

	@test()
	protected static defaultSizeIsMedium() {
		const model = this.render(this.TalkingSprucebot())
		assert.isEqual(model.size, 'medium')
	}

	@test()
	protected static canSetSize() {
		const vc = this.Controller('talkingSprucebot', {
			size: 'small',
			sentences: [
				{
					words: 'how in the world are you?',
				},
			],
		})
		const model = this.render(vc)
		assert.isEqual(model.size, 'small')
	}

	@test()
	protected static defaultAvatarChilling() {
		const model = this.render(this.TalkingSprucebot())
		assert.isEqualDeep(model.avatar, {
			stateOfMind: 'chill',
		})
	}

	@test()
	protected static canSetAvatar() {
		const vc = this.Controller('talkingSprucebot', {
			size: 'small',
			avatar: {
				size: 'large',
				stateOfMind: 'accomplished',
			},
			sentences: [
				{
					words: 'how in the world are you?',
				},
			],
		})
		const model = this.render(vc)
		assert.isEqualDeep(model.avatar, {
			size: 'large',
			stateOfMind: 'accomplished',
		})
	}

	private static TalkingSprucebot() {
		return this.Controller('talkingSprucebot', {
			sentences: [
				{
					words: 'how in the world are you?',
				},
			],
		})
	}
}
