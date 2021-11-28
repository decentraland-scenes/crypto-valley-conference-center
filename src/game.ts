import * as utils from '@dcl/ecs-scene-utils'
import { initiateVJUI } from './adminVJ'
import { hud } from './builderhud/BuilderHUD'
import { Dispenser } from './dispenser'
import { updateCoinData } from './marketData'
import { startParty } from './partyUpstairs'

const STREAM_URL = `https://dclstreams.com/hosted/live/cryptovalleycc/index.m3u8`

//'https://video.dcl.guru/live/conferencecenter1/index.m3u8'
//'https://pili-live-hls-live.8btc.com/8btclive/20210113160033_6.m3u8'

//'https://video.dcl.guru/live/conventioncenter/index.m3u8'

//'https://video.dcl.guru/live/dclcoretv/index.m3u8'

//'https://video.dcl.guru/live/anorak/index.m3u8'
//'https://video.dcl.guru/live/nftlondon/index.m3u8'

//////// HACK TO SEE POSITIONS

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
//   //   log(`pos: `, Camera.instance.position)
//   //   log(`rot: `, Camera.instance.rotation)
//   log(
//     `{ position: new Vector3(`,
//     Camera.instance.position.x,
//     ',',
//     Camera.instance.position.y,
//     ',',
//     Camera.instance.position.z,
//     `),
// 		rotation: new Quaternion(`,
//     Camera.instance.rotation.x,
//     ',',
//     Camera.instance.rotation.y,
//     ',',
//     Camera.instance.rotation.z,
//     ',',
//     Camera.instance.rotation.w,
//     `),
// 	  },`,
//     Camera.instance.worldPosition,
//     Camera.instance.feetPosition
//   )
// })

let building = new Entity()
building.addComponent(new GLTFShape('models/DCL_CC.glb'))
building.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(building)

// let turtle = new Entity()
// turtle.addComponent(new GLTFShape('models/turtle.glb'))
// turtle.addComponent(
//   new Transform({
//     position: new Vector3(56, 1.25, 55.8),
//     rotation: Quaternion.Euler(0, 180, 0),
//     scale: new Vector3(1.7, 1.7, 1.7),
//   })
// )
// engine.addEntity(turtle)

let lights1 = new Entity()
lights1.addComponent(new GLTFShape('models/LightSet_1.glb'))
lights1.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lights1)

let lights2 = new Entity()
lights2.addComponent(new GLTFShape('models/LightSet_2.glb'))
lights2.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lights2)

let lightsA = new Entity()
lightsA.addComponent(new GLTFShape('models/Lights_A.glb'))
lightsA.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lightsA)

let lightsB = new Entity()
lightsB.addComponent(new GLTFShape('models/Lights_B.glb'))
lightsB.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lightsB)

let elevator = new Entity()
elevator.addComponent(new GLTFShape('models/elevator.glb'))
elevator.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(elevator)

//// MUSIC

export const VideoTrigger = new Entity()
VideoTrigger.addComponent(
  new Transform({ position: new Vector3(56, 10, 26 + 8) })
)

let VideoTriggerBox = new utils.TriggerBoxShape(
  new Vector3(80, 30, 70),
  Vector3.Zero()
)
VideoTrigger.addComponent(
  new utils.TriggerComponent(
    VideoTriggerBox, //shape
    {
      onCameraEnter: () => {
        v.playing = true
        log('triggered!')
      },
      onCameraExit: () => {
        v.playing = false
        //music.playing = false
      },
    }
  )
)
engine.addEntity(VideoTrigger)

export const largeScreen = new Entity()
largeScreen.addComponent(new PlaneShape())
largeScreen.addComponent(
  new Transform({
    position: new Vector3(56, 13.9, 61),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(10 * 3.2, 5.6 * 3.2, 0.01),
  })
)
export const v = new VideoTexture(new VideoClip(STREAM_URL))
v.playing = false

const mat = new Material()
mat.albedoTexture = v
mat.roughness = 1
largeScreen.addComponent(mat)
engine.addEntity(largeScreen)

updateCoinData()

startParty()

initiateVJUI()

let text = new Texture("images/banner.jpeg")
export let image = new Entity("big image")
image.addComponent(new PlaneShape())
image.addComponent(new Material())
image.getComponent(Material).albedoTexture = text
image.addComponent(new Transform({position: new Vector3(57.2,4.4,20.76), rotation: Quaternion.Euler(0,0,180), scale: new Vector3(14,7,1)}))
engine.addEntity(image)
hud.attachToEntity(image)