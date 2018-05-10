import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'

import PostPreview from './preview-templates/blogPreview'

CMS.registerPreviewTemplate('blog', PostPreview)
