var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
function generateMap(size) {
    var width = size[0], height = size[1];
    var defaultCave = {
        treasure: false,
        wumpus: false,
        pit: false,
        stench: false,
        breeze: false
    };
    var entitiesQuantities = {
        treasure: 1,
        wumpus: 1,
        pit: 3
    };
    var entitiesPositions = generateEntitiesPostions(entitiesQuantities, size);
    var caveMap = generateCaves(entitiesPositions, size);
    return caveMap;
}
function generateEntitiesPostions(entitiesQuantities, size) {
    var entitiesPositions = new Map();
    for (var _i = 0, _a = Object.entries(entitiesQuantities); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        for (var index = 0; index < value; index++) {
            var positioned = false;
            while (!positioned) {
                var _c = generateObjectPosition(size), x = _c[0], y = _c[1];
                var positionString = "".concat(x, ",").concat(y);
                var hasPosition = entitiesPositions.has(positionString);
                if (!hasPosition) {
                    entitiesPositions.set(positionString, key);
                    positioned = true;
                }
            }
        }
    }
    return entitiesPositions;
}
function generateObjectPosition(size) {
    var width = size[0], height = size[1];
    var y = Math.floor(Math.random() * height);
    var min = 2;
    var minX = y < min ? min : 0;
    var x = Math.floor(Math.random() * (width - minX) + minX);
    return [x, y];
}
function generateCaves(entitiesPositions, size) {
    var width = size[0], height = size[1];
    var caveMap = new Array(height).fill(false).map(function () { return new Array(width).fill(false); });
    caveMap.forEach(function (row, y) {
        row.forEach(function (cave, x) {
            caveMap[y][x] = {
                treasure: false,
                wumpus: false,
                pit: false,
                stench: false,
                breeze: false
            };
            var entitie = entitiesPositions.get("".concat(x, ",").concat(y));
            if (entitie) {
                caveMap[y][x][entitie] = true;
            }
        });
    });
    return caveMap;
}
function moveAgent(caveMap, agentPosition, direction) {
    var directionNumber = {
        "UP": [0, -1],
        "DOWN": [0, 1],
        "LEFT": [-1, 0],
        "RIGHT": [1, 0]
    };
    var _a = agentPosition.map(function (coordinate, index) { return coordinate + directionNumber[direction][index]; }), newX = _a[0], newY = _a[1];
    var canMove = agentCanMove(caveMap, newX, newY);
    var ICave = caveMap[agentPosition[1]][agentPosition[0]];
    if (canMove) {
        ICave = caveMap[newY][newX];
    }
    return [false, true, ICave];
}
function agentCanMove(caveMap, newX, newY) {
    var height = caveMap.length;
    var width = caveMap[0].length;
    var possibleX = newX >= 0 && newX < width;
    var possibleY = newY >= 0 && newY < height;
    return (possibleX && possibleY);
}
var caveMap = generateMap([4, 4]);
var agentPosition = [0, 2];
console.log(caveMap[agentPosition[1]][agentPosition[0]]);
var result = moveAgent(caveMap, agentPosition, Direction.Right);
console.log(result);
