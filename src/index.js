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
var caveMap = generateMap([4, 4]);
for (var index = 0; index < caveMap.length; index++) {
    var cave = caveMap[index];
    console.log(cave);
}
