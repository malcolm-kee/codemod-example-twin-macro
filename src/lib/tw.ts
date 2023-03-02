const prefix = 'app1-'

type ProvidedClass = string | string[] | undefined | false | ProvidedClass[]

export const tw = (...classes: ProvidedClass[]): string => {
  const result: Array<string> = []

  const innerTw = (provided: ProvidedClass) => {
    if (Array.isArray(provided)) {
      provided.forEach(p => innerTw(p))
    } else {
      if (provided) {
        provided
          .split(' ')
          .forEach(cls =>
            result.push(cls.startsWith(prefix) ? cls : `${prefix}${cls}`),
          )
      }
    }
  }

  innerTw(classes)

  return result.join(' ')
}
