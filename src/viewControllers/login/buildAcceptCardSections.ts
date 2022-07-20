import { CardSection, List, ListRow } from '../../types/heartwood.types'

export default function buildAcceptCardSections(options: {
	orgName: string
	roleName: string
}): CardSection[] {
	const { orgName, roleName } = options

	return [
		{
			text: {
				html: `Invitation to join<h3>${orgName}</h3>`,
			},
		},
		{
			text: {
				html: `As a<h3>${roleName}</h3>`,
			},
		},
		{
			shouldContentBeCentered: true,
			title: 'Permissions',
		},
		{
			text: {
				content: `Below is the information the team at ${orgName} will be able to see.`,
			},
		},
	]
}

export function buildList(options: {
	firstName: string
	onClickToggle: () => Promise<any>
	lastName: string
	phone: string
}): List {
	const { firstName, onClickToggle, lastName, phone } = options

	return {
		columnWidths: ['content', 'fill'],
		rows: [
			buildRow({
				id: 'firstName',
				text: 'Your first name',
				subText: firstName,
				onClickToggle,
			}),
			buildRow({
				id: 'lastName',
				text: 'Your last name',
				subText: lastName,
				onClickToggle,
			}),
			buildRow({
				id: 'phone',
				text: 'Your phone',
				subText: phone,
				onClickToggle,
			}),
		],
	}
}

function buildRow(options: {
	id: string
	text: string
	subText: string
	onClickToggle: () => Promise<any>
}): ListRow {
	const { id, text, subText, onClickToggle } = options

	return {
		id,
		cells: [
			{
				lineIcon: 'unlock',
			},
			{
				text: {
					content: text,
				},
				subText: {
					content: subText,
				},
			},
			{
				toggleInput: {
					name: 'allow',
					value: true,
					onChange: async () => {
						await onClickToggle()
						return false
					},
				},
			},
		],
	}
}
