import { toXml } from './xpath-converter'

const xpaths = [
  "//ButtonBasicText[@id=1and@type='text']/Background/UIPlateRect[@radious='on']",
  "//ButtonBasicText[@id=1and@width=10]/Background/UIPlateRect[@color='#ababab']"
]

const xml = toXml(xpaths)
console.log(xml)