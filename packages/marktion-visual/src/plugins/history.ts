import { withHistory } from 'slate-history'
import { Plugin } from '../VisualMarktion'

export const history: Plugin = visualMarktion => {
  visualMarktion.editor = withHistory(visualMarktion.editor)
}
