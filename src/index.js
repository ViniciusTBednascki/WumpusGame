function generateMap(width, height) {
    var defaultCave = {
        agent: false,
        treasure: false,
        wumpus: false,
        pit: false,
        stench: false,
        breeze: false
    };
    var caveMap = new Array(height).fill(false).map(function () { return new Array(width).fill(defaultCave); });
    return caveMap;
}
function generateObjectPosition(width, height) {
    var y = Math.floor(Math.random() * height);
    var minX = y != 0 ? 0 : 1;
    var x = Math.floor(Math.random() * (width - minX) + minX);
    return [x, y];
}
var caveMap = generateMap(4, 4);
