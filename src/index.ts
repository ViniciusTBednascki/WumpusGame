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

	const caveMap: Array<Array<ICave>> = new Array(height).fill(false).map(() => new Array(width).fill(defaultCave))
	
	return caveMap
}

function generateObjectPosition(width: number, height: number): [x: number, y: number] {
	const y = Math.floor(Math.random() * height)

	const minX = y != 0 ? 0 : 1
	const x = Math.floor(Math.random() * (width - minX) + minX)

	return [x,y]
}

const caveMap = generateMap(4, 4)