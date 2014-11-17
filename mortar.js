// **** MORTAR ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// Set up the mortar object which gets fired
// and which will eventually be the parent of 
// an Explosion object.
// Each turn, it will be asked to update its
// position based on its velocity and check whether
// it should have exploded
ML.MortarModule = (function(){

  // Position and velocity variables are objects
  // with x and y coordinates.

  // Hard code the initial display radius
  var _initialRadius = 10;

  // Construct a new mortar object by initializing
  // all necessary variables
  function Mortar(pos, vel){
    this.pos = {};
    this.vel = {};
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.vel.x = vel.x;
    this.vel.y = vel.y;
    this.radius = _initialRadius;
    this.exploded = false;
  }

  // Draw a circle at the right position
  Mortar.prototype.render = function(){
    $mortar = $("<div></div>")
        .addClass("mortar")
        .css("width",   this.radius + "px" )
        .css("height",  this.radius + "px" )
        .css("left",    this.pos.x - this.radius / 2 )
        .css("top",     this.pos.y - this.radius / 2 )
    $("#playing-field").append($mortar);
  }

  // For each "tic" of the game, increment
  // the motion of the mortar.
  // If the new position is out of bounds, explode.
  Mortar.prototype.tic = function(){
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
    this.vel.y = this.vel.y + .5;  // Gravity

    if(ML.BoardModule.checkCoordsOutOfBounds(this.pos)){
      console.log(this.pos);
      this.explode();
    }
  }

  // Explode the mortar by removing it from the main
  // mortars queue and replacing it with an Explosion
  // that's created at the nearest in-bounds coords
  Mortar.prototype.explode = function(){
    console.log("BOOM");
    this.exploded = true;
  }

  // Return all public vars and functions
  return {
    Mortar: Mortar,
  };
})()