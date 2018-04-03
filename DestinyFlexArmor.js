// DestinyFlexArmor
// Finds which stat split combinations in armor pieces will produce the most options for a Tier 12 build in Bungie's game 'Destiny 1'.

// FileSystem module for writing results to txt file
var fs = require('fs');

// Armor piece stat splits and point values (highest rolls assumed)
var head = [
  {
    name: "head",
    split: "I/d",
    int: 65,
    dis: 46,
    str: 0
  },
  {
    name: "head",
    split: "i/D",
    int: 46,
    dis: 65,
    str: 0
  },
  {
    name: "head",
    split: "I/s",
    int: 65,
    dis: 0,
    str: 46
  },
  {
    name: "head",
    split: "i/S",
    int: 46,
    dis: 0,
    str: 65
  },
  {
    name: "head",
    split: "D/s",
    int: 0,
    dis: 65,
    str: 46
  },
  {
    name: "head",
    split: "d/S",
    int: 0,
    dis: 46,
    str: 65
  }
];

var chest = [
  {
    name: "chest",
    split: "I/d",
    int: 86,
    dis: 61,
    str: 0
  },
  {
    name: "chest",
    split: "i/D",
    int: 61,
    dis: 86,
    str: 0
  },
  {
    name: "chest",
    split: "I/s",
    int: 86,
    dis: 0,
    str: 61
  },
  {
    name: "chest",
    split: "i/S",
    int: 61,
    dis: 0,
    str: 86
  },
  {
    name: "chest",
    split: "D/s",
    int: 0,
    dis: 86,
    str: 61
  },
  {
    name: "chest",
    split: "d/S",
    int: 0,
    dis: 61,
    str: 86
  }
];

var arms = [
  {
    name: "arms",
    split: "I/d",
    int: 58,
    dis: 41,
    str: 0
  },
  {
    name: "arms",
    split: "i/D",
    int: 41,
    dis: 58,
    str: 0
  },
  {
    name: "arms",
    split: "I/s",
    int: 58,
    dis: 0,
    str: 41
  },
  {
    name: "arms",
    split: "i/S",
    int: 41,
    dis: 0,
    str: 58
  },
  {
    name: "arms",
    split: "D/s",
    int: 0,
    dis: 58,
    str: 41
  },
  {
    name: "arms",
    split: "d/S",
    int: 0,
    dis: 41,
    str: 58
  }
];

var legs = [
  {
    name: "legs",
    split: "I/d",
    int: 79,
    dis: 56,
    str: 0
  },
  {
    name: "legs",
    split: "i/D",
    int: 56,
    dis: 79,
    str: 0
  },
  {
    name: "legs",
    split: "I/s",
    int: 79,
    dis: 0,
    str: 56
  },
  {
    name: "legs",
    split: "i/S",
    int: 56,
    dis: 0,
    str: 79
  },
  {
    name: "legs",
    split: "D/s",
    int: 0,
    dis: 79,
    str: 56
  },
  {
    name: "legs",
    split: "d/S",
    int: 0,
    dis: 56,
    str: 79
  }
];

var classItem = [
  {
    name: "class",
    split: "I/d",
    int: 35,
    dis: 25,
    str: 0
  },
  {
    name: "class",
    split: "i/D",
    int: 25,
    dis: 35,
    str: 0
  },
  {
    name: "class",
    split: "I/s",
    int: 35,
    dis: 0,
    str: 25
  },
  {
    name: "class",
    split: "i/S",
    int: 25,
    dis: 0,
    str: 35
  },
  {
    name: "class",
    split: "D/s",
    int: 0,
    dis: 35,
    str: 25
  },
  {
    name: "class",
    split: "d/S",
    int: 0,
    dis: 25,
    str: 35
  }
];

var ghost = [
  {
    name: "ghost",
    split: "I/d",
    int: 35,
    dis: 25,
    str: 0
  },
  {
    name: "ghost",
    split: "i/D",
    int: 25,
    dis: 35,
    str: 0
  },
  {
    name: "ghost",
    split: "I/s",
    int: 35,
    dis: 0,
    str: 25
  },
  {
    name: "ghost",
    split: "i/S",
    int: 25,
    dis: 0,
    str: 35
  },
  {
    name: "ghost",
    split: "D/s",
    int: 0,
    dis: 35,
    str: 25
  },
  {
    name: "ghost",
    split: "d/S",
    int: 0,
    dis: 25,
    str: 35
  }
];

var artifact = [
  {
    name: "artifact",
    split: "I/d",
    int: 81,
    dis: 51,
    str: 0
  },
  {
    name: "artifact",
    split: "i/D",
    int: 38,
    dis: 94,
    str: 0
  },
  {
    name: "artifact",
    split: "I/s",
    int: 81,
    dis: 0,
    str: 38
  },
  {
    name: "artifact",
    split: "i/S",
    int: 38,
    dis: 0,
    str: 81
  },
  {
    name: "artifact",
    split: "D/s",
    int: 0,
    dis: 81,
    str: 38
  },
  {
    name: "artifact",
    split: "d/S",
    int: 0,
    dis: 38,
    str: 81
  }
];

var collection = [];

var armorSet = [head, arms, chest, legs, classItem, artifact, ghost];

// Iterates through all combinations to see what qualifies for a given stat bar set
function judge(i, d, s) {
  for (var thisHead = 0; thisHead < 6; thisHead++) {
    for (var thisArm = 0; thisArm < 6; thisArm++) {
      for (var thisChest = 0; thisChest < 6; thisChest++) {
        for (var thisLeg = 0; thisLeg < 6; thisLeg++) {
          for (var thisClass = 0; thisClass < 6; thisClass++) {
            for (var thisArt = 0; thisArt < 6; thisArt++) {
              for (var thisGhost = 0; thisGhost < 6; thisGhost++) {
                var thisBuild = [
                  armorSet[0][thisHead], 
                  armorSet[1][thisArm], 
                  armorSet[2][thisChest], 
                  armorSet[3][thisLeg], 
                  armorSet[4][thisClass], 
                  armorSet[5][thisArt], 
                  armorSet[6][thisGhost] 
                ];
                var statTotal = {
                  int: 0,
                  dis: 0,
                  str: 0
                };
                thisBuild.forEach(function(ele) {
                  statTotal.int += ele.int;
                  statTotal.dis += ele.dis;
                  statTotal.str += ele.str;
                });
                // ensure statTotal meets minimum statSet requirement
                if (statTotal.int >= i * 60 && statTotal.dis >= d * 60 && statTotal.str >= s * 60) {
                  var int = Math.floor(statTotal.int / 60);
                  var dis = Math.floor(statTotal.dis / 60);
                  var str = Math.floor(statTotal.str / 60);
                  if (int > 5 || dis > 5 || str > 5) {
                    break;
                  } else {
                    var build = {
                      splits: [],
                      statSet: []
                    };
                    // convert splits into all-uppercase so point allocation is moot when appending statSets
                    thisBuild.forEach(ele => {
                      var capSplit = ele.split.toUpperCase();
                      build.splits.push(capSplit);
                    });
                    // 
                    build.splits = build.splits.join(" ");
                    build.statSet.push(int+"/"+dis+"/"+str);
                    // add first qualifying build to [collection]
                    if (collection.length === 0) {
                      collection.push(build);
                    } else {
                      // check for duplicate build in [collection]
                      var dupeIndex = checkDupe(build);
                      if (dupeIndex) {
                        // check for duplicate statSet in duplicate build
                        var statIndex = checkDupeStatSet(dupeIndex, build);
                        if (!statIndex) {
                          collection[dupeIndex].statSet.push(build.statSet[0]);
                        }
                      } else {
                        collection.push(build);
                      } 
                    }
                  }
                }  
              }
            }
          }
        }
      }
    }
  }
}

function checkDupe(build) {
  // check each build already in [collection]
  for (var z = 0; z < collection.length; z++) {
    // check if new build is already present in [collection]
    if (collection[z].splits === build.splits) {
      // [collection] already has new build; return index number
      return z;
    }
  }
  // new build not already present in [collection]
  return false;
};

function checkDupeStatSet(dupeIndex, build) {
  // check each StatSet in duplicate build
  for (var z = 0; z < collection[dupeIndex].statSet.length; z++) {
    // determine if new statSet is already present in duplicate build
    if (collection[dupeIndex].statSet.includes(build.statSet[0])) {
      // statSet is already present in duplicate build
      return true;
    }
  }
  // statSet not already present in duplicate build
  return false;
};

// search each combination of stat bars
function run() {
  for (var i = 2 ; i < 6 ; i++) {
    for (var d = 2 ; d < 6 ; d++) {
      for (var s = 2 ; s < 6 ; s++) {
        // limit process to Tier 12
        if (i + d + s === 12) {
          console.log("Testing for "+i+"/"+d+"/"+s)
          judge(i, d, s);
        }
      }
    }
  }
}

run();

// sort collection by number of Tier-12 options
collection.sort(function(a, b){
  return b.statSet.length - a.statSet.length;
});

// remove txt file then write results to new
if (fs.existsSync("./DestinyFlexArmor.txt")) {
  fs.unlinkSync('./DestinyFlexArmor.txt', (err) => {
    if (err) throw err;
  })
  console.log('./DestinyFlexArmor.txt was deleted');
}
fs.appendFile("./DestinyFlexArmor.txt", "Destiny 1 Flexible Tier-12 Generator\nHead/Arms/Chest/Legs/Class/Artifact/Ghost\n", function(error) {
  if (error) {
    console.error("write error: " + error.message);
  }
  collection.forEach(ele => {
    // output results to console
    console.log(ele.splits+" --- "+ele.statSet);
    // output results to txt file
    fs.appendFile("./DestinyFlexArmor.txt", ele.splits+" --- "+ele.statSet+"\n", function(error) {
      if (error) {
        console.error("write error: " + error.message);
      }
    })
  })
});