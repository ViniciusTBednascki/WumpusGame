interface ICave {
	treasure: boolean;
	wumpus: boolean;
	pit: boolean;
	stench: boolean;
	breeze: boolean;
}

interface IEntitiesQuantities {
	treasure: number;
	wumpus: number;
	pit: number;
}

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}


function generateMap(size: [ width: number, height: number]): Array<Array<ICave>> {
	const [width, height] = size;
	const defaultCave: ICave = {
		treasure: false,
		wumpus: false,
		pit: false,
		stench: false,
		breeze: false,
	}
	
	const entitiesQuantities: IEntitiesQuantities = {
		treasure: 1,
		wumpus: 1,
		pit: 3
	}
	
	const entitiesPositions: Map<string,string> = generateEntitiesPostions(entitiesQuantities, size);
	
	const caveMap: Array<Array<ICave>> = generateCaves(entitiesPositions, size);
	
	return caveMap
}

function generateEntitiesPostions(entitiesQuantities: IEntitiesQuantities, size: [ width: number, height: number]): Map<string,string> {
	const entitiesPositions = new Map<string,string>()

	for (const [key, value] of Object.entries(entitiesQuantities)) {
		for (let index = 0; index < value; index++) {
			let positioned = false;
			while (!positioned) {
				const [x,y] = generateObjectPosition(size)
				const positionString = `${x},${y}`

				const hasPosition = entitiesPositions.has(positionString)
				if(!hasPosition) { entitiesPositions.set(positionString, key); positioned = true }
			}
		}
	}

	return entitiesPositions
}

function generateObjectPosition(size: [ width: number, height: number]): [x: number, y: number] {
	const [width, height] = size;

	const y = Math.floor(Math.random() * height)
	
	const min = 2
	const minX = y < min ? min : 0

	const x = Math.floor(Math.random() * (width - minX) + minX)

	return [x,y]
}

function generateCaves(entitiesPositions: Map<string,string>, size): Array<Array<ICave>> {
	const [width, height] = size;
	const caveMap: Array<Array<ICave>> = new Array(height).fill(false).map(() => new Array(width).fill(false))

	caveMap.forEach((row, y) => {
		row.forEach((cave, x) => {
			caveMap[y][x] = {
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

function moveAgent(caveMap: Array<Array<ICave>>, agentPosition: number[], direction: Direction): [died: boolean, moved: boolean, cave: ICave] {
	const directionNumber = {
		"UP": [0,-1],
		"DOWN": [0,1],
		"LEFT": [-1,0],
		"RIGHT": [1,0],
	}

	const [newX, newY] = agentPosition.map((coordinate, index) => coordinate + directionNumber[direction][index])

	const canMove = agentCanMove(caveMap,newX, newY)
	let ICave = caveMap[agentPosition[1]][agentPosition[0]];
	if (canMove) {
		ICave = caveMap[newY][newX]
	}

	return [false, true, ICave]
}

function agentCanMove(caveMap: Array<Array<ICave>>, newX: number, newY: number): boolean {
	const height = caveMap.length
	const width = caveMap[0].length
	
	const possibleX = newX >= 0 && newX < width
	const possibleY = newY >= 0 && newY < height

	return (possibleX && possibleY)
}

const caveMap = generateMap([4, 4])
const agentPosition = [0,0]
console.log(caveMap[agentPosition[1]][agentPosition[0]])
const result = moveAgent(caveMap, agentPosition, Direction.Right)
console.log(result)