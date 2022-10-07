import { isPreviewMode } from "@decentraland/EnvironmentAPI"
import { getUserData } from "@decentraland/Identity"
import { signedFetch } from "@decentraland/SignedFetch"
import { claimlink, endTime, showMessage, socket, starTime, verified, verify } from "./neat"
import { neatText } from "./ui"


export var STOP_ANIMATE = "stopanimate"
export var CLEAR_UI = "clearUI"
export var CLEAR_PRESS = "clearpress"
export var CHECK_VALID = 'checkvalid'

export var showing = false
export var invalidCounter = 0

export type PeerResponse = {
  ok: boolean
  peers: {
    id: string
    address: string
    lastPing: number
    parcel: [number, number]
    position: [number, number, number]
  }[]
}

export class NeatSystem {
    base:number
    timer:number
    action:string
    entity:any
    loop: boolean

    constructor(time:number, action:string, entity:any, loop: boolean){
        this.base = time
        this.timer = time
        this.entity = entity
        this.action = action
        this.loop = loop
    }
    async update(dt: number) {
        if (this.timer > 0) {
          this.timer -= dt
        } else {
          this.timer = this.base
          switch(this.action){
             case CLEAR_UI:
                neatText.visible = false
                break;

              case CLEAR_PRESS:
              this.entity.enablePress(false)
                break;

              case CHECK_VALID:
                try {
                  let userdata = await getUserData()
                  if(userdata?.hasConnectedWeb3){
                    if(invalidCounter < 10){
                    const response = await signedFetch(claimlink + "/dcl/validate?id="+this.entity.id) // fetch("https://peer.decentraland.org/comms/peers")
                    let json
                    if (response.text) {
                      json = await JSON.parse(response.text)
                      log(json)
                    }
                    if (json && json.valid) {
                      log("we have valid request", json)
                      verify()
                      engine.removeSystem(this)
                    }
                    else{
                      log('invalid request =>', json.reason)
                      invalidCounter++
                    }
                  }
                  else{
                    log('Cannot validate user after multiple attempts')
                    engine.removeSystem(this)
                    engine.removeEntity(this.entity)
                    socket.close()
                    showMessage("Can't validate position.\nPlease Refresh for NEAT.", 5, CLEAR_UI, null)
                  }
                }
                else{
                  engine.removeSystem(this)
                  showMessage("Can't validate position", 5, CLEAR_UI, null)
                }
                } catch (error) {
                  log(error)
                }
                break;
          }
          if(!this.loop){
            engine.removeSystem(this)
          }
        }
      }
    }

export class TimerSystem {

  neat:Entity
  host:Entity

  constructor(neat:Entity, host: Entity){
    this.neat = neat
    this.host = host
  }
  update(dt:number){
    let now = Math.floor(Date.now()/1000)
      if(now >= starTime && now <= endTime && verified){
        //log('we are in time')
        if(!showing){
          showing = true
          this.neat.setParent(this.host)
        }
        //this.neat.getComponent(Transform).scale.setAll(1)
      }
      else{
        if(showing){
          engine.removeEntity(this.neat)
        }
        //log('we are out of time')
        //this.neat.getComponent(Transform).scale.setAll(0)
      }
  }
}