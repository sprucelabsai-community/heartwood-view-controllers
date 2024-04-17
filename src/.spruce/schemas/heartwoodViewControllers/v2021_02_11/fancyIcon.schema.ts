import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const fancyIconSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FancyIconSchema =
    {
        id: 'fancyIcon',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: 'Fancy icon',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** Name. */
            name: {
                label: 'Name',
                type: 'select',
                isRequired: true,
                options: {
                    choices: [
                        { value: 'accesibility', label: 'accesibility' },
                        { value: 'add', label: 'add' },
                        { value: 'address_book', label: 'address_book' },
                        { value: 'administrator', label: 'administrator' },
                        { value: 'airbrush', label: 'airbrush' },
                        { value: 'airplane', label: 'airplane' },
                        { value: 'alarm', label: 'alarm' },
                        { value: 'alien', label: 'alien' },
                        {
                            value: 'american_express',
                            label: 'american_express',
                        },
                        { value: 'analysis', label: 'analysis' },
                        { value: 'analysis_1', label: 'analysis_1' },
                        { value: 'archive', label: 'archive' },
                        { value: 'art_palette', label: 'art_palette' },
                        {
                            value: 'artificial_intelligence',
                            label: 'artificial_intelligence',
                        },
                        {
                            value: 'artificial_intelligence_1',
                            label: 'artificial_intelligence_1',
                        },
                        { value: 'at', label: 'at' },
                        { value: 'atm', label: 'atm' },
                        { value: 'attachment', label: 'attachment' },
                        { value: 'audio', label: 'audio' },
                        { value: 'audio_knob', label: 'audio_knob' },
                        { value: 'auricular_phone', label: 'auricular_phone' },
                        { value: 'back', label: 'back' },
                        { value: 'backup', label: 'backup' },
                        { value: 'balance', label: 'balance' },
                        { value: 'band_aid', label: 'band_aid' },
                        { value: 'bank', label: 'bank' },
                        { value: 'barcode', label: 'barcode' },
                        { value: 'basketball', label: 'basketball' },
                        { value: 'battery', label: 'battery' },
                        { value: 'beer', label: 'beer' },
                        { value: 'bell', label: 'bell' },
                        { value: 'bicycle', label: 'bicycle' },
                        { value: 'bill', label: 'bill' },
                        { value: 'binoculars', label: 'binoculars' },
                        { value: 'birthday', label: 'birthday' },
                        { value: 'bitcoin', label: 'bitcoin' },
                        { value: 'blog', label: 'blog' },
                        { value: 'bluetooth', label: 'bluetooth' },
                        { value: 'bomb', label: 'bomb' },
                        { value: 'book', label: 'book' },
                        { value: 'bookmark', label: 'bookmark' },
                        { value: 'box', label: 'box' },
                        { value: 'brain', label: 'brain' },
                        { value: 'brainstorm', label: 'brainstorm' },
                        { value: 'briefcase', label: 'briefcase' },
                        { value: 'briefcase_money', label: 'briefcase_money' },
                        { value: 'broken_heart', label: 'broken_heart' },
                        { value: 'broken_link', label: 'broken_link' },
                        { value: 'brush_tip', label: 'brush_tip' },
                        { value: 'bus', label: 'bus' },
                        { value: 'cake', label: 'cake' },
                        { value: 'calculator', label: 'calculator' },
                        { value: 'calendar', label: 'calendar' },
                        { value: 'car', label: 'car' },
                        { value: 'cat', label: 'cat' },
                        { value: 'certificate', label: 'certificate' },
                        { value: 'champagne', label: 'champagne' },
                        { value: 'chat', label: 'chat' },
                        { value: 'chat_1', label: 'chat_1' },
                        { value: 'check', label: 'check' },
                        { value: 'check_1', label: 'check_1' },
                        { value: 'chip', label: 'chip' },
                        { value: 'cirrus', label: 'cirrus' },
                        { value: 'city', label: 'city' },
                        { value: 'city_1', label: 'city_1' },
                        { value: 'citybank', label: 'citybank' },
                        { value: 'clicker', label: 'clicker' },
                        { value: 'clip', label: 'clip' },
                        { value: 'clipboard', label: 'clipboard' },
                        { value: 'clock', label: 'clock' },
                        { value: 'cloud', label: 'cloud' },
                        { value: 'cloud_1', label: 'cloud_1' },
                        { value: 'cloud_computing', label: 'cloud_computing' },
                        {
                            value: 'cloud_computing_1',
                            label: 'cloud_computing_1',
                        },
                        { value: 'cloudy', label: 'cloudy' },
                        { value: 'cocktail', label: 'cocktail' },
                        { value: 'code', label: 'code' },
                        { value: 'coffee_cup', label: 'coffee_cup' },
                        { value: 'coin_dollar', label: 'coin_dollar' },
                        { value: 'coin_pound', label: 'coin_pound' },
                        { value: 'coins', label: 'coins' },
                        { value: 'coinstack', label: 'coinstack' },
                        { value: 'collaboration', label: 'collaboration' },
                        { value: 'command', label: 'command' },
                        { value: 'company', label: 'company' },
                        { value: 'compass', label: 'compass' },
                        { value: 'compose', label: 'compose' },
                        {
                            value: 'computer_graphics',
                            label: 'computer_graphics',
                        },
                        { value: 'connection', label: 'connection' },
                        { value: 'contract', label: 'contract' },
                        { value: 'contract_1', label: 'contract_1' },
                        { value: 'contrast', label: 'contrast' },
                        { value: 'control', label: 'control' },
                        { value: 'control_game', label: 'control_game' },
                        { value: 'copy', label: 'copy' },
                        { value: 'costumer', label: 'costumer' },
                        { value: 'coupon', label: 'coupon' },
                        { value: 'crash', label: 'crash' },
                        { value: 'creative', label: 'creative' },
                        { value: 'credit_card', label: 'credit_card' },
                        { value: 'credit_card1', label: 'credit_card1' },
                        { value: 'credit_card_2', label: 'credit_card_2' },
                        { value: 'cross', label: 'cross' },
                        { value: 'cursor', label: 'cursor' },
                        { value: 'dashboard', label: 'dashboard' },
                        { value: 'database', label: 'database' },
                        { value: 'delete', label: 'delete' },
                        { value: 'dentistry', label: 'dentistry' },
                        { value: 'diary', label: 'diary' },
                        { value: 'diet', label: 'diet' },
                        {
                            value: 'digital_campaing',
                            label: 'digital_campaing',
                        },
                        { value: 'digital_key', label: 'digital_key' },
                        { value: 'diners_club', label: 'diners_club' },
                        { value: 'disc', label: 'disc' },
                        { value: 'discount', label: 'discount' },
                        { value: 'dish', label: 'dish' },
                        { value: 'dish_1', label: 'dish_1' },
                        { value: 'dislike', label: 'dislike' },
                        { value: 'divider', label: 'divider' },
                        { value: 'doctor', label: 'doctor' },
                        { value: 'dog', label: 'dog' },
                        { value: 'dollar_coin', label: 'dollar_coin' },
                        { value: 'dollar_sign', label: 'dollar_sign' },
                        { value: 'dowload', label: 'dowload' },
                        { value: 'down_arrow', label: 'down_arrow' },
                        { value: 'download', label: 'download' },
                        { value: 'edit', label: 'edit' },
                        { value: 'edit_file', label: 'edit_file' },
                        { value: 'editor', label: 'editor' },
                        { value: 'education', label: 'education' },
                        { value: 'eject', label: 'eject' },
                        { value: 'emergency', label: 'emergency' },
                        { value: 'employed', label: 'employed' },
                        {
                            value: 'encrypted_database',
                            label: 'encrypted_database',
                        },
                        {
                            value: 'encrypted_folder',
                            label: 'encrypted_folder',
                        },
                        {
                            value: 'encrypted_internet_conection',
                            label: 'encrypted_internet_conection',
                        },
                        { value: 'encrypted_mail', label: 'encrypted_mail' },
                        { value: 'encryption', label: 'encryption' },
                        {
                            value: 'encypted_terminal',
                            label: 'encypted_terminal',
                        },
                        { value: 'enterprice', label: 'enterprice' },
                        { value: 'equal', label: 'equal' },
                        { value: 'erase_file', label: 'erase_file' },
                        { value: 'erase_sabe', label: 'erase_sabe' },
                        { value: 'error_database', label: 'error_database' },
                        { value: 'error_search', label: 'error_search' },
                        { value: 'error_terminal', label: 'error_terminal' },
                        { value: 'euro_sign', label: 'euro_sign' },
                        { value: 'exit', label: 'exit' },
                        { value: 'external_link', label: 'external_link' },
                        { value: 'facebook', label: 'facebook' },
                        { value: 'feedback', label: 'feedback' },
                        { value: 'file', label: 'file' },
                        { value: 'fill', label: 'fill' },
                        { value: 'finger_print', label: 'finger_print' },
                        { value: 'firewall', label: 'firewall' },
                        { value: 'flag', label: 'flag' },
                        { value: 'flash', label: 'flash' },
                        { value: 'flash_auto', label: 'flash_auto' },
                        { value: 'flash_red_eye', label: 'flash_red_eye' },
                        { value: 'flashlight', label: 'flashlight' },
                        { value: 'folder_gallery', label: 'folder_gallery' },
                        { value: 'folder', label: 'folder' },
                        { value: 'football', label: 'football' },
                        { value: 'forbidden', label: 'forbidden' },
                        { value: 'french_fries', label: 'french_fries' },
                        { value: 'funnel', label: 'funnel' },
                        { value: 'gallery', label: 'gallery' },
                        { value: 'game_control', label: 'game_control' },
                        {
                            value: 'games_card_clubs',
                            label: 'games_card_clubs',
                        },
                        {
                            value: 'games_card_diamonds',
                            label: 'games_card_diamonds',
                        },
                        {
                            value: 'games_card_hearts',
                            label: 'games_card_hearts',
                        },
                        {
                            value: 'games_card_spades',
                            label: 'games_card_spades',
                        },
                        { value: 'gift', label: 'gift' },
                        { value: 'girl', label: 'girl' },
                        { value: 'gmail', label: 'gmail' },
                        { value: 'gold', label: 'gold' },
                        { value: 'graduated', label: 'graduated' },
                        { value: 'group', label: 'group' },
                        { value: 'hamburguer', label: 'hamburguer' },
                        { value: 'hand', label: 'hand' },
                        { value: 'hand_note', label: 'hand_note' },
                        { value: 'hand_point', label: 'hand_point' },
                        { value: 'hand_shake', label: 'hand_shake' },
                        { value: 'headphones', label: 'headphones' },
                        { value: 'heart', label: 'heart' },
                        { value: 'heart_1', label: 'heart_1' },
                        { value: 'help', label: 'help' },
                        { value: 'hide', label: 'hide' },
                        { value: 'high_five', label: 'high_five' },
                        { value: 'hold', label: 'hold' },
                        { value: 'home', label: 'home' },
                        { value: 'homework', label: 'homework' },
                        { value: 'hotel', label: 'hotel' },
                        { value: 'hourglass', label: 'hourglass' },
                        { value: 'house', label: 'house' },
                        { value: 'icon', label: 'icon' },
                        { value: 'id_card', label: 'id_card' },
                        { value: 'idea', label: 'idea' },
                        { value: 'infinity', label: 'infinity' },
                        { value: 'info', label: 'info' },
                        { value: 'information', label: 'information' },
                        { value: 'innovation', label: 'innovation' },
                        { value: 'instagram', label: 'instagram' },
                        { value: 'internet', label: 'internet' },
                        { value: 'internet_1', label: 'internet_1' },
                        { value: 'internet_error', label: 'internet_error' },
                        { value: 'key', label: 'key' },
                        { value: 'key_1', label: 'key_1' },
                        { value: 'kiss', label: 'kiss' },
                        { value: 'lamp', label: 'lamp' },
                        { value: 'laptop', label: 'laptop' },
                        { value: 'layers', label: 'layers' },
                        { value: 'layers_1', label: 'layers_1' },
                        { value: 'layout', label: 'layout' },
                        { value: 'left_arrow', label: 'left_arrow' },
                        { value: 'light_bulb', label: 'light_bulb' },
                        { value: 'like', label: 'like' },
                        { value: 'like_1', label: 'like_1' },
                        { value: 'line_chart', label: 'line_chart' },
                        { value: 'link', label: 'link' },
                        { value: 'linkeding', label: 'linkeding' },
                        { value: 'list', label: 'list' },
                        { value: 'local_network', label: 'local_network' },
                        { value: 'location', label: 'location' },
                        { value: 'locked', label: 'locked' },
                        { value: 'magazine', label: 'magazine' },
                        { value: 'magic_wand', label: 'magic_wand' },
                        { value: 'magnet', label: 'magnet' },
                        { value: 'mail', label: 'mail' },
                        { value: 'mail_account', label: 'mail_account' },
                        { value: 'mail_error', label: 'mail_error' },
                        { value: 'map_location', label: 'map_location' },
                        { value: 'maps', label: 'maps' },
                        { value: 'marker', label: 'marker' },
                        { value: 'master_data', label: 'master_data' },
                        { value: 'mastercard', label: 'mastercard' },
                        { value: 'medicine', label: 'medicine' },
                        { value: 'menu', label: 'menu' },
                        { value: 'mic', label: 'mic' },
                        { value: 'microphone', label: 'microphone' },
                        { value: 'microphone_1', label: 'microphone_1' },
                        { value: 'microscope', label: 'microscope' },
                        { value: 'money_bag', label: 'money_bag' },
                        { value: 'money', label: 'money' },
                        { value: 'money_1', label: 'money_1' },
                        { value: 'money_report', label: 'money_report' },
                        { value: 'money_report_1', label: 'money_report_1' },
                        { value: 'monitor', label: 'monitor' },
                        { value: 'more', label: 'more' },
                        { value: 'multiple_user', label: 'multiple_user' },
                        { value: 'multiple_users', label: 'multiple_users' },
                        { value: 'music_library', label: 'music_library' },
                        { value: 'music_player', label: 'music_player' },
                        {
                            value: 'music_volume_high',
                            label: 'music_volume_high',
                        },
                        {
                            value: 'music_volume_low',
                            label: 'music_volume_low',
                        },
                        {
                            value: 'music_volume_medium',
                            label: 'music_volume_medium',
                        },
                        {
                            value: 'music_volume_mute',
                            label: 'music_volume_mute',
                        },
                        { value: 'musical_note', label: 'musical_note' },
                        { value: 'mute_mic', label: 'mute_mic' },
                        { value: 'network', label: 'network' },
                        { value: 'newspaper', label: 'newspaper' },
                        { value: 'note', label: 'note' },
                        { value: 'notebook', label: 'notebook' },
                        { value: 'notification', label: 'notification' },
                        { value: 'old_phone', label: 'old_phone' },
                        { value: 'online_pay', label: 'online_pay' },
                        { value: 'open_book', label: 'open_book' },
                        { value: 'open_box', label: 'open_box' },
                        { value: 'open_hand', label: 'open_hand' },
                        { value: 'p2p', label: 'p2p' },
                        { value: 'pallete', label: 'pallete' },
                        { value: 'paper_plane', label: 'paper_plane' },
                        { value: 'paper_plane_1', label: 'paper_plane_1' },
                        { value: 'passage_of_time', label: 'passage_of_time' },
                        { value: 'pause', label: 'pause' },
                        { value: 'payment', label: 'payment' },
                        { value: 'paypal', label: 'paypal' },
                        { value: 'pen_drive', label: 'pen_drive' },
                        { value: 'perspective', label: 'perspective' },
                        { value: 'pet_paw_print', label: 'pet_paw_print' },
                        { value: 'phone_book', label: 'phone_book' },
                        { value: 'phone_receiver', label: 'phone_receiver' },
                        { value: 'photo_camera', label: 'photo_camera' },
                        { value: 'picture', label: 'picture' },
                        { value: 'pie_chart', label: 'pie_chart' },
                        { value: 'piggy_bank', label: 'piggy_bank' },
                        { value: 'pinterest', label: 'pinterest' },
                        { value: 'piracy', label: 'piracy' },
                        { value: 'pizza', label: 'pizza' },
                        { value: 'placeholder', label: 'placeholder' },
                        { value: 'plan', label: 'plan' },
                        { value: 'plane', label: 'plane' },
                        { value: 'play_buttom', label: 'play_buttom' },
                        { value: 'plus', label: 'plus' },
                        { value: 'police_car', label: 'police_car' },
                        { value: 'power_on_off', label: 'power_on_off' },
                        { value: 'presentation', label: 'presentation' },
                        { value: 'preview', label: 'preview' },
                        { value: 'preview_1', label: 'preview_1' },
                        { value: 'previous', label: 'previous' },
                        { value: 'price_tag', label: 'price_tag' },
                        { value: 'print_fax', label: 'print_fax' },
                        {
                            value: 'project_management',
                            label: 'project_management',
                        },
                        {
                            value: 'project_management_1',
                            label: 'project_management_1',
                        },
                        { value: 'promotion', label: 'promotion' },
                        { value: 'purse', label: 'purse' },
                        { value: 'quality', label: 'quality' },
                        { value: 'radar', label: 'radar' },
                        { value: 'radioactive', label: 'radioactive' },
                        { value: 'rainy', label: 'rainy' },
                        { value: 'rating', label: 'rating' },
                        { value: 'receipt', label: 'receipt' },
                        { value: 'recluitment', label: 'recluitment' },
                        { value: 'recognition', label: 'recognition' },
                        { value: 'record', label: 'record' },
                        { value: 'recycle', label: 'recycle' },
                        { value: 'red_eye', label: 'red_eye' },
                        { value: 'reload', label: 'reload' },
                        { value: 'reload_1', label: 'reload_1' },
                        { value: 'repair', label: 'repair' },
                        { value: 'report', label: 'report' },
                        { value: 'research', label: 'research' },
                        { value: 'responsive', label: 'responsive' },
                        { value: 'restaurant', label: 'restaurant' },
                        { value: 'resume', label: 'resume' },
                        { value: 'reunion', label: 'reunion' },
                        { value: 'right_arrow', label: 'right_arrow' },
                        { value: 'risk', label: 'risk' },
                        { value: 'rotate', label: 'rotate' },
                        { value: 'route', label: 'route' },
                        { value: 'runner_man', label: 'runner_man' },
                        { value: 'sabe', label: 'sabe' },
                        { value: 'sabe_error', label: 'sabe_error' },
                        { value: 'safety_box_open', label: 'safety_box_open' },
                        { value: 'satellite', label: 'satellite' },
                        { value: 'school', label: 'school' },
                        { value: 'scissors', label: 'scissors' },
                        { value: 'screw', label: 'screw' },
                        { value: 'search', label: 'search' },
                        { value: 'send', label: 'send' },
                        { value: 'send_file', label: 'send_file' },
                        { value: 'send_file_1', label: 'send_file_1' },
                        { value: 'send_money', label: 'send_money' },
                        { value: 'send_package', label: 'send_package' },
                        { value: 'server', label: 'server' },
                        { value: 'settings', label: 'settings' },
                        { value: 'settings_1', label: 'settings_1' },
                        { value: 'share', label: 'share' },
                        { value: 'shield', label: 'shield' },
                        { value: 'ship', label: 'ship' },
                        { value: 'shipped', label: 'shipped' },
                        { value: 'shop', label: 'shop' },
                        { value: 'shopping', label: 'shopping' },
                        { value: 'shopping_bag', label: 'shopping_bag' },
                        { value: 'shopping_car', label: 'shopping_car' },
                        { value: 'shuffle', label: 'shuffle' },
                        { value: 'sign', label: 'sign' },
                        { value: 'sketch', label: 'sketch' },
                        { value: 'sketch_1', label: 'sketch_1' },
                        { value: 'skip', label: 'skip' },
                        { value: 'smartphone', label: 'smartphone' },
                        { value: 'snapchat', label: 'snapchat' },
                        { value: 'sniffer', label: 'sniffer' },
                        { value: 'social_media', label: 'social_media' },
                        { value: 'spam', label: 'spam' },
                        { value: 'speech_bubble', label: 'speech_bubble' },
                        { value: 'spray', label: 'spray' },
                        { value: 'star', label: 'star' },
                        { value: 'start_up', label: 'start_up' },
                        {
                            value: 'stats_line_chart',
                            label: 'stats_line_chart',
                        },
                        { value: 'stethoscope', label: 'stethoscope' },
                        { value: 'stop', label: 'stop' },
                        { value: 'stop_watch', label: 'stop_watch' },
                        { value: 'storage', label: 'storage' },
                        { value: 'street', label: 'street' },
                        { value: 'student', label: 'student' },
                        { value: 'study', label: 'study' },
                        { value: 'sun_glasses', label: 'sun_glasses' },
                        { value: 'suppport', label: 'suppport' },
                        { value: 'switch', label: 'switch' },
                        { value: 'tablet', label: 'tablet' },
                        { value: 'tabs', label: 'tabs' },
                        { value: 'tap_gesture', label: 'tap_gesture' },
                        { value: 'target', label: 'target' },
                        { value: 'telephone_call', label: 'telephone_call' },
                        { value: 'television', label: 'television' },
                        { value: 'terminal', label: 'terminal' },
                        { value: 'terminal_2', label: 'terminal_2' },
                        { value: 'think', label: 'think' },
                        { value: 'toast', label: 'toast' },
                        { value: 'toast_1', label: 'toast_1' },
                        { value: 'tools', label: 'tools' },
                        { value: 'traffic_light', label: 'traffic_light' },
                        { value: 'transfer_data', label: 'transfer_data' },
                        { value: 'trash', label: 'trash' },
                        { value: 'treasure_chest', label: 'treasure_chest' },
                        { value: 'trojan', label: 'trojan' },
                        { value: 'twitter', label: 'twitter' },
                        { value: 'two_players', label: 'two_players' },
                        { value: 'university', label: 'university' },
                        { value: 'unlock', label: 'unlock' },
                        { value: 'up_arrow', label: 'up_arrow' },
                        { value: 'upload', label: 'upload' },
                        { value: 'vector', label: 'vector' },
                        { value: 'view', label: 'view' },
                        { value: 'vintage_phone', label: 'vintage_phone' },
                        { value: 'visa', label: 'visa' },
                        { value: 'volume_control', label: 'volume_control' },
                        { value: 'wallet', label: 'wallet' },
                        { value: 'wallet_1', label: 'wallet_1' },
                        { value: 'warning', label: 'warning' },
                        {
                            value: 'warning_briefcase',
                            label: 'warning_briefcase',
                        },
                        {
                            value: 'warning_chemistry',
                            label: 'warning_chemistry',
                        },
                        {
                            value: 'warning_database',
                            label: 'warning_database',
                        },
                        { value: 'warning_dowload', label: 'warning_dowload' },
                        { value: 'warning_folder', label: 'warning_folder' },
                        {
                            value: 'warning_location',
                            label: 'warning_location',
                        },
                        { value: 'warning_mail', label: 'warning_mail' },
                        { value: 'warning_package', label: 'warning_package' },
                        { value: 'warning_search', label: 'warning_search' },
                        { value: 'warning_shipped', label: 'warning_shipped' },
                        {
                            value: 'warning_terminal',
                            label: 'warning_terminal',
                        },
                        { value: 'warning_trash', label: 'warning_trash' },
                        { value: 'web_design', label: 'web_design' },
                        {
                            value: 'web_domain_registration',
                            label: 'web_domain_registration',
                        },
                        { value: 'web_search', label: 'web_search' },
                        { value: 'web_search_1', label: 'web_search_1' },
                        { value: 'website', label: 'website' },
                        { value: 'weight', label: 'weight' },
                        { value: 'whatsapp', label: 'whatsapp' },
                        { value: 'wheelchair', label: 'wheelchair' },
                        { value: 'wifi', label: 'wifi' },
                        { value: 'windows', label: 'windows' },
                        { value: 'wine_cup', label: 'wine_cup' },
                        { value: 'wordpress', label: 'wordpress' },
                        { value: 'worldwide', label: 'worldwide' },
                        { value: 'youtube', label: 'youtube' },
                        { value: 'zcash', label: 'zcash' },
                        { value: 'zipped_folder', label: 'zipped_folder' },
                        { value: 'zoom_in', label: 'zoom_in' },
                        { value: 'zoom_out', label: 'zoom_out' },
                        { value: 'loading', label: 'loading' },
                    ],
                },
            },
            /** Size. */
            size: {
                label: 'Size',
                type: 'select',
                options: {
                    choices: [
                        { value: 'medium', label: 'medium' },
                        { value: 'extraLarge', label: 'Extra lange' },
                    ],
                },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(fancyIconSchema)

export default fancyIconSchema
