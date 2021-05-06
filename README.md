# Crypto Valley Convention Center

The convention center is a venue that hosts all kinds of live events with a live streaming screen.

![](screenshot/screenshot.png)

This scene shows you:

- How to stream video and audio
- How to trigger the playing of video or audio streams with trigger aras
- How to handle a POAP dispenser
- How to allowlist players as admins with special permissions in a scene
- How to teleport a player within a scene
- How to fetch data from an API to display market values in a scene


## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Scene Usage**

The main lobby has a screen that can be hooked up to video streams, then upstairs there's alo a sound stream and a video stream that projects onto some spinning cubes. When the player is in the lobby, only the stream downstairs runs. If the player goes upstairs, only the upstairs streams run.

There's a POAP dispenser machine that connects to a server to hand out POAP tokens to visitors.

The back of the building shows the price of a few coins, with data fetched on loading from the Binance API.

Admin users that are whitelisted by name can access a special UI to send announcement messages or to kick out problematic players, teleporting them to the 0,0 of the scene.
