interface ICave {
	agent: boolean;
	treasure: boolean;
	wumpus: boolean;
	pit: boolean;
	stench: boolean;
	breeze: boolean;
}

function generateMap(width: number, height: number): Array<Array<ICave>> {
	const defaultCave: ICave = {
		agent: false,
		treasure: false,
		wumpus: false,
		pit: false,
		stench: false,
		breeze: false,
	}

	const caveMap: Array<Array<ICave>> = new Array(height).fill(false).map(() => new Array(width).fill(false))

	const entitiesQuantities: Object = {
		treasure: 1,
		wumpus: 1,
		pit: 3
	}
	
	const entitiesPositions = new Map()

	for (const [key, value] of Object.entries(entitiesQuantities)) {
		for (let index = 0; index < value; index++) {
			let positioned = false;
			while (!positioned) {
				const [x,y] = generateObjectPosition(width, height)
				const positionString = `${x},${y}`

				const hasPosition = entitiesPositions.has(positionString)
				if(!hasPosition) { entitiesPositions.set(positionString, key); positioned = true }
			}
		}
	}
	console.log(entitiesPositions)
	caveMap.forEach((row, y) => {
		row.forEach((cave, x) => {
			caveMap[y][x] = {
				agent: false,
				treasure: false,
				wumpus: false,
				pit: false,
				stench: false,
				breeze: false,
			}

			const entitie = entitiesPositions.get(`${x},${y}`)
			if(entitie) { caveMap[y][x][entitie] =  true}
		})
	})

	return caveMap
}

function generateObjectPosition(width: number, height: number): [x: number, y: number] {
	const y = Math.floor(Math.random() * height)
	
	const min = 2
	const minX = y < min ? min : 0

	const x = Math.floor(Math.random() * (width - minX) + minX)

	return [x,y]
}

const caveMap = generateMap(4, 4)