import { LngLat, LngLatBounds } from 'maplibre-gl'

function getSWCoordinates(coordinatesCollection: Array<[number, number]>) {
  const lowestLng = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[0]),
  )
  const lowestLat = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[1]),
  )

  return [lowestLng, lowestLat]
}

function getNECoordinates(coordinatesCollection: Array<[number, number]>) {
  const highestLng = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[0]),
  )
  const highestLat = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[1]),
  )

  return [highestLng, highestLat]
}

export function calcBoundsFromCoordinates(
  coordinatesCollection: Array<[number, number]>,
) {
  const swCoords = getSWCoordinates(coordinatesCollection)
  const neCoords = getNECoordinates(coordinatesCollection)
  const sw = new LngLat(swCoords[0], swCoords[1])
  const ne = new LngLat(neCoords[0], neCoords[1])
  const bounds = new LngLatBounds(sw, ne)
  return bounds
}
