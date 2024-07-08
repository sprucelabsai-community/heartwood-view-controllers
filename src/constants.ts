import { lineIconChoices } from '@sprucelabs/calendar-utils'
import { SchemaFieldsByName, SelectChoice } from '@sprucelabs/schema'
import textBuilder from './schemas/v2021_02_11/text.builder'
export { lineIcons } from '@sprucelabs/calendar-utils'

export const fancyIcons = [
    'accesibility',
    'add',
    'address_book',
    'administrator',
    'airbrush',
    'airplane',
    'alarm',
    'alien',
    'american_express',
    'analysis',
    'analysis_1',
    'archive',
    'art_palette',
    'artificial_intelligence',
    'artificial_intelligence_1',
    'at',
    'atm',
    'attachment',
    'audio',
    'audio_knob',
    'auricular_phone',
    'back',
    'backup',
    'balance',
    'band_aid',
    'bank',
    'barcode',
    'basketball',
    'battery',
    'beer',
    'bell',
    'bicycle',
    'bill',
    'binoculars',
    'birthday',
    'bitcoin',
    'blog',
    'bluetooth',
    'bomb',
    'book',
    'bookmark',
    'box',
    'brain',
    'brainstorm',
    'briefcase',
    'briefcase_money',
    'broken_heart',
    'broken_link',
    'brush_tip',
    'bus',
    'cake',
    'calculator',
    'calendar',
    'car',
    'cat',
    'certificate',
    'champagne',
    'chat',
    'chat_1',
    'check',
    'check_1',
    'chip',
    'cirrus',
    'city',
    'city_1',
    'citybank',
    'clicker',
    'clip',
    'clipboard',
    'clock',
    'cloud',
    'cloud_1',
    'cloud_computing',
    'cloud_computing_1',
    'cloudy',
    'cocktail',
    'code',
    'coffee_cup',
    'coin_dollar',
    'coin_pound',
    'coins',
    'coinstack',
    'collaboration',
    'command',
    'company',
    'compass',
    'compose',
    'computer_graphics',
    'connection',
    'contract',
    'contract_1',
    'contrast',
    'control',
    'control_game',
    'copy',
    'costumer',
    'coupon',
    'crash',
    'creative',
    'credit_card',
    'credit_card1',
    'credit_card_2',
    'cross',
    'cursor',
    'dashboard',
    'database',
    'delete',
    'dentistry',
    'diary',
    'diet',
    'digital_campaing',
    'digital_key',
    'diners_club',
    'disc',
    'discount',
    'dish',
    'dish_1',
    'dislike',
    'divider',
    'doctor',
    'dog',
    'dollar_coin',
    'dollar_sign',
    'dowload',
    'down_arrow',
    'download',
    'edit',
    'edit_file',
    'editor',
    'education',
    'eject',
    'emergency',
    'employed',
    'encrypted_database',
    'encrypted_folder',
    'encrypted_internet_conection',
    'encrypted_mail',
    'encryption',
    'encypted_terminal',
    'enterprice',
    'equal',
    'erase_file',
    'erase_sabe',
    'error_database',
    'error_search',
    'error_terminal',
    'euro_sign',
    'exit',
    'external_link',
    'facebook',
    'feedback',
    'file',
    'fill',
    'finger_print',
    'firewall',
    'flag',
    'flash',
    'flash_auto',
    'flash_red_eye',
    'flashlight',
    'folder_gallery',
    'folder',
    'football',
    'forbidden',
    'french_fries',
    'funnel',
    'gallery',
    'game_control',
    'games_card_clubs',
    'games_card_diamonds',
    'games_card_hearts',
    'games_card_spades',
    'gift',
    'girl',
    'gmail',
    'gold',
    'graduated',
    'group',
    'hamburguer',
    'hand',
    'hand_note',
    'hand_point',
    'hand_shake',
    'headphones',
    'heart',
    'heart_1',
    'help',
    'hide',
    'high_five',
    'hold',
    'home',
    'homework',
    'hotel',
    'hourglass',
    'house',
    'icon',
    'id_card',
    'idea',
    'infinity',
    'info',
    'information',
    'innovation',
    'instagram',
    'internet',
    'internet_1',
    'internet_error',
    'key',
    'key_1',
    'kiss',
    'lamp',
    'laptop',
    'layers',
    'layers_1',
    'layout',
    'left_arrow',
    'light_bulb',
    'like',
    'like_1',
    'line_chart',
    'link',
    'linkeding',
    'list',
    'local_network',
    'location',
    'locked',
    'magazine',
    'magic_wand',
    'magnet',
    'mail',
    'mail_account',
    'mail_error',
    'map_location',
    'maps',
    'marker',
    'master_data',
    'mastercard',
    'medicine',
    'menu',
    'mic',
    'microphone',
    'microphone_1',
    'microscope',
    'money_bag',
    'money',
    'money_1',
    'money_report',
    'money_report_1',
    'monitor',
    'more',
    'multiple_user',
    'multiple_users',
    'music_library',
    'music_player',
    'music_volume_high',
    'music_volume_low',
    'music_volume_medium',
    'music_volume_mute',
    'musical_note',
    'mute_mic',
    'network',
    'newspaper',
    'note',
    'notebook',
    'notification',
    'old_phone',
    'online_pay',
    'open_book',
    'open_box',
    'open_hand',
    'p2p',
    'pallete',
    'paper_plane',
    'paper_plane_1',
    'passage_of_time',
    'pause',
    'payment',
    'paypal',
    'pen_drive',
    'perspective',
    'pet_paw_print',
    'phone_book',
    'phone_receiver',
    'photo_camera',
    'picture',
    'pie_chart',
    'piggy_bank',
    'pinterest',
    'piracy',
    'pizza',
    'placeholder',
    'plan',
    'plane',
    'play_buttom',
    'plus',
    'police_car',
    'power_on_off',
    'presentation',
    'preview',
    'preview_1',
    'previous',
    'price_tag',
    'print_fax',
    'project_management',
    'project_management_1',
    'promotion',
    'purse',
    'quality',
    'radar',
    'radioactive',
    'rainy',
    'rating',
    'receipt',
    'recluitment',
    'recognition',
    'record',
    'recycle',
    'red_eye',
    'reload',
    'reload_1',
    'repair',
    'report',
    'research',
    'responsive',
    'restaurant',
    'resume',
    'reunion',
    'right_arrow',
    'risk',
    'rotate',
    'route',
    'runner_man',
    'sabe',
    'sabe_error',
    'safety_box_open',
    'satellite',
    'school',
    'scissors',
    'screw',
    'search',
    'send',
    'send_file',
    'send_file_1',
    'send_money',
    'send_package',
    'server',
    'settings',
    'settings_1',
    'share',
    'shield',
    'ship',
    'shipped',
    'shop',
    'shopping',
    'shopping_bag',
    'shopping_car',
    'shuffle',
    'sign',
    'sketch',
    'sketch_1',
    'skip',
    'smartphone',
    'snapchat',
    'sniffer',
    'social_media',
    'spam',
    'speech_bubble',
    'spray',
    'star',
    'start_up',
    'stats_line_chart',
    'stethoscope',
    'stop',
    'stop_watch',
    'storage',
    'street',
    'student',
    'study',
    'sun_glasses',
    'suppport',
    'switch',
    'tablet',
    'tabs',
    'tap_gesture',
    'target',
    'telephone_call',
    'television',
    'terminal',
    'terminal_2',
    'think',
    'toast',
    'toast_1',
    'tools',
    'traffic_light',
    'transfer_data',
    'trash',
    'treasure_chest',
    'trojan',
    'twitter',
    'two_players',
    'university',
    'unlock',
    'up_arrow',
    'upload',
    'vector',
    'view',
    'vintage_phone',
    'visa',
    'volume_control',
    'wallet',
    'wallet_1',
    'warning',
    'warning_briefcase',
    'warning_chemistry',
    'warning_database',
    'warning_dowload',
    'warning_folder',
    'warning_location',
    'warning_mail',
    'warning_package',
    'warning_search',
    'warning_shipped',
    'warning_terminal',
    'warning_trash',
    'web_design',
    'web_domain_registration',
    'web_search',
    'web_search_1',
    'website',
    'weight',
    'whatsapp',
    'wheelchair',
    'wifi',
    'windows',
    'wine_cup',
    'wordpress',
    'worldwide',
    'youtube',
    'zcash',
    'zipped_folder',
    'zoom_in',
    'zoom_out',
    'loading',
] as const

export const defaultSubmitButtonLabel = 'Go!'
export const defaultCancelButtonLabel = 'Cancel'

export const lineIconFields: SchemaFieldsByName = {
    name: {
        type: 'select',
        label: 'Name',
        isRequired: true,
        options: {
            choices: lineIconChoices,
        },
    },
}

export const buttonFields: SchemaFieldsByName = {
    id: {
        type: 'id',
    },
    label: {
        type: 'text',
        label: 'Label',
    },
    controller: {
        type: 'raw',
        options: {
            valueType: 'HeartwoodTypes.ButtonController',
        },
    },
    isSelected: {
        type: 'boolean',
        label: 'Selected',
    },
    isEnabled: {
        type: 'boolean',
        label: 'Selected',
        defaultValue: true,
    },
    shouldQueueShow: {
        type: 'boolean',
        label: 'Add to fade-in queue.',
        hint: 'Fade in effect could change.',
    },
    shouldShowHintIcon: {
        type: 'boolean',
        label: 'Show hint icon',
    },
    onClickHintIcon: {
        type: 'raw',
        label: 'Click handler for hint icon',
        options: {
            valueType: '() => Promise<any> | any',
        },
    },
    hint: {
        type: 'schema',
        options: {
            schema: textBuilder,
        },
    },
    type: {
        type: 'select',
        label: 'Type',
        defaultValue: 'secondary',
        options: {
            choices: [
                {
                    value: 'primary',
                    label: 'Primary',
                },
                {
                    value: 'secondary',
                    label: 'Secondary',
                },
                {
                    value: 'destructive',
                    label: 'Destructive',
                },
            ],
        },
    },
    image: {
        type: 'text',
        label: 'Image',
    },
    avatar: {
        type: 'text',
        label: 'Avatar',
    },
    lineIcon: {
        type: 'select',
        label: 'Line icon',
        options: {
            ...(lineIconFields.name.options as any),
        },
    },
    selectedLineIcon: {
        type: 'select',
        label: 'Selected line icon',
        hint: 'Only applies when the button is selected. Will override line icon if one is set.',
        options: {
            ...(lineIconFields.name.options as any),
        },
    },
    lineIconPosition: {
        type: 'select',
        label: 'Line icon position',
        options: {
            choices: [
                {
                    value: 'left',
                    label: 'Left',
                },
                {
                    value: 'bottom',
                    label: 'Bottom',
                },
            ],
        },
    },
    onClick: {
        type: 'raw',
        label: 'Click handler',
        options: {
            valueType: '() => Promise<any> | any',
        },
    },
}

export const formBuilderFieldTypes = {
    address: 'Address',
    date: 'Date',
    dateTime: 'Date & Time',
    select: 'Dropdown',
    image: 'Image',
    number: 'Number',
    phone: 'Phone',
    signature: 'Signature',
    ratings: 'Ratings',
    text: 'Text',
    boolean: 'Toggle',
}

export const fieldTypeChoices: SelectChoice[] = Object.keys(
    formBuilderFieldTypes
).map((key) => ({
    //@ts-ignore
    label: formBuilderFieldTypes[key],
    value: key,
}))

export type FormBuilderFieldType = keyof typeof formBuilderFieldTypes
