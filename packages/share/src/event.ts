import mitt, { Handler, Emitter, EventType } from 'mitt'

export interface EventEmitter<Events extends Record<EventType, unknown>> extends Emitter<Events> {
  once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
}

export function createEmitter<Events extends Record<EventType, unknown>>() {
  const emitter = mitt<Events>() as EventEmitter<Events>

  emitter.once = (type, handler) => {
    emitter.on(type, function onceHandler(payload) {
      emitter.off(type, onceHandler)

      handler(payload)
    })
  }
  return emitter
}
