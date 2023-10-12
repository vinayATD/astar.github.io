
function MapFactory()
{
    this.maps = [];
    this.maps.push(SearchMap); 
    this.maps.push(BspMap); 
    this.maps.push(MazeMap);

    this.getMap = function(cols, rows, x, y, w, h, allowDiagonals, percentWalls)
    {
        if(this.maps.length == 0) return undefined;

        var selected = floor(random(this.maps.length));
        return new this.maps[selected](cols, rows, x, y, w, h, allowDiagonals, percentWalls);
    }
}
