import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	Router,
	SkillViewControllerLoadOptions,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractSkillViewController from './Abstract.svc'
import CardViewController from './Card.vc'
import LoginViewController from './Login.vc'

const randomUtil = {
	rand(possibilities: any[]) {
		const idx = Math.round(Math.random() * (possibilities.length - 1))
		return possibilities[idx]
	},
}

export default class DashboardSkillViewController extends AbstractSkillViewController {
	public id = 'dashboad'
	private introCardVc: CardViewController
	private loginVc: LoginViewController
	private legalSpeakCardVc: CardViewController
	private qotdVc: CardViewController
	private router!: Router
	private isLoggedIn = false

	public constructor(options: ViewControllerOptions) {
		super(options)

		this.loginVc = this.vcFactory.Controller('login', {
			onLogin: this.handleLogin.bind(this),
		})
		this.introCardVc = this.vcFactory.Controller('card', {
			header: {
				image: 'images/mountains-logo.jpg',
				title: 'Your dashboard',
				subtitle: 'You can do ever more after you log in!',
			},
		})
		this.legalSpeakCardVc = this.vcFactory.Controller('card', {
			body: {
				sections: [
					{
						text: {
							content:
								'Sprucebot here! 🌲🤖  The idea of data collection is creepy enough without having to worry about what a corporation is doing with it...',
						},
					},
				],
			},
			footer: {
				buttons: [
					{
						label: 'Tell me more please!',
						onClick: () => {
							this.renderInDialog({
								header: {
									title: 'Terms of Service',
									subtitle: `& Privacy Policy`,
								},
								body: {
									shouldShowSectionSeparators: true,
									sections: [
										{
											text: {
												html: `<ol>
												<li>Any data you share with me belongs to you. 🙋‍♀️</li>
												<li>Your data is to only be used for good. That means more of the things you like, less of the things you don’t. No spam, no marketing, no nonsense.  🤓</li>
												<li>If you don’t like what a business is doing with your data, shut them out. 🔑</li>
												<li>Businesses may already have data about you that they legally own. There is nothing I can do about that. 😞</li>
												<li>I prefer text messages. If you don’t have an unlimited texting plan, we may not be compatible. Text me STOP at xxxx and I’ll leave you alone.📱</li>
												<li>I don't need cookies to give you a better experience. I can do that all by myself! 🍪</li>
												<li>I don't work with companies like Google or Facebook to track your activity. That would be weird. 🌲🤖 </li>
												</ol>
											`,
											},
										},
									],
								},
							})
						},
					},
				],
			},
		})

		this.qotdVc = this.vcFactory.Controller('card', {
			header: {
				title: 'Quote of the day 🧐',
			},
			body: {
				sections: [
					{
						text: {
							content: randomUtil.rand([
								"The problem with quotes on the internet is you can never be certain they're authentic.",
								'Most quotes on the internet are misattributed.',
								"I'm sick of these internet trolls hating on my content.",
								'Put down your iPad and listen to me for a second.',
								"These smart devices are so addictive. That's probobly why I love them so much.",
								'I kick myself for not having bought more Bitcoin.',
							]),
						},
					},
					{
						text: {
							content: randomUtil.rand([
								'-Abraham Lincoln',
								'-Socrates',
								'-Gandhi',
								'-Mark Twain',
								'-Cleopatra',
								'-Marie Curie',
							]),
							align: 'right',
						},
					},
				],
			},
		})
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.SkillView {
		return {
			layouts: [
				{
					cards: [this.introCardVc.render(), this.qotdVc.render()],
				},
				{
					cards: [
						!this.isLoggedIn && this.loginVc.render(),
						this.legalSpeakCardVc.render(),
					].filter((c) => !!c) as SpruceSchemas.Heartwood.v2021_02_11.Card[],
				},
			],
		}
	}

	public async load(options: SkillViewControllerLoadOptions) {
		this.router = options.router
		this.isLoggedIn = options.authenticator.isLoggedIn()
		if (this.isLoggedIn) {
			this.introCardVc.setHeaderSubtitle(`Welcome back friend!`)
		}
	}

	private async handleLogin() {
		await this.router.redirect('dashboard')
	}
}
