import { configurator, type Data, type DragOperation, Modifier } from '@dnd-kit/abstract'
import { restrictShapeToBoundingRectangle } from '@dnd-kit/abstract/modifiers'
import { type DragDropManager, type Draggable, type Droppable } from '@dnd-kit/dom'
import { Rectangle } from '@dnd-kit/geometry'
import { effect, signal } from '@dnd-kit/state'

interface Options {
  inner: Element | null | ((operation: DragOperation) => Element | null)
  container: Element | null | ((operation: DragOperation) => Element | null)
}

export class RestrictInnerToElement extends Modifier<
  DragDropManager<Data, Draggable, Droppable>,
  Options
> {
  private innerRect = signal<DOMRect | null>(null)
  private containerRect = signal<DOMRect | null>(null)

  constructor(manager: DragDropManager<Data, Draggable, Droppable>, options?: Options) {
    super(manager, options)

    this.destroy = effect(() => {
      if (!this.options) {
        return
      }

      const { dragOperation } = manager

      if (!dragOperation.status.initialized) {
        return
      }

      const { inner, container } = this.options

      const innerEl = typeof inner === 'function' ? inner(dragOperation) : inner
      const containerEl = typeof container === 'function' ? container(dragOperation) : container

      if (!innerEl || !containerEl) {
        return
      }

      this.innerRect.value = innerEl.getBoundingClientRect()
      this.containerRect.value = containerEl.getBoundingClientRect()

      return () => {
        this.innerRect.value = null
        this.containerRect.value = null
      }
    })
  }

  apply({ transform }: DragOperation) {
    const inner = this.innerRect.value
    const container = this.containerRect.value

    if (!inner || !container) {
      return transform
    }

    return restrictShapeToBoundingRectangle(
      new Rectangle(inner.left, inner.top, inner.width, inner.height),
      transform,
      container
    )
  }

  static configure = configurator(RestrictInnerToElement)
}
