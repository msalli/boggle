(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Singleton Pattern - set up single, universal Board instance
var Boggle = (function() {
  var boggle;

  function createBoggle() {
    var letters = getLetters();
    var dictionary = createDictionary();
    // var answers = clearAnswers();
    var board = new Board(letters, dictionary);
    return board;
  }

  return {
    getBoggle: function() {
      if (!boggle) {
        boggle = createBoggle();
      }
      return boggle;
    }
  };

})();

// Board constructor
function Board(letters, dictionary) {
  this.letters = letters;
  this.dictionary = dictionary;
  this.answers = [];
  this.board = [
    [0,0], [0,1], [0,2], [0,3],
    [1,0], [1,1], [1,2], [1,3],
    [2,0], [2,1], [2,2], [2,3],
    [3,0], [3,1], [3,2], [3,3]
  ];
  this.potentialMoves = [
    [-1, -1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]
  ];
}

// not working how i expect
function clearAnswers() {
  return [];
}

// Get a letter for each spot on the board
function getLetters() {
  var selectedLetters = [];
  var dice = [
    ["A", "E", "A", "N", "E", "G"],
    ["A", "H", "S", "P", "C", "O"],
    ["A", "S", "P", "F", "F", "K"],
    ["W", "N", "G", "E", "E", "H"],
    ["L", "N", "H", "N", "R", "Z"],
    ["T", "S", "T", "I", "Y", "D"],
    ["O", "B", "J", "O", "A", "B"],
    ["O", "W", "T", "O", "A", "T"],
    ["I", "O", "T", "M", "U", "C"],
    ["E", "R", "T", "T", "Y", "L"],
    ["R", "Y", "V", "D", "E", "L"],
    ["T", "O", "E", "S", "S", "I"],
    ["L", "R", "E", "I", "X", "D"],
    ["T", "E", "R", "W", "H", "V"],
    ["E", "I", "U", "N", "E", "S"],
    ["N", "U", "I", "H", "M", "Qu"]
  ];

  dice.forEach(function(die) {
    var letter = die[Math.floor(Math.random() * die.length)];
    selectedLetters.push(letter);
  })

  return selectedLetters;
}

// Dictionary of 4-letter words
function createDictionary() {
  var dictionaryHash = {};
  var dictionary = ["AAHS", "AALS", "ABAS", "ABBA", "ABBE", "ABED", "ABET", "ABLE", "ABLY", "ABOS", "ABRI", "ABUT", "ABYE", "ABYS", "ACAI", "ACED", "ACES", "ACHE", "ACHY", "ACID", "ACME", "ACNE", "ACRE", "ACRO", "ACTA", "ACTS", "ACYL", "ADDS", "ADIT", "ADOS", "ADZE", "AEON", "AERO", "AERY", "AFAR", "AFRO", "AGAR", "AGAS", "AGED", "AGEE", "AGER", "AGES", "AGHA", "AGIN", "AGIO", "AGLU", "AGLY", "AGMA", "AGOG", "AGON", "AGRO", "AGUE", "AHED", "AHEM", "AHIS", "AHOY", "AIDE", "AIDS", "AILS", "AIMS", "AINS", "AIRN", "AIRS", "AIRT", "AIRY", "AITS", "AJAR", "AJEE", "AJIS", "AKEE", "AKIN", "ALAE", "ALAN", "ALAR", "ALAS", "ALBA", "ALBS", "ALEC", "ALEE", "ALEF", "ALES", "ALFA", "ALGA", "ALIF", "ALIT", "ALKY", "ALLS", "ALLY", "ALMA", "ALME", "ALMS", "ALOE", "ALOW", "ALPS", "ALSO", "ALTO", "ALTS", "ALUM", "AMAH", "AMAS", "AMBO", "AMEN", "AMIA", "AMID", "AMIE", "AMIN", "AMIR", "AMIS", "AMMO", "AMOK", "AMPS", "AMUS", "AMYL", "ANAL", "ANAS", "ANDS", "ANES", "ANEW", "ANGA", "ANIL", "ANIS", "ANKH", "ANNA", "ANOA", "ANON", "ANSA", "ANTA", "ANTE", "ANTI", "ANTS", "ANUS", "APED", "APER", "APES", "APEX", "APOD", "APOS", "APPS", "APSE", "AQUA", "ARAK", "ARBS", "ARCH", "ARCO", "ARCS", "AREA", "AREG", "ARES", "ARFS", "ARGH", "ARIA", "ARID", "ARIL", "ARKS", "ARMS", "ARMY", "ARSE", "ARTS", "ARTY", "ARUM", "ARVO", "ARYL", "ASCI", "ASEA", "ASHY", "ASKS", "ASPS", "ATAP", "ATES", "ATMA", "ATOM", "ATOP", "AUGH", "AUKS", "AULD", "AUNT", "AURA", "AUTO", "AVER", "AVES", "AVID", "AVOS", "AVOW", "AWAY", "AWED", "AWEE", "AWES", "AWLS", "AWNS", "AWNY", "AWOL", "AWRY", "AXAL", "AXED", "AXEL", "AXES", "AXIL", "AXIS", "AXLE", "AXON", "AYAH", "AYES", "AYIN", "AZAN", "AZON", "BAAL", "BAAS", "BABA", "BABE", "BABU", "BABY", "BACH", "BACK", "BADE", "BADS", "BAFF", "BAGS", "BAHT", "BAIL", "BAIT", "BAKE", "BALD", "BALE", "BALK", "BALL", "BALM", "BALS", "BAMS", "BANC", "BAND", "BANE", "BANG", "BANI", "BANK", "BANS", "BAPS", "BARB", "BARD", "BARE", "BARF", "BARK", "BARM", "BARN", "BARS", "BASE", "BASH", "BASK", "BASS", "BAST", "BATE", "BATH", "BATS", "BATT", "BAUD", "BAWD", "BAWK", "BAWL", "BAWN", "BAYS", "BAZZ", "BEAD", "BEAK", "BEAL", "BEAM", "BEAN", "BEAR", "BEAT", "BEAU", "BECK", "BEDS", "BEDU", "BEEF", "BEEN", "BEEP", "BEER", "BEES", "BEET", "BEGS", "BELL", "BELS", "BELT", "BEMA", "BEND", "BENE", "BENS", "BENT", "BERG", "BERK", "BERM", "BEST", "BETA", "BETH", "BETS", "BEVY", "BEYS", "BHUT", "BIAS", "BIBB", "BIBE", "BIBS", "BICE", "BIDE", "BIDI", "BIDS", "BIER", "BIFF", "BIGS", "BIKE", "BILE", "BILK", "BILL", "BIMA", "BIND", "BINE", "BING", "BINS", "BINT", "BIOG", "BIOS", "BIRD", "BIRK", "BIRL", "BIRO", "BIRR", "BISE", "BISH", "BISK", "BITE", "BITS", "BITT", "BIZE", "BLAB", "BLAE", "BLAG", "BLAH", "BLAM", "BLAT", "BLAW", "BLEB", "BLED", "BLET", "BLEW", "BLIN", "BLIP", "BLOB", "BLOC", "BLOG", "BLOT", "BLOW", "BLUB", "BLUE", "BLUR", "BOAR", "BOAS", "BOAT", "BOBO", "BOBS", "BOCK", "BODE", "BODS", "BODY", "BOFF", "BOGS", "BOGY", "BOHO", "BOIL", "BOLA", "BOLD", "BOLE", "BOLL", "BOLO", "BOLT", "BOMB", "BOND", "BONE", "BONG", "BONK", "BONY", "BOOB", "BOOK", "BOOM", "BOON", "BOOR", "BOOS", "BOOT", "BOPS", "BORA", "BORE", "BORK", "BORN", "BORT", "BOSH", "BOSK", "BOSS", "BOTA", "BOTH", "BOTS", "BOTT", "BOUT", "BOWL", "BOWS", "BOXY", "BOYO", "BOYS", "BOZO", "BRAD", "BRAE", "BRAG", "BRAN", "BRAS", "BRAT", "BRAW", "BRAY", "BRED", "BREE", "BREN", "BREW", "BRIE", "BRIG", "BRIM", "BRIN", "BRIO", "BRIS", "BRIT", "BROO", "BROS", "BROW", "BRRR", "BRUT", "BRUX", "BUBO", "BUBS", "BUBU", "BUCK", "BUDS", "BUFF", "BUGS", "BUHL", "BUHR", "BULB", "BULK", "BULL", "BUMF", "BUMP", "BUMS", "BUNA", "BUND", "BUNG", "BUNK", "BUNN", "BUNS", "BUNT", "BUOY", "BURA", "BURB", "BURD", "BURG", "BURK", "BURL", "BURN", "BURP", "BURR", "BURS", "BURY", "BUSH", "BUSK", "BUSS", "BUST", "BUSY", "BUTE", "BUTS", "BUTT", "BUYS", "BUZZ", "BYES", "BYRE", "BYRL", "BYTE", "CABS", "CACA", "CADE", "CADI", "CADS", "CAFE", "CAFF", "CAFS", "CAGE", "CAGY", "CAID", "CAIN", "CAKE", "CAKY", "CALF", "CALK", "CALL", "CALM", "CALO", "CALS", "CALX", "CAME", "CAMI", "CAMO", "CAMP", "CAMS", "CANE", "CANS", "CANT", "CAPE", "CAPH", "CAPO", "CAPS", "CARB", "CARD", "CARE", "CARK", "CARL", "CARN", "CARP", "CARR", "CARS", "CART", "CASA", "CASE", "CASH", "CASK", "CAST", "CATE", "CATS", "CAUL", "CAVA", "CAVE", "CAVY", "CAWS", "CAYS", "CAZH", "CECA", "CEDE", "CEDI", "CEES", "CEIL", "CELL", "CELS", "CELT", "CENT", "CEPE", "CEPS", "CERE", "CERO", "CERT", "CESS", "CETE", "CHAD", "CHAI", "CHAM", "CHAO", "CHAP", "CHAR", "CHAT", "CHAW", "CHAY", "CHEF", "CHEM", "CHEW", "CHEZ", "CHIA", "CHIC", "CHID", "CHIN", "CHIP", "CHIS", "CHIT", "CHOC", "CHON", "CHOP", "CHOW", "CHUB", "CHUG", "CHUM", "CIAO", "CIGS", "CINE", "CINQ", "CION", "CIRE", "CIST", "CITE", "CITY", "CLAD", "CLAG", "CLAM", "CLAN", "CLAP", "CLAW", "CLAY", "CLEF", "CLEG", "CLEW", "CLIP", "CLIT", "CLOD", "CLOG", "CLON", "CLOP", "CLOT", "CLOY", "CLUB", "CLUE", "COAL", "COAT", "COAX", "COBB", "COBS", "COCA", "COCK", "COCO", "CODA", "CODE", "CODS", "COED", "COFF", "COFT", "COGS", "COHO", "COIF", "COIL", "COIN", "COIR", "COKE", "COKY", "COLA", "COLD", "COLE", "COLS", "COLT", "COLY", "COMA", "COMB", "COME", "COMM", "COMP", "CONE", "CONI", "CONK", "CONN", "CONS", "CONY", "COOF", "COOK", "COOL", "COON", "COOP", "COOS", "COOT", "COPE", "COPS", "COPY", "CORD", "CORE", "CORF", "CORK", "CORM", "CORN", "CORS", "CORY", "COSH", "COSS", "COST", "COSY", "COTE", "COTS", "COUP", "COVE", "COWL", "COWS", "COWY", "COXA", "COYS", "COZY", "CRAB", "CRAG", "CRAM", "CRAP", "CRAW", "CRED", "CREW", "CRIB", "CRIP", "CRIS", "CRIT", "CROC", "CROP", "CROW", "CRUD", "CRUS", "CRUX", "CUBE", "CUBS", "CUDS", "CUED", "CUES", "CUFF", "CUIF", "CUKE", "CULL", "CULM", "CULT", "CUMS", "CUNT", "CUPS", "CURB", "CURD", "CURE", "CURF", "CURL", "CURN", "CURR", "CURS", "CURT", "CUSK", "CUSP", "CUSS", "CUTE", "CUTS", "CWMS", "CYAN", "CYMA", "CYME", "CYST", "CZAR", "DABS", "DACE", "DADA", "DADO", "DADS", "DAFF", "DAFT", "DAGO", "DAGS", "DAHL", "DAHS", "DAIS", "DAKS", "DALE", "DALS", "DAME", "DAMN", "DAMP", "DAMS", "DANG", "DANK", "DANS", "DAPS", "DARB", "DARE", "DARK", "DARN", "DART", "DASH", "DATA", "DATE", "DATO", "DAUB", "DAUT", "DAVY", "DAWK", "DAWN", "DAWS", "DAWT", "DAYS", "DAZE", "DEAD", "DEAF", "DEAL", "DEAN", "DEAR", "DEBS", "DEBT", "DECK", "DECO", "DEED", "DEEM", "DEEP", "DEER", "DEES", "DEET", "DEFI", "DEFT", "DEFY", "DEIL", "DEKE", "DELE", "DELF", "DELI", "DELL", "DELS", "DELT", "DEME", "DEMO", "DEMY", "DENE", "DENI", "DENS", "DENT", "DENY", "DEPS", "DERE", "DERM", "DESI", "DESK", "DEVA", "DEVI", "DEVS", "DEWS", "DEWY", "DEXY", "DEYS", "DHAK", "DHAL", "DHOW", "DIAL", "DIBS", "DICE", "DICK", "DIDO", "DIDY", "DIED", "DIEL", "DIES", "DIET", "DIFF", "DIFS", "DIGS", "DIKE", "DILL", "DIME", "DIMS", "DINE", "DING", "DINK", "DINO", "DINS", "DINT", "DIOL", "DIPS", "DIPT", "DIRE", "DIRK", "DIRL", "DIRT", "DISC", "DISH", "DISK", "DISS", "DITA", "DITE", "DITS", "DITZ", "DIVA", "DIVE", "DJIN", "DOAT", "DOBE", "DOBY", "DOCK", "DOCS", "DODO", "DOER", "DOES", "DOFF", "DOGE", "DOGS", "DOGY", "DOHS", "DOIT", "DOJO", "DOLE", "DOLL", "DOLS", "DOLT", "DOME", "DOMS", "DONA", "DONE", "DONG", "DONS", "DOOB", "DOOM", "DOOR", "DOPA", "DOPE", "DOPY", "DORE", "DORK", "DORM", "DORP", "DORR", "DORS", "DORY", "DOSA", "DOSE", "DOSH", "DOSS", "DOST", "DOTE", "DOTH", "DOTS", "DOTY", "DOUM", "DOUR", "DOUT", "DOUX", "DOVE", "DOWN", "DOWS", "DOXY", "DOZE", "DOZY", "DRAB", "DRAG", "DRAM", "DRAT", "DRAW", "DRAY", "DREE", "DREG", "DREK", "DREW", "DRIB", "DRIP", "DROP", "DRUB", "DRUG", "DRUM", "DRYS", "DUAD", "DUAL", "DUBS", "DUCE", "DUCI", "DUCK", "DUCT", "DUDE", "DUDS", "DUEL", "DUES", "DUET", "DUFF", "DUGS", "DUIT", "DUKE", "DULL", "DULY", "DUMA", "DUMB", "DUMP", "DUNE", "DUNG", "DUNK", "DUNS", "DUNT", "DUOS", "DUPE", "DUPS", "DURA", "DURE", "DURN", "DURO", "DURR", "DUSK", "DUST", "DUTY", "DYAD", "DYED", "DYER", "DYES", "DYKE", "DYNE", "EACH", "EARL", "EARN", "EARS", "EASE", "EAST", "EASY", "EATH", "EATS", "EAUX", "EAVE", "EBBS", "EBON", "ECHE", "ECHO", "ECHT", "ECOS", "ECRU", "ECUS", "EDDO", "EDDY", "EDGE", "EDGY", "EDHS", "EDIT", "EEEW", "EELS", "EELY", "EERY", "EFFS", "EFTS", "EGAD", "EGAL", "EGER", "EGGS", "EGGY", "EGIS", "EGOS", "EIDE", "EKED", "EKES", "EKKA", "ELAN", "ELDS", "ELHI", "ELKS", "ELLS", "ELMS", "ELMY", "ELSE", "EMES", "EMEU", "EMIC", "EMIR", "EMIT", "EMMY", "EMOS", "EMUS", "EMYD", "ENDS", "ENGS", "ENOL", "ENOW", "ENUF", "ENVY", "EONS", "EPEE", "EPHA", "EPIC", "EPOS", "ERAS", "ERGO", "ERGS", "ERNE", "ERNS", "EROS", "ERRS", "ERST", "ERUV", "ESES", "ESNE", "ESPY", "ESSE", "ESTS", "ETAS", "ETCH", "ETHS", "ETIC", "ETNA", "ETUI", "EURO", "EVEN", "EVER", "EVES", "EVIL", "EWER", "EWES", "EXAM", "EXEC", "EXED", "EXES", "EXIT", "EXON", "EXPO", "EYAS", "EYED", "EYEN", "EYER", "EYES", "EYNE", "EYRA", "EYRE", "EYRY", "FABS", "FACE", "FACT", "FADE", "FADO", "FADS", "FAFF", "FAGS", "FAHS", "FAIL", "FAIN", "FAIR", "FAKE", "FALL", "FALX", "FAME", "FANE", "FANG", "FANO", "FANS", "FARD", "FARE", "FARL", "FARM", "FARO", "FART", "FASH", "FAST", "FATE", "FATS", "FAUN", "FAUX", "FAVA", "FAVE", "FAWN", "FAYS", "FAZE", "FEAL", "FEAR", "FEAT", "FECK", "FEDS", "FEEB", "FEED", "FEEL", "FEES", "FEET", "FEHS", "FELL", "FELT", "FEME", "FEMS", "FEND", "FENS", "FEOD", "FERE", "FERN", "FESS", "FEST", "FETA", "FETE", "FETS", "FEUD", "FEUS", "FIAR", "FIAT", "FIBS", "FICE", "FICO", "FIDO", "FIDS", "FIEF", "FIFE", "FIGS", "FILA", "FILE", "FILK", "FILL", "FILM", "FILO", "FILS", "FIND", "FINE", "FINK", "FINO", "FINS", "FIRE", "FIRM", "FIRN", "FIRS", "FISC", "FISH", "FIST", "FITS", "FIVE", "FIXT", "FIZZ", "FLAB", "FLAG", "FLAK", "FLAM", "FLAN", "FLAP", "FLAT", "FLAW", "FLAX", "FLAY", "FLEA", "FLED", "FLEE", "FLEW", "FLEX", "FLEY", "FLIC", "FLIP", "FLIR", "FLIT", "FLOC", "FLOE", "FLOG", "FLOP", "FLOW", "FLUB", "FLUE", "FLUS", "FLUX", "FOAL", "FOAM", "FOBS", "FOCI", "FOES", "FOGS", "FOGY", "FOHN", "FOIL", "FOIN", "FOLD", "FOLK", "FOND", "FONS", "FONT", "FOOD", "FOOL", "FOOS", "FOOT", "FOPS", "FORA", "FORB", "FORD", "FORE", "FORK", "FORM", "FORT", "FOSS", "FOUL", "FOUR", "FOWL", "FOXY", "FOYS", "FOZY", "FRAE", "FRAG", "FRAP", "FRAT", "FRAY", "FREE", "FRET", "FRIG", "FRIT", "FRIZ", "FROE", "FROG", "FROM", "FROW", "FRUG", "FUBS", "FUCI", "FUCK", "FUDS", "FUEL", "FUGS", "FUGU", "FUJI", "FULL", "FUME", "FUMY", "FUND", "FUNK", "FUNS", "FURL", "FURS", "FURY", "FUSE", "FUSS", "FUTZ", "FUZE", "FUZZ", "FYCE", "FYKE", "GABS", "GABY", "GACH", "GADI", "GADS", "GAED", "GAEN", "GAES", "GAFF", "GAGA", "GAGE", "GAGS", "GAIN", "GAIT", "GALA", "GALE", "GALL", "GALS", "GAMA", "GAMB", "GAME", "GAMP", "GAMS", "GAMY", "GANE", "GANG", "GAOL", "GAPE", "GAPS", "GAPY", "GARB", "GARS", "GASH", "GASP", "GAST", "GATE", "GATS", "GAUD", "GAUM", "GAUN", "GAUR", "GAVE", "GAWK", "GAWP", "GAYS", "GAZE", "GEAN", "GEAR", "GECK", "GEDS", "GEED", "GEEK", "GEES", "GEEZ", "GELD", "GELS", "GELT", "GEMS", "GENE", "GENS", "GENT", "GENU", "GERM", "GEST", "GETA", "GETS", "GEUM", "GHAT", "GHEE", "GHIS", "GIBE", "GIBS", "GIDS", "GIED", "GIEN", "GIES", "GIFS", "GIFT", "GIGA", "GIGS", "GILD", "GILL", "GILT", "GIMP", "GINK", "GINS", "GIPS", "GIRD", "GIRL", "GIRN", "GIRO", "GIRT", "GIST", "GITE", "GITS", "GIVE", "GLAD", "GLAM", "GLED", "GLEE", "GLEG", "GLEN", "GLEY", "GLIA", "GLIB", "GLIM", "GLOB", "GLOM", "GLOP", "GLOW", "GLUE", "GLUG", "GLUM", "GLUT", "GNAR", "GNAT", "GNAW", "GNUS", "GOAD", "GOAL", "GOAS", "GOAT", "GOBO", "GOBS", "GOBY", "GODS", "GOER", "GOES", "GOGO", "GOJI", "GOLD", "GOLF", "GONE", "GONG", "GOOD", "GOOF", "GOOK", "GOON", "GOOP", "GOOS", "GORE", "GORM", "GORP", "GORY", "GOSH", "GOTH", "GOUT", "GOWD", "GOWK", "GOWN", "GOYS", "GRAB", "GRAD", "GRAM", "GRAN", "GRAT", "GRAY", "GREE", "GREW", "GREY", "GRID", "GRIG", "GRIM", "GRIN", "GRIP", "GRIT", "GRIZ", "GROG", "GROK", "GROT", "GROW", "GRUB", "GRUE", "GRUM", "GUAN", "GUAR", "GUCK", "GUDE", "GUFF", "GUID", "GULF", "GULL", "GULP", "GULS", "GUMS", "GUNK", "GUNS", "GURU", "GUSH", "GUST", "GUTS", "GUVS", "GUYS", "GYBE", "GYMS", "GYNO", "GYPO", "GYPS", "GYRE", "GYRI", "GYRO", "GYVE", "HAAF", "HAAR", "HABU", "HACK", "HADE", "HADJ", "HAED", "HAEM", "HAEN", "HAES", "HAET", "HAFT", "HAGS", "HAHA", "HAHS", "HAIK", "HAIL", "HAIR", "HAJI", "HAJJ", "HAKE", "HAKU", "HALE", "HALF", "HALL", "HALM", "HALO", "HALT", "HAME", "HAMS", "HAND", "HANG", "HANK", "HANT", "HAPS", "HARD", "HARE", "HARK", "HARL", "HARM", "HARP", "HART", "HASH", "HASP", "HAST", "HATE", "HATH", "HATS", "HAUL", "HAUT", "HAVE", "HAWK", "HAWS", "HAYS", "HAZE", "HAZY", "HEAD", "HEAL", "HEAP", "HEAR", "HEAT", "HEBE", "HECK", "HEED", "HEEL", "HEFT", "HEHS", "HEIL", "HEIR", "HELD", "HELL", "HELM", "HELO", "HELP", "HEME", "HEMP", "HEMS", "HENS", "HENT", "HEPS", "HERB", "HERD", "HERE", "HERL", "HERM", "HERN", "HERO", "HERS", "HEST", "HETH", "HETS", "HEWN", "HEWS", "HICK", "HIDE", "HIED", "HIES", "HIGH", "HIKE", "HILA", "HILI", "HILL", "HILT", "HIMS", "HIND", "HINS", "HINT", "HIPS", "HIRE", "HISN", "HISS", "HIST", "HITS", "HIVE", "HIYA", "HMMM", "HOAR", "HOAX", "HOBO", "HOBS", "HOCK", "HODS", "HOED", "HOER", "HOES", "HOGG", "HOGS", "HOKE", "HOLD", "HOLE", "HOLK", "HOLM", "HOLO", "HOLP", "HOLS", "HOLT", "HOLY", "HOMA", "HOME", "HOMO", "HOMS", "HOMY", "HONE", "HONG", "HONK", "HONS", "HOOD", "HOOF", "HOOK", "HOOP", "HOOT", "HOPE", "HOPS", "HORA", "HORK", "HORN", "HOSE", "HOST", "HOTS", "HOUR", "HOVE", "HOWE", "HOWF", "HOWK", "HOWL", "HOWS", "HOYA", "HOYS", "HUBS", "HUCK", "HUED", "HUES", "HUFF", "HUGE", "HUGS", "HUIC", "HULA", "HULK", "HULL", "HUMP", "HUMS", "HUNG", "HUNH", "HUNK", "HUNS", "HUNT", "HURL", "HURT", "HUSH", "HUSK", "HUTS", "HWAN", "HWYL", "HYLA", "HYMN", "HYPE", "HYPO", "HYPS", "HYTE", "IAMB", "IBEX", "IBIS", "ICED", "ICES", "ICHS", "ICKS", "ICKY", "ICON", "IDEA", "IDEM", "IDES", "IDLE", "IDLY", "IDOL", "IDYL", "IFFY", "IGGS", "IGLU", "IKAT", "IKON", "ILEA", "ILEX", "ILIA", "ILKA", "ILKS", "ILLS", "ILLY", "IMAM", "IMID", "IMMY", "IMPI", "IMPS", "INBY", "INCH", "INFO", "INIA", "INKS", "INKY", "INLY", "INNS", "INRO", "INTI", "INTO", "IONS", "IOTA", "IRED", "IRES", "IRID", "IRIS", "IRKS", "IRON", "ISBA", "ISLE", "ISMS", "ITCH", "ITEM", "IWIS", "IXIA", "IZAR", "JABS", "JACK", "JADE", "JAGG", "JAGS", "JAIL", "JAKE", "JAMB", "JAMS", "JANE", "JAPE", "JARL", "JARS", "JATO", "JAUK", "JAUP", "JAVA", "JAWS", "JAYS", "JAZZ", "JEAN", "JEED", "JEEP", "JEER", "JEES", "JEEZ", "JEFE", "JEHU", "JELL", "JEON", "JERK", "JESS", "JEST", "JETE", "JETS", "JEUX", "JEWS", "JIAO", "JIBB", "JIBE", "JIBS", "JIFF", "JIGS", "JILL", "JILT", "JIMP", "JINK", "JINN", "JINS", "JINX", "JIRD", "JISM", "JIVE", "JIVY", "JIZZ", "JOBS", "JOCK", "JOES", "JOEY", "JOGS", "JOHN", "JOIN", "JOKE", "JOKY", "JOLE", "JOLT", "JOOK", "JOSH", "JOSS", "JOTA", "JOTS", "JOUK", "JOWL", "JOWS", "JOYS", "JUBA", "JUBE", "JUCO", "JUDO", "JUDY", "JUGA", "JUGS", "JUJU", "JUKE", "JUKU", "JUMP", "JUNK", "JUPE", "JURA", "JURY", "JUST", "JUTE", "JUTS", "KAAS", "KABS", "KADI", "KAES", "KAFS", "KAGU", "KAIF", "KAIL", "KAIN", "KAKA", "KAKI", "KALE", "KAME", "KAMI", "KANA", "KANE", "KAON", "KAPA", "KAPH", "KAPU", "KARN", "KART", "KATA", "KATS", "KAVA", "KAYO", "KAYS", "KBAR", "KEAS", "KECK", "KEEF", "KEEK", "KEEL", "KEEN", "KEEP", "KEET", "KEFS", "KEGS", "KEIR", "KELP", "KELT", "KEMP", "KENO", "KENS", "KENT", "KEPI", "KEPS", "KEPT", "KERB", "KERF", "KERN", "KETA", "KETO", "KEYS", "KHAF", "KHAN", "KHAT", "KHET", "KHIS", "KIBE", "KICK", "KIDS", "KIEF", "KIER", "KIFS", "KIKE", "KILL", "KILN", "KILO", "KILT", "KINA", "KIND", "KINE", "KING", "KINK", "KINO", "KINS", "KIPS", "KIRK", "KIRN", "KIRS", "KISS", "KIST", "KITE", "KITH", "KITS", "KIVA", "KIWI", "KLIK", "KNAP", "KNAR", "KNEE", "KNEW", "KNIT", "KNOB", "KNOP", "KNOT", "KNOW", "KNUR", "KOAN", "KOAS", "KOBO", "KOBS", "KOEL", "KOHL", "KOIS", "KOJI", "KOLA", "KOLO", "KONK", "KOOK", "KOPH", "KOPS", "KORA", "KORE", "KORS", "KOSS", "KOTO", "KRAI", "KRAY", "KRIS", "KUDO", "KUDU", "KUES", "KUFI", "KUNA", "KUNE", "KURU", "KVAS", "KYAK", "KYAR", "KYAT", "KYES", "KYTE", "LABS", "LACE", "LACK", "LACS", "LACY", "LADE", "LADS", "LADY", "LAGS", "LAHS", "LAIC", "LAID", "LAIN", "LAIR", "LAKE", "LAKH", "LAKY", "LALL", "LAMA", "LAMB", "LAME", "LAMP", "LAMS", "LAND", "LANE", "LANG", "LANK", "LAPS", "LARD", "LARI", "LARK", "LARN", "LARS", "LASE", "LASH", "LASS", "LAST", "LATE", "LATH", "LATI", "LATS", "LATU", "LAUD", "LAVA", "LAVE", "LAVS", "LAWN", "LAWS", "LAYS", "LAZE", "LAZY", "LEAD", "LEAF", "LEAK", "LEAL", "LEAN", "LEAP", "LEAR", "LEAS", "LECH", "LEDE", "LEEK", "LEER", "LEES", "LEET", "LEFT", "LEGS", "LEHR", "LEIS", "LEKE", "LEKS", "LEKU", "LEND", "LENO", "LENS", "LENT", "LEPT", "LESS", "LEST", "LETS", "LEUD", "LEVA", "LEVO", "LEVS", "LEVY", "LEWD", "LEYS", "LIAR", "LIAS", "LIBS", "LICE", "LICH", "LICK", "LIDO", "LIDS", "LIED", "LIEF", "LIEN", "LIER", "LIES", "LIEU", "LIFE", "LIFT", "LIKE", "LILO", "LILT", "LILY", "LIMA", "LIMB", "LIME", "LIMN", "LIMO", "LIMP", "LIMY", "LINE", "LING", "LINK", "LINN", "LINO", "LINS", "LINT", "LINY", "LION", "LIPA", "LIPE", "LIPO", "LIPS", "LIRA", "LIRE", "LIRI", "LISP", "LIST", "LITE", "LITS", "LITU", "LIVE", "LOAD", "LOAF", "LOAM", "LOAN", "LOBE", "LOBO", "LOBS", "LOCA", "LOCH", "LOCI", "LOCK", "LOCO", "LODE", "LOFT", "LOGE", "LOGO", "LOGS", "LOGY", "LOID", "LOIN", "LOLL", "LONE", "LONG", "LOOF", "LOOK", "LOOM", "LOON", "LOOP", "LOOS", "LOOT", "LOPE", "LOPS", "LORD", "LORE", "LORN", "LORY", "LOSE", "LOSS", "LOST", "LOTA", "LOTH", "LOTI", "LOTO", "LOTS", "LOUD", "LOUP", "LOUR", "LOUT", "LOVE", "LOWE", "LOWN", "LOWS", "LUAU", "LUBE", "LUCE", "LUCK", "LUDE", "LUDO", "LUDS", "LUES", "LUFF", "LUGE", "LUGS", "LULL", "LULU", "LUMA", "LUMP", "LUMS", "LUNA", "LUNE", "LUNG", "LUNK", "LUNS", "LUNT", "LUNY", "LURE", "LURK", "LUSH", "LUST", "LUTE", "LUTZ", "LUVS", "LUXE", "LWEI", "LYCH", "LYES", "LYNX", "LYRE", "LYSE", "MAAR", "MABE", "MACE", "MACH", "MACK", "MACS", "MADE", "MADS", "MAES", "MAGE", "MAGI", "MAGS", "MAID", "MAIL", "MAIM", "MAIN", "MAIR", "MAKE", "MAKI", "MAKO", "MALE", "MALL", "MALM", "MALT", "MAMA", "MAMS", "MANA", "MANE", "MANO", "MANS", "MANY", "MAPS", "MARA", "MARC", "MARE", "MARK", "MARL", "MARS", "MART", "MASA", "MASH", "MASK", "MASS", "MAST", "MATE", "MATH", "MATS", "MATT", "MAUD", "MAUL", "MAUN", "MAUT", "MAWN", "MAWS", "MAXI", "MAYA", "MAYO", "MAYS", "MAZE", "MAZY", "MEAD", "MEAL", "MEAN", "MEAT", "MECH", "MEDS", "MEED", "MEEK", "MEET", "MEGA", "MEGS", "MELD", "MELL", "MELS", "MELT", "MEME", "MEMO", "MEMS", "MEND", "MENO", "MENU", "MEOU", "MEOW", "MERC", "MERE", "MERK", "MERL", "MESA", "MESH", "MESS", "META", "METE", "METH", "MEWL", "MEWS", "MEZE", "MHOS", "MIBS", "MICA", "MICE", "MICK", "MICS", "MIDI", "MIDS", "MIEN", "MIFF", "MIGG", "MIGS", "MIKE", "MILD", "MILE", "MILK", "MILL", "MILO", "MILS", "MILT", "MIME", "MINA", "MIND", "MINE", "MINI", "MINK", "MINT", "MINX", "MIPS", "MIRE", "MIRI", "MIRK", "MIRS", "MIRY", "MISE", "MISO", "MISS", "MIST", "MITE", "MITT", "MITY", "MIXT", "MOAN", "MOAS", "MOAT", "MOBS", "MOCK", "MOCS", "MODE", "MODI", "MODS", "MOFO", "MOGS", "MOHO", "MOIL", "MOJO", "MOKE", "MOLA", "MOLD", "MOLE", "MOLL", "MOLS", "MOLT", "MOLY", "MOME", "MOMI", "MOMS", "MONK", "MONO", "MONS", "MONY", "MOOD", "MOOK", "MOOL", "MOON", "MOOR", "MOOS", "MOOT", "MOPE", "MOPS", "MOPY", "MORA", "MORE", "MORN", "MORS", "MORT", "MOSH", "MOSK", "MOSS", "MOST", "MOTE", "MOTH", "MOTS", "MOTT", "MOUE", "MOVE", "MOWN", "MOWS", "MOXA", "MOZO", "MUCH", "MUCK", "MUDS", "MUFF", "MUGG", "MUGS", "MULE", "MULL", "MUMM", "MUMP", "MUMS", "MUMU", "MUNG", "MUNI", "MUNS", "MUON", "MURA", "MURE", "MURK", "MURR", "MUSE", "MUSH", "MUSK", "MUSO", "MUSS", "MUST", "MUTE", "MUTS", "MUTT", "MYCS", "MYNA", "MYTH", "NAAN", "NABE", "NABS", "NADA", "NAES", "NAFF", "NAGA", "NAGS", "NAIF", "NAIL", "NALA", "NAME", "NANA", "NANO", "NANS", "NAOI", "NAOS", "NAPA", "NAPE", "NAPS", "NARC", "NARD", "NARK", "NARY", "NAVE", "NAVS", "NAVY", "NAYS", "NAZI", "NEAP", "NEAR", "NEAT", "NEBS", "NECK", "NEED", "NEEM", "NEEP", "NEGS", "NEIF", "NEMA", "NENE", "NEON", "NERD", "NESS", "NEST", "NETS", "NETT", "NEUK", "NEUM", "NEVE", "NEVI", "NEWB", "NEWS", "NEWT", "NEXT", "NIBS", "NICE", "NICK", "NIDE", "NIDI", "NIFF", "NIGH", "NILL", "NILS", "NIMS", "NINE", "NIPA", "NIPS", "NISI", "NITE", "NITS", "NIXE", "NIXY", "NOBS", "NOCK", "NODE", "NODI", "NODS", "NOEL", "NOES", "NOGG", "NOGS", "NOIL", "NOIR", "NOLO", "NOMA", "NOME", "NOMS", "NONA", "NONE", "NOOK", "NOON", "NOPE", "NORI", "NORM", "NOSE", "NOSH", "NOSY", "NOTA", "NOTE", "NOUN", "NOUS", "NOVA", "NOWS", "NOWT", "NUBS", "NUDE", "NUFF", "NUGS", "NUKE", "NULL", "NUMB", "NUNS", "NURD", "NURL", "NUTS", "NYAH", "OAFS", "OAKS", "OAKY", "OARS", "OAST", "OATH", "OATS", "OATY", "OBAS", "OBES", "OBEY", "OBIA", "OBIS", "OBIT", "OBOE", "OBOL", "OCAS", "OCHE", "ODAH", "ODAS", "ODDS", "ODEA", "ODES", "ODIC", "ODOR", "ODYL", "OFAY", "OFFA", "OFFS", "OGAM", "OGEE", "OGLE", "OGRE", "OHED", "OHIA", "OHMS", "OIKS", "OILS", "OILY", "OINK", "OKAS", "OKAY", "OKEH", "OKES", "OKRA", "OLDE", "OLDS", "OLDY", "OLEA", "OLEO", "OLES", "OLIO", "OLLA", "OMAS", "OMEN", "OMER", "OMIT", "ONCE", "ONES", "ONLY", "ONOS", "ONTO", "ONUS", "ONYX", "OOHS", "OOPS", "OOTS", "OOZE", "OOZY", "OPAH", "OPAL", "OPAS", "OPED", "OPEN", "OPES", "OPTS", "OPUS", "ORAD", "ORAL", "ORBS", "ORBY", "ORCA", "ORCS", "ORDO", "ORES", "ORGS", "ORGY", "ORLE", "ORRA", "ORTS", "ORYX", "ORZO", "OSAR", "OSES", "OSSA", "OTIC", "OTTO", "OUCH", "OUDS", "OUPH", "OURS", "OUST", "OUTA", "OUTS", "OUZO", "OVAL", "OVEN", "OVER", "OVUM", "OWED", "OWES", "OWLS", "OWLY", "OWNS", "OWSE", "OWTS", "OXEN", "OXER", "OXES", "OXIC", "OXID", "OXIM", "OYER", "OYES", "OYEZ", "PAAN", "PACA", "PACE", "PACK", "PACS", "PACT", "PACY", "PADI", "PADS", "PAGE", "PAID", "PAIK", "PAIL", "PAIN", "PAIR", "PAKS", "PALE", "PALI", "PALL", "PALM", "PALP", "PALS", "PALY", "PAMS", "PANE", "PANG", "PANS", "PANT", "PAPA", "PAPS", "PARA", "PARD", "PARE", "PARK", "PARR", "PARS", "PART", "PASE", "PASH", "PASS", "PAST", "PATE", "PATH", "PATS", "PATY", "PAUA", "PAVE", "PAWL", "PAWN", "PAWS", "PAYS", "PEAG", "PEAK", "PEAL", "PEAN", "PEAR", "PEAS", "PEAT", "PECH", "PECK", "PECS", "PEDS", "PEED", "PEEK", "PEEL", "PEEN", "PEEP", "PEER", "PEES", "PEGS", "PEHS", "PEIN", "PEKE", "PELE", "PELF", "PELT", "PEND", "PENS", "PENT", "PEON", "PEPO", "PEPS", "PERC", "PERE", "PERI", "PERK", "PERM", "PERP", "PERT", "PERV", "PESO", "PEST", "PETS", "PEWS", "PFFT", "PFUI", "PHAT", "PHEW", "PHIS", "PHIZ", "PHON", "PHOS", "PHOT", "PHUT", "PIAL", "PIAN", "PIAS", "PICA", "PICE", "PICK", "PICS", "PIED", "PIER", "PIES", "PIGS", "PIKA", "PIKE", "PIKI", "PILE", "PILI", "PILL", "PILY", "PIMA", "PIMP", "PINA", "PINE", "PING", "PINK", "PINS", "PINT", "PINY", "PION", "PIPA", "PIPE", "PIPS", "PIPY", "PIRN", "PISH", "PISO", "PISS", "PITA", "PITH", "PITS", "PITY", "PIXY", "PLAN", "PLAT", "PLAY", "PLEA", "PLEB", "PLED", "PLEW", "PLEX", "PLIE", "PLOD", "PLOP", "PLOT", "PLOW", "PLOY", "PLUG", "PLUM", "PLUS", "POCK", "POCO", "PODS", "POEM", "POET", "POGO", "POGY", "POIS", "POKE", "POKY", "POLE", "POLL", "POLO", "POLS", "POLY", "POME", "POMO", "POMP", "POMS", "POND", "PONE", "PONG", "PONS", "PONY", "POOD", "POOF", "POOH", "POOL", "POON", "POOP", "POOR", "POOS", "POPE", "POPS", "PORE", "PORK", "PORN", "PORT", "POSE", "POSH", "POST", "POSY", "POTS", "POUF", "POUR", "POUT", "POWS", "POXY", "PRAM", "PRAO", "PRAT", "PRAU", "PRAY", "PREE", "PREP", "PREX", "PREY", "PREZ", "PRIG", "PRIM", "PROA", "PROB", "PROD", "PROF", "PROG", "PROM", "PROP", "PROS", "PROW", "PSIS", "PSST", "PTUI", "PUBS", "PUCE", "PUCK", "PUDS", "PUDU", "PUFF", "PUGH", "PUGS", "PUJA", "PUKE", "PULA", "PULE", "PULI", "PULK", "PULL", "PULP", "PULS", "PUMA", "PUMP", "PUNA", "PUNG", "PUNK", "PUNS", "PUNT", "PUNY", "PUPA", "PUPS", "PUPU", "PURE", "PURI", "PURL", "PURR", "PURS", "PUSH", "PUSS", "PUTS", "PUTT", "PUTZ", "PYAS", "PYES", "PYIC", "PYIN", "PYRE", "PYRO", "QADI", "QAID", "QATS", "QOPH", "QUAD", "QUAG", "QUAI", "QUAY", "QUEY", "QUID", "QUIN", "QUIP", "QUIT", "QUIZ", "QUOD", "RACE", "RACK", "RACY", "RADS", "RAFF", "RAFT", "RAGA", "RAGE", "RAGG", "RAGI", "RAGS", "RAIA", "RAID", "RAIL", "RAIN", "RAIS", "RAJA", "RAKE", "RAKI", "RAKU", "RALE", "RAMI", "RAMP", "RAMS", "RAND", "RANG", "RANI", "RANK", "RANT", "RAPE", "RAPS", "RAPT", "RARE", "RASE", "RASH", "RASP", "RATE", "RATH", "RATO", "RATS", "RAVE", "RAWS", "RAYA", "RAYS", "RAZE", "RAZZ", "READ", "REAL", "REAM", "REAP", "REAR", "REBS", "RECK", "RECS", "REDD", "REDE", "REDO", "REDS", "REED", "REEF", "REEK", "REEL", "REES", "REFS", "REFT", "REGS", "REIF", "REIN", "REIS", "RELY", "REMS", "REND", "RENO", "RENT", "REPO", "REPP", "REPS", "RESH", "REST", "RETE", "RETS", "REVS", "RHEA", "RHOS", "RHUS", "RIAL", "RIAS", "RIBS", "RICE", "RICH", "RICK", "RIDE", "RIDS", "RIEL", "RIFE", "RIFF", "RIFS", "RIFT", "RIGS", "RILE", "RILL", "RIME", "RIMS", "RIMY", "RIND", "RING", "RINK", "RINS", "RIOT", "RIPE", "RIPS", "RISE", "RISK", "RITE", "RITZ", "RIVE", "ROAD", "ROAM", "ROAN", "ROAR", "ROBE", "ROBS", "ROCK", "ROCS", "RODE", "RODS", "ROES", "ROIL", "ROLE", "ROLF", "ROLL", "ROMP", "ROMS", "ROOD", "ROOF", "ROOK", "ROOM", "ROOS", "ROOT", "ROPE", "ROPY", "ROSE", "ROSY", "ROTA", "ROTE", "ROTI", "ROTL", "ROTO", "ROTS", "ROUE", "ROUP", "ROUT", "ROUX", "ROVE", "ROWS", "RUBE", "RUBS", "RUBY", "RUCK", "RUDD", "RUDE", "RUED", "RUER", "RUES", "RUFF", "RUGA", "RUGS", "RUIN", "RUKH", "RULE", "RULY", "RUMP", "RUMS", "RUNE", "RUNG", "RUNS", "RUNT", "RUSE", "RUSH", "RUSK", "RUST", "RUTH", "RUTS", "RYAS", "RYES", "RYKE", "RYND", "RYOT", "RYUS", "SABE", "SABS", "SACK", "SACS", "SADE", "SADI", "SAFE", "SAGA", "SAGE", "SAGO", "SAGS", "SAGY", "SAID", "SAIL", "SAIN", "SAKE", "SAKI", "SALE", "SALL", "SALP", "SALS", "SALT", "SAME", "SAMP", "SAND", "SANE", "SANG", "SANK", "SANS", "SAPS", "SARD", "SARI", "SARK", "SASH", "SASS", "SATE", "SATI", "SAUL", "SAVE", "SAWN", "SAWS", "SAYS", "SCAB", "SCAD", "SCAG", "SCAM", "SCAN", "SCAR", "SCAT", "SCOP", "SCOT", "SCOW", "SCRY", "SCUD", "SCUM", "SCUP", "SCUT", "SEAL", "SEAM", "SEAR", "SEAS", "SEAT", "SECS", "SECT", "SEED", "SEEK", "SEEL", "SEEM", "SEEN", "SEEP", "SEER", "SEES", "SEGO", "SEGS", "SEIF", "SEIS", "SELF", "SELL", "SELS", "SEME", "SEMI", "SEND", "SENE", "SENT", "SEPS", "SEPT", "SERA", "SERE", "SERF", "SERS", "SESH", "SETA", "SETS", "SETT", "SEVS", "SEWN", "SEWS", "SEXT", "SEXY", "SHAD", "SHAG", "SHAH", "SHAM", "SHAT", "SHAW", "SHAY", "SHEA", "SHED", "SHEN", "SHES", "SHEW", "SHHH", "SHIM", "SHIN", "SHIP", "SHIT", "SHIV", "SHMO", "SHOD", "SHOE", "SHOG", "SHOO", "SHOP", "SHOT", "SHOW", "SHRI", "SHUL", "SHUN", "SHUT", "SHWA", "SIAL", "SIBB", "SIBS", "SICE", "SICK", "SICS", "SIDE", "SIDH", "SIFT", "SIGH", "SIGN", "SIGS", "SIKA", "SIKE", "SILD", "SILK", "SILL", "SILO", "SILT", "SIMA", "SIMP", "SIMS", "SINE", "SING", "SINH", "SINK", "SINS", "SIPE", "SIPS", "SIRE", "SIRS", "SITE", "SITH", "SITS", "SIZE", "SIZY", "SKAG", "SKAS", "SKAT", "SKED", "SKEE", "SKEG", "SKEP", "SKEW", "SKID", "SKIM", "SKIN", "SKIP", "SKIS", "SKIT", "SKOL", "SKRY", "SKUA", "SLAB", "SLAG", "SLAM", "SLAP", "SLAT", "SLAW", "SLAY", "SLED", "SLEW", "SLID", "SLIM", "SLIP", "SLIT", "SLOB", "SLOE", "SLOG", "SLOP", "SLOT", "SLOW", "SLUB", "SLUE", "SLUG", "SLUM", "SLUR", "SLUT", "SMEW", "SMIT", "SMOG", "SMUG", "SMUT", "SNAG", "SNAP", "SNAW", "SNED", "SNIB", "SNIP", "SNIT", "SNOB", "SNOG", "SNOT", "SNOW", "SNUB", "SNUG", "SNYE", "SOAK", "SOAP", "SOAR", "SOBA", "SOBS", "SOCA", "SOCK", "SODA", "SODS", "SOFA", "SOFT", "SOHS", "SOIL", "SOJA", "SOJU", "SOKE", "SOLA", "SOLD", "SOLE", "SOLI", "SOLO", "SOLS", "SOMA", "SOME", "SOMS", "SONE", "SONG", "SONS", "SOOK", "SOON", "SOOT", "SOPH", "SOPS", "SORA", "SORB", "SORD", "SORE", "SORI", "SORN", "SORT", "SOTH", "SOTS", "SOUK", "SOUL", "SOUP", "SOUR", "SOUS", "SOWN", "SOWS", "SOYA", "SOYS", "SPAE", "SPAM", "SPAN", "SPAR", "SPAS", "SPAT", "SPAY", "SPAZ", "SPEC", "SPED", "SPEW", "SPIC", "SPIK", "SPIN", "SPIT", "SPIV", "SPOT", "SPRY", "SPUD", "SPUE", "SPUN", "SPUR", "SRIS", "STAB", "STAG", "STAR", "STAT", "STAW", "STAY", "STEM", "STEP", "STET", "STEW", "STEY", "STIR", "STOA", "STOB", "STOP", "STOT", "STOW", "STUB", "STUD", "STUM", "STUN", "STYE", "SUBA", "SUBS", "SUCH", "SUCK", "SUDD", "SUDS", "SUED", "SUER", "SUES", "SUET", "SUGH", "SUIT", "SUKH", "SUKS", "SULK", "SULU", "SUMI", "SUMO", "SUMP", "SUMS", "SUMY", "SUNG", "SUNK", "SUNN", "SUNS", "SUPE", "SUPS", "SUQS", "SURA", "SURD", "SURE", "SURF", "SUSS", "SWAB", "SWAG", "SWAM", "SWAN", "SWAP", "SWAT", "SWAY", "SWIG", "SWIM", "SWOB", "SWOP", "SWOT", "SWUM", "SYBO", "SYCE", "SYKE", "SYLI", "SYNC", "SYNE", "SYPH", "TABS", "TABU", "TACE", "TACH", "TACK", "TACO", "TACT", "TADS", "TAEL", "TAGS", "TAHR", "TAIL", "TAIN", "TAKA", "TAKE", "TALA", "TALC", "TALE", "TALI", "TALK", "TALL", "TAME", "TAMP", "TAMS", "TANG", "TANK", "TANS", "TAOS", "TAPA", "TAPE", "TAPS", "TARE", "TARN", "TARO", "TARP", "TARS", "TART", "TASE", "TASK", "TASS", "TATE", "TATS", "TAUS", "TAUT", "TAVS", "TAWS", "TAXA", "TAXI", "TEAK", "TEAL", "TEAM", "TEAR", "TEAS", "TEAT", "TECH", "TECS", "TEDS", "TEED", "TEEL", "TEEM", "TEEN", "TEES", "TEFF", "TEGG", "TEGS", "TEGU", "TEIN", "TELA", "TELE", "TELL", "TELS", "TEMP", "TEND", "TENS", "TENT", "TEPA", "TERM", "TERN", "TEST", "TETH", "TETS", "TEWS", "TEXT", "THAE", "THAN", "THAT", "THAW", "THEE", "THEM", "THEN", "THEW", "THEY", "THIN", "THIO", "THIR", "THIS", "THOU", "THRO", "THRU", "THUD", "THUG", "THUS", "TIAN", "TICK", "TICS", "TIDE", "TIDY", "TIED", "TIER", "TIES", "TIFF", "TIKE", "TIKI", "TILE", "TILL", "TILS", "TILT", "TIME", "TINE", "TING", "TINS", "TINT", "TINY", "TIPI", "TIPS", "TIRE", "TIRL", "TIRO", "TITI", "TITS", "TIVY", "TIYN", "TIZZ", "TOAD", "TOBY", "TOCK", "TOCO", "TODS", "TODY", "TOEA", "TOED", "TOES", "TOFF", "TOFT", "TOFU", "TOGA", "TOGS", "TOIL", "TOIT", "TOKE", "TOLA", "TOLD", "TOLE", "TOLL", "TOLT", "TOLU", "TOMB", "TOME", "TOMS", "TONE", "TONG", "TONS", "TONY", "TOOK", "TOOL", "TOOM", "TOON", "TOOT", "TOPE", "TOPH", "TOPI", "TOPO", "TOPS", "TORA", "TORC", "TORE", "TORI", "TORN", "TORO", "TORR", "TORS", "TORT", "TORY", "TOSA", "TOSH", "TOSS", "TOST", "TOTE", "TOTS", "TOUR", "TOUT", "TOWN", "TOWS", "TOWY", "TOYO", "TOYS", "TRAD", "TRAM", "TRAP", "TRAY", "TREE", "TREF", "TREK", "TREM", "TRES", "TRET", "TREY", "TRIG", "TRIM", "TRIO", "TRIP", "TROD", "TROG", "TROP", "TROT", "TROU", "TROW", "TROY", "TRUE", "TRUG", "TSAR", "TSKS", "TUBA", "TUBE", "TUBS", "TUCK", "TUFA", "TUFF", "TUFT", "TUGS", "TUIS", "TULE", "TUMP", "TUMS", "TUNA", "TUNE", "TUNG", "TUNS", "TUPS", "TURD", "TURF", "TURK", "TURN", "TURR", "TUSH", "TUSK", "TUTS", "TUTU", "TWAE", "TWAS", "TWAT", "TWEE", "TWIG", "TWIN", "TWIT", "TWOS", "TYEE", "TYER", "TYES", "TYIN", "TYKE", "TYNE", "TYPE", "TYPO", "TYPP", "TYPY", "TYRE", "TYRO", "TZAR", "UDON", "UDOS", "UGHS", "UGLY", "UKES", "ULAN", "ULNA", "ULUS", "ULVA", "UMBO", "UMMA", "UMPH", "UMPS", "UNAI", "UNAU", "UNBE", "UNCI", "UNCO", "UNDE", "UNDO", "UNDY", "UNIS", "UNIT", "UNTO", "UPAS", "UPBY", "UPDO", "UPON", "URBS", "URDS", "UREA", "URGE", "URIC", "URNS", "URPS", "URSA", "URUS", "USED", "USER", "USES", "UTAS", "UTES", "UVEA", "VACS", "VAGI", "VAIL", "VAIN", "VAIR", "VALE", "VAMP", "VANE", "VANG", "VANS", "VARA", "VARS", "VARY", "VASA", "VASE", "VAST", "VATS", "VATU", "VAUS", "VAVS", "VAWS", "VEAL", "VEEP", "VEER", "VEES", "VEGA", "VEIL", "VEIN", "VELA", "VELD", "VENA", "VEND", "VENT", "VERA", "VERB", "VERT", "VERY", "VEST", "VETO", "VETS", "VEXT", "VIAL", "VIBE", "VICE", "VIDE", "VIDS", "VIED", "VIER", "VIES", "VIEW", "VIFF", "VIGA", "VIGS", "VILE", "VILL", "VIMS", "VINA", "VINE", "VINO", "VINS", "VINY", "VIOL", "VIRL", "VISA", "VISE", "VITA", "VIVA", "VIVE", "VLEI", "VLOG", "VOES", "VOGS", "VOID", "VOLE", "VOLK", "VOLT", "VOTE", "VOWS", "VROW", "VUGG", "VUGH", "VUGS", "VULN", "WAAH", "WABS", "WACK", "WADE", "WADI", "WADS", "WADY", "WAES", "WAFF", "WAFT", "WAGE", "WAGS", "WAIF", "WAIL", "WAIN", "WAIR", "WAIT", "WAKE", "WALE", "WALI", "WALK", "WALL", "WALY", "WAME", "WAND", "WANE", "WANK", "WANS", "WANT", "WANY", "WAPS", "WARD", "WARE", "WARK", "WARM", "WARN", "WARP", "WARS", "WART", "WARY", "WASH", "WASP", "WAST", "WATS", "WATT", "WAUK", "WAUL", "WAUR", "WAVE", "WAVY", "WAWL", "WAWS", "WAXY", "WAYS", "WEAK", "WEAL", "WEAN", "WEAR", "WEBS", "WEDS", "WEED", "WEEK", "WEEL", "WEEN", "WEEP", "WEER", "WEES", "WEET", "WEFT", "WEIR", "WEKA", "WELD", "WELL", "WELT", "WEND", "WENS", "WENT", "WEPT", "WERE", "WERT", "WEST", "WETA", "WETS", "WHAM", "WHAP", "WHAT", "WHEE", "WHEN", "WHET", "WHEW", "WHEY", "WHID", "WHIG", "WHIM", "WHIN", "WHIP", "WHIR", "WHIT", "WHIZ", "WHOA", "WHOM", "WHOP", "WHUP", "WHYS", "WICH", "WICK", "WIDE", "WIFE", "WIGS", "WIKI", "WILD", "WILE", "WILL", "WILT", "WILY", "WIMP", "WIND", "WINE", "WING", "WINK", "WINO", "WINS", "WINY", "WIPE", "WIRE", "WIRY", "WISE", "WISH", "WISP", "WISS", "WIST", "WITE", "WITH", "WITS", "WIVE", "WOAD", "WOES", "WOGS", "WOKE", "WOKS", "WOLD", "WOLF", "WOMB", "WONK", "WONS", "WONT", "WOOD", "WOOF", "WOOL", "WOOS", "WOPS", "WORD", "WORE", "WORK", "WORM", "WORN", "WORT", "WOST", "WOTS", "WOVE", "WOWS", "WRAP", "WREN", "WRIT", "WUSS", "WYCH", "WYES", "WYLE", "WYND", "WYNN", "WYNS", "WYTE", "XYST", "YACK", "YAFF", "YAGE", "YAGI", "YAGS", "YAKS", "YALD", "YAMS", "YANG", "YANK", "YAPS", "YARD", "YARE", "YARN", "YAUD", "YAUP", "YAWL", "YAWN", "YAWP", "YAWS", "YAYS", "YEAH", "YEAN", "YEAR", "YEAS", "YECH", "YEGG", "YELD", "YELK", "YELL", "YELP", "YENS", "YEOW", "YEPS", "YERK", "YETI", "YETT", "YEUK", "YEWS", "YIDS", "YILL", "YINS", "YIPE", "YIPS", "YIRD", "YIRR", "YLEM", "YOBS", "YOCK", "YODH", "YODS", "YOGA", "YOGH", "YOGI", "YOKE", "YOKS", "YOLK", "YOMP", "YOND", "YONI", "YOOF", "YORE", "YOUR", "YOUS", "YOWE", "YOWL", "YOWS", "YUAN", "YUCA", "YUCH", "YUCK", "YUGA", "YUKS", "YULE", "YUPS", "YURT", "YUTZ", "YUZU", "YWIS", "ZAGS", "ZANY", "ZAPS", "ZARF", "ZEAL", "ZEBU", "ZEDA", "ZEDS", "ZEES", "ZEIN", "ZEKS", "ZEPS", "ZERK", "ZERO", "ZEST", "ZETA", "ZIGS", "ZILL", "ZINC", "ZINE", "ZING", "ZINS", "ZIPS", "ZITI", "ZITS", "ZIZZ", "ZOEA", "ZOIC", "ZONA", "ZONE", "ZONK", "ZOOM", "ZOON", "ZOOS", "ZORI", "ZOUK", "ZYME"];
  dictionary.forEach(function(entry) {
    dictionaryHash[entry] = true;
  });

  return dictionaryHash;
}

module.exports = Boggle;
},{}],2:[function(require,module,exports){
var Timer = require('./timer');
var UserActions = require('./user-actions');
var Boggle = require('./boggle').getBoggle();

document.addEventListener("DOMContentLoaded", function(event) {
  UserActions.handleUserEntry();
  UserActions.handleSubmit();

  // Start New Game
  $('.btn-new-game').click(function() {
    var newLetters = Boggle.letters;
    Boggle.answers = [];

    // UI STUFF
    var boggleSquares = $('.boggle-board').find('.boggle-letter')
    boggleSquares.each(function(index, square) {
      $(square).text(newLetters[index]);
    })

    $('.btn-new-game').fadeOut('fast');
    $('.overlay').fadeOut('fast');
    Timer.initializeClock(new Date());

    // start request to get answers
    $.ajax({
      url: "/solve",
      method: "GET",
      data: { letters: Boggle.letters }
    }).done(function(data) {
      Boggle.answers = data['answers'];
    })
  });
});

},{"./boggle":1,"./timer":3,"./user-actions":4}],3:[function(require,module,exports){
var Boggle = require('./boggle').getBoggle();
var UserActions = require('./user-actions')

var Timer = {

  initializeClock: function(startTime) {
    var timerEl = document.getElementById('boggle-timer');

    var timeInterval = setInterval(function() {
      var timer = Timer.countdown(startTime);
      if (timer.seconds < 10) {
        timer.seconds = "0" + timer.seconds
      }

      timerEl.textContent = timer.minutes + ":" + timer.seconds

      if (timer.total <= 0) {
        window.clearInterval(timeInterval);
        timerEl.textContent = "Time's up!"
        var formInput = document.getElementById('word');
        var submitButton = document.querySelector('.submit-btn');
        formInput.setAttribute('disabled', 'disabled');
        submitButton.setAttribute('disabled', 'disabled');
        Timer.gameOver(Boggle.answers, UserActions.submittedWords, UserActions.points);
      }

    }, 1000)
  },

  countdown: function(startTime) {
    // 180000
    var time = (Date.parse(startTime) + 4000) - Date.parse(new Date());
    var seconds = Math.floor( (time/1000) % 60 );
    var minutes = Math.floor( (time/1000/60) % 60 );

    return {
      'total': time,
      'minutes': minutes,
      'seconds': seconds
    }
  },

  gameOver: function(answers, userAnswers, points) {
    var parentDiv = document.querySelector('.game-over');
    var allWordsDiv = document.querySelector('.all-words');
    var totalPoints = answers.length * 4;
    var userPoints;

    for (var i = 0; i < answers.length; i++) {
      var newEl = document.createElement('h5');
      var textNode = document.createTextNode(answers[i]);
      newEl.appendChild(textNode);
      newEl.classList.add('boggle-answer');

      if (userAnswers.indexOf(answers[i]) !== -1) {
        newEl.classList.add('winner');
        userPoints += answers[i].length;
      }

      allWordsDiv.appendChild(newEl);
    }

    document.querySelector('.boggle-word-bank').removeChild(document.querySelector('.submitted-words'))
    parentDiv.classList.remove('hidden');
  }

}


module.exports = Timer;






},{"./boggle":1,"./user-actions":4}],4:[function(require,module,exports){
var Boggle = require('./boggle').getBoggle();

var UserActions = {

  trackHistory: [],
  validPotentialMoves: [],
  letters: Boggle.letters,
  dictionary: Boggle.dictionary,
  board: Boggle.board,
  potentialMoves: Boggle.potentialMoves,
  submittedWords: [],
  points: 0,

  // submitting a word
  handleSubmit: function() {
    $('form').submit(function(event) {
      event.preventDefault();
      var formInput = $(this).find('#word')
      var value = formInput.val();

      $.ajax({
        url: "/add-word",
        method: "POST",
        data: { word: value }
      }).done(function(data) {
        var word = data['displayWords']
        // reset
        formInput.val('');
        UserActions.trackHistory = [];
        UserActions.validPotentialMoves = [];

        // save word and calculate points
        UserActions.submittedWords.push(word);
        if (UserActions.dictionary.hasOwnProperty(word)) {
          UserActions.points = UserActions.points + word.length
          $('.point-tracker').text(UserActions.points)
        }

        // UI STUFF
        $('.submitted-words').append("<h5>" + word + "</h5>");
        $('.boggle-letter').removeClass('highlight');
        $('#invalidEntry').addClass('hidden');
      }).fail(function() {
        console.log("something done broke");
      })
    });
  },

  getIndexForSquare: function(value) {
    var board = UserActions.board;

    for(var i = 0; i < board.length; i++) {
      if (board[i][0] === value[0] && board[i][1] === value[1]) {
        return i;
      }
    }
    return -1;
  },

  getValidMoves: function(currentSquare) {
    var potentialMoves = UserActions.potentialMoves;

    // clear potential moves from last entry
    if (UserActions.validPotentialMoves.length !== 0) {
      UserActions.validPotentialMoves = [];
    }

    // find all adjacent squares
    for (var i = 0; i < potentialMoves.length; i++) {
      var adjacentSquare = [currentSquare[0] + potentialMoves[i][0], currentSquare[1] + potentialMoves[i][1]];
      var adjacentSquareIndex = UserActions.getIndexForSquare(adjacentSquare);

      // if square is on the board and hasn't already been selected
      if (adjacentSquareIndex !== -1 && UserActions.trackHistory.indexOf(adjacentSquareIndex) === -1) {
        UserActions.validPotentialMoves.push(adjacentSquareIndex);
      }
    }
  },

  createHistory: function(boardIndex) {
    var currentSquare = UserActions.board[boardIndex];
    UserActions.trackHistory.push(boardIndex);
    UserActions.getValidMoves(currentSquare);
  },

  handleInvalidEntry: function(formElement) {
    document.getElementById('invalidEntry').classList.remove('hidden');
    return
  },

  handleUserEntry: function () {
    var formInput = document.getElementById('word');
    var boggleBoardEl = document.querySelector('.boggle-board');
    var letters = UserActions.letters;

    // handle keyboard entry
    formInput.onkeydown = function(event) {
      var value = String.fromCharCode(event.keyCode);
      if (letters.indexOf(value) !== -1) {
        // use the entered value to figure out letter, instead of index...
        var index = letters.indexOf(value);

          console.log("value" + value)
          console.log("index" + index)
          console.log(UserActions.validPotentialMoves)
          if (UserActions.validPotentialMoves.length === 0 || UserActions.validPotentialMoves.indexOf(index) !== -1) {
            UserActions.createHistory(index);
          } else {
            console.log("catch 1")
            UserActions.handleInvalidEntry(formInput);
          }

        // UI STUFF
        var boggleLetter = document.querySelectorAll('.boggle-letter')[index];
        boggleLetter.classList.add('highlight');
      } else {
        if (index !== undefined) {
          UserActions.handleInvalidEntry(formInput);
        }
      }

    }

    // handle click on square
    boggleBoardEl.onclick = function(event) {
      if (event.target.classList.contains('boggle-letter')) {
        var index = parseInt(event.target.dataset.boardIndex);

          if (UserActions.validPotentialMoves.length === 0 || UserActions.validPotentialMoves.indexOf(index) !== -1) {
            UserActions.createHistory(index);
          } else {
            console.log("catch 3")
            UserActions.handleInvalidEntry(formInput);
          }

        //UI STUFF
        var boggleLetter = event.target;
        boggleLetter.classList.add('highlight');
        formInput.value += boggleLetter.textContent;
      }
    }
  }


}

module.exports = UserActions;
},{"./boggle":1}]},{},[2]);
