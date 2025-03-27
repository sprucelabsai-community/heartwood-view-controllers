import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const didNotGenerateOfferSchema: SpruceErrors.HeartwoodViewControllers.DidNotGenerateOfferSchema  = {
	id: 'didNotGenerateOffer',
	namespace: 'HeartwoodViewControllers',
	name: 'Did not generate offer',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(didNotGenerateOfferSchema)

export default didNotGenerateOfferSchema
