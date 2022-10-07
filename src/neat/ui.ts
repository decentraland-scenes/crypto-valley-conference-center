
export let canvas = new UICanvas()
export var inputcode = ""

export var neatText = new UIText(canvas)
neatText.value = ""
neatText.vAlign = "center"
neatText.hAlign = "center"
neatText.hTextAlign = "center"
neatText.fontSize = 50
neatText.positionX = 0
neatText.height = 30
neatText.color = Color4.Yellow()
neatText.visible = false



export var neatBG = new UIContainerRect(canvas)
neatBG.vAlign = "center"
neatBG.height = "center"
neatBG.height = "100%"
neatBG.width = "100%"
neatBG.width = 400
neatBG.visible = false

export var neatBGt = new UIImage(neatBG, new Texture("src/neat/textures/neatbg.png"))
neatBGt.sourceLeft = 0
neatBGt.sourceTop = 0
neatBGt.sourceWidth = 600
neatBGt.sourceHeight = 600
neatBGt.height = 400
neatBGt.width = 400
neatBGt.hAlign = "center"
neatBGt.vAlign = "center"


export var neatHeader = new UIText(neatBG)
neatHeader.color = Color4.White()
neatHeader.value = "Homo Sapien Detector"
neatHeader.vAlign = "center"
neatHeader.hTextAlign = "center"
neatHeader.fontSize = 20
neatHeader.positionX = 0
neatHeader.positionY = 140
neatHeader.hAlign = "center"

/*
export var neatenter = new UIText(neatBG)
neatenter.color = Color4.White()
neatenter.value = "Enter code"
neatenter.vAlign = "center"
neatenter.hTextAlign = "center"
neatenter.fontSize = 15
neatenter.positionY = 75
neatenter.hAlign = "center"
*/


export var neatCode = new UIText(neatBG)
neatCode.color = Color4.White()
neatCode.value = "Enter code below:\nx349"
neatCode.vAlign = "center"
neatCode.hAlign = "center"
neatCode.hTextAlign = "center"
neatCode.fontSize = 15
neatCode.positionY = 75


export var neatInput = new UIInputText(neatBG)
neatInput.vAlign = "center"
neatInput.hAlign = "center"
neatInput.width = '15%'
neatInput.height = '25px'
neatInput.fontSize = 15
neatInput.positionY = 15
neatInput.onTextSubmit = new OnTextSubmit((x) => {
    inputcode = x.text
})
neatInput.onChanged = new OnChanged(({ value: t }) => {
    inputcode = t
  })

let imageAtlas = "src/neat/textures/confirm.png"
export let imageTexture = new Texture(imageAtlas)