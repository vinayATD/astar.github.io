
function AStarPathFinder(map, start, end, allowDiagonals) {
    this.map = map;
    this.lastCheckedNode = start;
    this.openSet = [];
    
    this.openSet.push(start);
    this.closedSet = [];
    this.start = start;
    this.end = end;
    this.allowDiagonals = allowDiagonals;    

    this.visualDist = function(a, b) {
        return dist(a.i, a.j, b.i, b.j);
    }

    this.heuristic = function(a, b) {
        var d;
        if (allowDiagonals) {
            d = dist(a.i, a.j, b.i, b.j);
        } else {
            d = abs(a.i - b.i) + abs(a.j - b.j);
        }
        return d;
    }

    this.removeFromArray = function(arr, elt) {
        
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == elt) {
                arr.splice(i, 1);
            }
        }
    }

    this.step = function() {

        if (this.openSet.length > 0) {

            
            var w = 0;
            for (var i = 1; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[w].f) {
                    w = i;
                }
                
                if (this.openSet[i].f == this.openSet[w].f) {
                    
                    if (this.openSet[i].g > this.openSet[w].g) {
                        w = i;
                    }
                    
                    
                    if (!this.allowDiagonals) {
                        if (this.openSet[i].g == this.openSet[w].g &&
                            this.openSet[i].vh < this.openSet[w].vh) {
                            w = i;
                        }
                    }
                }
            }
            var current = this.openSet[w];
            this.lastCheckedNode = current;

            
            if (current === this.end) {
                console.log("DONE!");
                return 1;
            }

            
            this.removeFromArray(this.openSet, current);
            this.closedSet.push(current);

            
            var neighbors = current.getNeighbors();

            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                
                if (!this.closedSet.includes(neighbor)) {
                    
                    var tempG = current.g + this.heuristic(neighbor, current);

                    
                    if (!this.openSet.includes(neighbor)) {
                        this.openSet.push(neighbor);
                    } else if (tempG >= neighbor.g) {
                        
                        continue;
                    }

                    neighbor.g = tempG;
                    neighbor.h = this.heuristic(neighbor, end);
                    if (!allowDiagonals) {
                        neighbor.vh = this.visualDist(neighbor, end);
                    }
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }

            }
            return 0;
            
        } else {
            console.log('no solution');
            return -1;
        }
    }
}
