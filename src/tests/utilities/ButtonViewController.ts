import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas';


export interface ButtonViewController {
	render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button;
	triggerRender(): void;
}
