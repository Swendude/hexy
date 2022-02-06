# Procgen notes

Generate interesting biomes

## Hex parameters

Every hex has the following parameters that determines the hex's type

- Elevation, how high is the hex ([-1 <-> 1])
- Temperature, what is the temperature of the hex ([-1 <-> 1])
- Vegetation, if there is vegetation on the hex ([0 | 1])

## Elevation types

- Deep water
- Water
- Wetland
- Plains
- Vegetation
- Highland
- Mountain

## Temp types

- Cold
- Moderate
- Hot

## Vegetation types

- Vegetation
- Barren

## Type matrices

| _Temp\Elevation_ | _Deep water_ | _Water_ | _Wetland_ | _Plains_ | _Highland_ | _Mountain_     |
| ---------------- | ------------ | ------- | --------- | -------- | ---------- | -------------- |
| _Cold_           | Deep water   | Ice     | Snow      | Snow     | Snow dunes | Snowy Mountain |
| _Moderate_       | Deep water   | Water   | Swamp     | Grass    | Hills      | Mountain       |
| _Hot_            | Deep water   | Water   | Beach     | Sand     | Sand dunes | Mesa           |

| _Type\Vegetation_ | _Vegetation_     |
| ----------------- | ---------------- |
| Grass             | Broadleaf forest |
| Hills             | Conifer forest   |
| Snow Dunes        | Conifer forest   |
| Sand              | Cacti            |
| Sand Dunes        | Shrubbery        |
| Beach             | Palm Trees       |
