# XPath2XML
This module for converting xpath(multiple) to XML. But now is just PoC version. Therefore, this is not cover all of xpath syntax. 
(I hope this module supports all xpath syntax)

```typescript
import { toXml } from './xpath-converter'

const xpaths = [
  "//ButtonBasicText[@id=1and@type='text']/Background/UIPlateRect[@radious='on']",
  "//ButtonBasicText[@id=1and@width=10]/Background/UIPlateRect[@color='#ababab']"
]

const xml = toXml(xpaths)
console.log(xml)

/* //output
<?xml version="1.0"?>
<ButtonBasicText id="1" type="'text'" width="10">
	<Background>
		<UIPlateRect radious="'on'" color="'#ababab'"/>
	</Background>
</ButtonBasicText>
*/
```

## Install
```
npm install
```

## How to run
```
npm run start
```
please, check the console message on browser developer tool

## Process
xpath -> Step -> Object(for xml schema) -> xml -> string

## Hints

### Step.STEPNAMES
This is a map of axis numbers to names for converting back to DOM

https://developer.mozilla.org/en-US/docs/Web/XPath/Axes

(e.g. Step.ANCESTOR -> 'ancestor')

## Reference
- https://developer.mozilla.org/en-US/docs/Web/XPath
- https://oozcitak.github.io/xmlbuilder2/
