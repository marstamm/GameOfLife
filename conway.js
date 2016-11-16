class conway {
  constructor(width, height){
    this._height = height;
    this._width = width;
    this._livingConditions = [2,3];
    this._bornConditions = [3];
    this.setupRandom();
  };

  get height() {return this._height};
  get width() {return this._width };
  getValue(w,h) {return this._field[h][w]};
  setValue(w,h,value) {this._field[h][w] = value};

  setupRandom()
  {
    this._field = new Object();
    for(var h = 0; h < this._height; h++)
    {

      this._field[h] = (this._field[h] == undefined) ? new Object() : this._field[h];
      for(var w = 0; w < this._width; w++)
      {
        this._field[h][w] = Math.round(Math.random());
      }
    }
  }

  nextStep()
  {
    var nextField = new Object();

    //Sequential iteration because of Problems with calculateLiveNeighbors
    for(var h = 0; h < this._height; h++)
    {
      nextField[h] = new Object();
      for(var w = 0; w < this._width; w++)
      {
        var LiveNeighbors = this._calculateLiveNeighbors(h,w);

        //Check if current cell is alive
        if(this._field[h][w])
        {
          nextField[h][w] = (this._livingConditions.indexOf(LiveNeighbors) > -1) ?
                            1 : 0;
        }
        else {
          nextField[h][w] = (this._bornConditions.indexOf(LiveNeighbors) > -1) ?
                            1 : 0;
        }
      }
    }
    this._field=nextField;
  }

  _calculateLiveNeighbors(h,w)
  {
    var sumOfLiveNeighbors = 0;
    for(var currentH = h-1; currentH<=h+1; currentH++)
    {
      if(currentH > -1 && currentH < this._height)
        for(var currentW = w-1; currentW<=w+1; currentW++)
        {
          sumOfLiveNeighbors += (currentW > -1 && currentW < this._width) ? this._field[currentH][currentW] : 0;
        }
    }
    return sumOfLiveNeighbors-this._field[h][w];
  }



}
