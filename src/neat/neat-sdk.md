# NEAT SDK instructions

- Unzip and move the neat folder into your scene folder -> src folder
- Inside your game.ts file, copy and paste the below code anywhere you want your neat to show up

```
import { neat } from "./neat/neat";
neat.init(
    false, //display locally for admin
    true, //hide avatars around the neat
    1, //distance to click neat
    {position: new Vector3(8,1,8)}, //neat position in scene
    null //if you have the builder hud, pass hud, if not, pass null
    )
```