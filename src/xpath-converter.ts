import { parse, Step } from 'xpath-ts'
import { create } from 'xmlbuilder2'
import merge from 'deepmerge-json'

interface locationPath {
  absolute: boolean
  steps: Step[]
}

export function toSteps(xpath:string):Step[] {
  const { expression: {expression} } = parse(xpath)
  const { steps }: locationPath = (expression as any).locationPath as locationPath
  return steps
}

function stepToObject(spec:Step):object {
  const { axis, nodeTest, predicates } = spec
  const name = nodeTest.toString()
  switch (axis) {
    case Step.CHILD:
      const predStr:string = predicates.toString()
      const attrs = predStr.match(/\(attribute::(.*?)\)/g)?.map((str) => {
        const [attr, value] = str.substring('(attribute::'.length, str.length-1).split(' = ')        
        return {['@'+attr]: value}
      }).reduce((acc, obj) => ({...acc, ...obj}), {})
      return { name, ...attrs }
    default:
      return { name: 'unknown(' + axis + '):'+name }
  }
}

export function toObject(xpath:string):object {
  const steps = toSteps(xpath)
  const objs = steps.map(stepToObject)

  const cleanProperty = (node:any) => {
    (node.name && delete node.name)
  }

  let rootNode:any = {}
  let lastNode:any = {}

  for (let i = 0; i < objs.length; i++) {
    const node = objs[i] as any
    if (i === 0) rootNode = node
    else lastNode[node.name] = node
    lastNode = node
    cleanProperty(lastNode)
  }

  return rootNode
}

export function toXml(xpaths:string[]) {
  const objs = xpaths.map(toObject)
  const merged = merge.multi({}, ...objs)
  const doc = create(merged)
  return doc.end({prettyPrint:true})
}