import { EditorStateRecord } from './model/EditorState'

export abstract class Renderer {
  public abstract mode: EditorStateRecord['mode']
  public abstract update(force?: boolean): void
}
