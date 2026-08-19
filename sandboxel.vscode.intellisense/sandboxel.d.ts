// =====================================
// Made by @mark-sss-coder for sandboxel
// =====================================
declare var elements: {sand:element,erase:element,drag:element,pick:element,mix:element,heat:element,cool:element,lookup:element,shock:element,paint:element,water:element,salt_water:element,sugar_water:element,seltzer:element,dirty_water:element,pool_water:element,dirt:element,mud:element,wet_sand:element,rock:element,rock_wall:element,sandstone:element,mudstone:element,plant:element,dead_plant:element,frozen_plant:element,grass:element,algae:element,concrete:element,wall:element,fire:element,bomb:element,steam:element,ice:element,rime:element,snow:element,slush:element,packed_snow:element,wood:element,smoke:element,magma:element,plasma:element,cold_fire:element,glass:element,molten_glass:element,molten_rad_glass:element,rad_glass:element,meat:element,rotten_meat:element,cured_meat:element,cooked_meat:element,frozen_meat:element,salt:element,molten_salt:element,sugar:element,flour:element,wire:element,battery:element,cloner:element,sensor:element,heater:element,cooler:element,random:element,image:element,text:element,ruler:element,select:element,copy:element,cut:element,paste:element,group:element,ungroup:element,mask:element,unpaint:element,uncharge:element,unburn:element,smash:element,void:element,sun:element,torch:element,spout:element,filler:element,lattice:element,ball:element,balloon:element,gravel:element,slime:element,cement:element,dust:element,cell:element,cancer:element,plague:element,dna:element,worm:element,frozen_worm:element,flea:element,termite:element,ant:element,spider:element,web:element,fly:element,firefly:element,bee:element,hive:element,stink_bug:element,dead_bug:element,human:element,body:element,head:element,bird:element,rat:element,frog:element,frozen_frog:element,tadpole:element,fish:element,frozen_fish:element,slug:element,snail:element,burner:element,pipe:element,pipe_wall:element,filter:element,gate:element,mixer:element,grinder:element,fuse:element,ewall:element,udder:element,bone_marrow:element,bone:element,antipowder:element,antimolten:element,antifire:element,antifluid:element,antigas:element,vertical:element,horizontal:element,ash:element,molten_ash:element,light:element,liquid_light:element,laser:element,pointer:element,charcoal:element,tinder:element,sawdust:element,hail:element,hydrogen:element,oxygen:element,nitrogen:element,helium:element,anesthesia:element,carbon_dioxide:element,bubble:element,ammonia:element,liquid_ammonia:element,oil:element,lamp_oil:element,propane:element,liquid_propane:element,methane:element,liquid_methane:element,stained_glass:element,molten_stained_glass:element,art:element,rainbow:element,static:element,border:element,clay:element,clay_soil:element,brick:element,ruins:element,adobe:element,sapling:element,pinecone:element,evergreen:element,cactus:element,kelp:element,coral:element,seeds:element,wheat_seed:element,straw:element,porcelain:element,paper:element,pollen:element,flower_seed:element,pistil:element,petal:element,tree_branch:element,vine:element,bamboo_plant:element,foam:element,acid:element,neutral_acid:element,acid_gas:element,glue:element,soda:element,gray_goo:element,malware:element,ecloner:element,virus:element,ice_nine:element,strange_matter:element,permafrost:element,melted_butter:element,melted_cheese:element,mushroom_spore:element,mushroom_stalk:element,mushroom_gill:element,mushroom_cap:element,hyphae:element,mycelium:element,mulch:element,ant_wall:element,lichen:element,antimatter:element,plastic:element,molten_plastic:element,cloth:element,cellulose:element,wax:element,melted_wax:element,incense:element,dioxin:element,insulation:element,sponge:element,bamboo:element,iron:element,copper:element,gold:element,steel:element,galvanized_steel:element,zinc:element,silver:element,tin:element,lead:element,nickel:element,aluminum:element,tungsten:element,molten_tungsten:element,brass:element,bronze:element,invar:element,sterling:element,gallium:element,molten_gallium:element,gallium_gas:element,rose_gold:element,purple_gold:element,blue_gold:element,electrum:element,pyrite:element,solder:element,amber:element,molten_copper:element,molten_copper_sulfate:element,molten_gold:element,molten_silver:element,molten_iron:element,molten_nickel:element,molten_tin:element,molten_lead:element,molten_solder:element,juice:element,juice_ice:element,broth:element,milk:element,chocolate_milk:element,fruit_milk:element,pilk:element,eggnog:element,egg:element,yolk:element,hard_yolk:element,cream:element,nut_milk:element,dough:element,batter:element,homunculus:element,butter:element,cheese:element,rotten_cheese:element,cheese_powder:element,chocolate:element,chocolate_powder:element,grape:element,vinegar:element,spice:element,herb:element,lettuce:element,pickle:element,tomato:element,sauce:element,pumpkin:element,pumpkin_seed:element,corn:element,popcorn:element,corn_seed:element,potato:element,baked_potato:element,mashed_potato:element,potato_seed:element,root:element,fiber:element,yeast:element,bread:element,toast:element,gingerbread:element,crumb:element,baked_batter:element,wheat:element,rice:element,candy:element,coffee_bean:element,coffee_ground:element,nut:element,nut_oil:element,nut_meat:element,nut_butter:element,jelly:element,baking_soda:element,yogurt:element,frozen_yogurt:element,ice_cream:element,icing:element,beans:element,dry_ice:element,nitrogen_ice:element,particleboard:element,skin:element,hair:element,alcohol:element,alcohol_gas:element,basalt:element,tuff:element,molten_tuff:element,cinnabar:element,soap:element,bleach:element,chlorine:element,liquid_chlorine:element,dye:element,ink:element,mercury:element,mercury_gas:element,solid_mercury:element,blood:element,vaccine:element,antibody:element,infection:element,poison:element,poison_gas:element,poison_ice:element,cyanide_gas:element,antidote:element,tea:element,coffee:element,honey:element,sap:element,caramel:element,molasses:element,ketchup:element,mayo:element,grease:element,fat:element,melted_chocolate:element,liquid_hydrogen:element,liquid_oxygen:element,liquid_nitrogen:element,liquid_helium:element,sodium:element,molten_sodium:element,sodium_gas:element,calcium:element,molten_calcium:element,limestone:element,quicklime:element,slaked_lime:element,potassium:element,molten_potassium:element,potassium_gas:element,magnesium:element,molten_magnesium:element,lye:element,molten_lye:element,thermite:element,molten_thermite:element,slag:element,amalgam:element,molten_aluminum:element,molten_zinc:element,neon:element,liquid_neon:element,smog:element,stench:element,liquid_stench:element,fragrance:element,perfume:element,cyanide:element,ozone:element,liquid_ozone:element,cloud:element,rain_cloud:element,snow_cloud:element,hail_cloud:element,thunder_cloud:element,acid_cloud:element,sandstorm:element,pyrocumulus:element,fire_cloud:element,rad_cloud:element,rad_steam:element,color_smoke:element,spray_paint:element,pusher:element,portal_in:element,portal_out:element,led:element,light_bulb:element,sulfur:element,molten_sulfur:element,sulfur_gas:element,copper_sulfate:element,snake:element,loopy:element,warp:element,midas_touch:element,radiation:element,fallout:element,neutron:element,proton:element,electric:element,uranium:element,molten_uranium:element,diamond:element,gold_coin:element,rust:element,oxidized_copper:element,alga:element,metal_scrap:element,glass_shard:element,rad_shard:element,brick_rubble:element,baked_clay:element,clay_shard:element,porcelain_shard:element,feather:element,confetti:element,glitter:element,bead:element,color_sand:element,caustic_potash:element,molten_caustic_potash:element,sodium_acetate:element,borax:element,epsom_salt:element,potassium_salt:element,lightning:element,bless:element,god_ray:element,heat_ray:element,freeze_ray:element,pop:element,explosion:element,n_explosion:element,supernova:element,cook:element,incinerate:element,room_temp:element,positron:element,tnt:element,c4:element,grenade:element,dynamite:element,gunpowder:element,ember:element,firework:element,fw_ember:element,nuke:element,h_bomb:element,dirty_bomb:element,emp_bomb:element,nitro:element,greek_fire:element,fireball:element,rocket:element,antibomb:element,cold_bomb:element,hot_bomb:element,antimatter_bomb:element,party_popper:element,flashbang:element,flash:element,smoke_grenade:element,landmine:element,tornado:element,earthquake:element,tsunami:element,blaster:element,armageddon:element,pressure_plate:element,slow_cloner:element,clone_powder:element,floating_cloner:element,primordial_soup:element,molten_slag:element,molten_dirt:element,debug:element,prop:element,salt_ice:element,sugar_ice:element,seltzer_ice:element,dirty_ice:element,pool_ice:element,blood_ice:element,antibody_ice:element,infection_ice:element,unknown:element,slime_ice:element,antiice:element,ammonia_ice:element,propane_ice:element,methane_ice:element,molten_brick:element,acid_ice:element,soda_ice:element,molten_steel:element,molten_galvanized_steel:element,molten_brass:element,molten_bronze:element,molten_invar:element,molten_sterling:element,molten_rose_gold:element,molten_purple_gold:element,molten_blue_gold:element,molten_electrum:element,molten_pyrite:element,broth_ice:element,frozen_vinegar:element,sauce_ice:element,alcohol_ice:element,bleach_ice:element,chlorine_ice:element,frozen_ink:element,tea_ice:element,coffee_ice:element,hydrogen_ice:element,oxygen_ice:element,molten_amalgam:element,neon_ice:element,cyanide_ice:element,molten_alga:element,molten_metal_scrap:element,molten_sodium_acetate:element,molten_borax:element,molten_epsom_salt:element,molten_potassium_salt:element,frozen_nitro:element} & Record<string,element>;
declare var categoryList: [
    "land",
    "liquids",
    "gases",
    "energy",
    "life",
    "fey",
    "tools",
    "weapons",
    "special",
    "machines"
] & string[];
declare var storedElement: elementNameString|null;
declare var elementCount: number;
declare var autoElements: {
    molten: AutoStateTemplate;
    frozen: AutoStateTemplate;
    condense: AutoStateTemplate;
    vaporize: AutoStateTemplate;
};
declare var prevElementProp: Record<string,any>|null;
declare var currentElement: elementNameString;
declare var prevElement: elementNameString;
declare var firstElement: elementNameString;
declare var onAddElementList: ((key:string,obj:element)=>void)[];
declare var currentElementProp: Record<string,any>|null;
declare function addElement(key:string,obj:element): void;
declare function onAddElement(callback:(key:string,obj:element)=>void);
declare function selectElement(elem:elementNameString,properties?:Record<string,any>);
declare function selectPrevElement(): void;
declare function mostSimilarElement(s:elementNameString): elementNameString|'';


type AutoStateTemplate = {
    behavior: behaviorPattern | ((pixel: Pixel) => void),
    hidden: boolean,
    /** Array to count the shifting of RGB */
    rgb: number[][],
    state: state,
    type: "high" | "low",
    viscosity?: number,
    tempDiff?: number
};
declare var behaviors: {
    /**
     * Falling powder, like Sand
     */
    POWDER: behaviorPattern,
    /**
     * Falling liquid, like Water
     */
    LIQUID: behaviorPattern,
    /**
     * Floating gas, like Oxygen
     */
    GAS: behaviorPattern,
    /**
     * Non-moving pixels, like Wood
     */
    WALL: behaviorPattern,
    /**
     * Pixels that only move downward, like Mud
     */
    STURDYPOWDER: behaviorPattern,
    /**
     * Falling powder that holds itself up, like Concrete
     */
    SUPPORT: behaviorPattern
} & Record<string,behaviorPattern>;
/**
 * Run any code when each individual pixel is rendered
 */
declare function renderEachPixel(func: (pixel:Pixel,ctx:CanvasRenderingContext2d)=>void): void;
/**
 * Run any code before pixels are rendered
 */
declare function renderPrePixel(func: (ctx:CanvasRenderingContext2d)=>void): void;
/**
 * Run any code after pixels are rendered
 */
declare function renderPostPixel(func: (ctx:CanvasRenderingContext2d)=>void): void;

/**
 * @example // Run code when library_test.js loads

dependOn("library_test.js", function(){
    testLibrary.logElementDensity("sand");
})
 * @example // Force load library_test.js and run code

dependOn("library_test.js", function(){
    testLibrary.logElementDensity("water");
},true)
 * @example // Change an element if chem.js is enabled

dependOn("chem.js", function(){
    elements.hydrogen_fluoride.color = "#ff0000";
})
 */
declare function dependOn(libraryFile:string,func:()=>void,forceLoad?:boolean): void;

type element = {
    id?: number,
    name?: string,
    alias?: string|string[],
    category?: category,
    desc?: string,
    extraInfo?: string,
    related?: elementNameString|elementNameString[],
    hidden?: boolean,
    darkText?: boolean,
    canPlace?: boolean,
    nocheer?: boolean,
    forceAutoGen?: boolean,
    color: colorString|colorString[],
    colorObject?: colorObject|colorObject[],
    colorOn?: colorString|colorString[],
    customColor?: boolean,
    singleColor?: boolean,
    forceSaveColor?: boolean,
    colorPattern?: colorPattern,
    colorKey?: Record<patternKey,colorString>,
    alpha?: zeroToOne,
    glow?: boolean,
    firedColors?: Record<elementNameString,colorString[]>,
    behavior?: behaviorPattern|((pixel:Pixel)=>void),
    behaviorOn?: behaviorPattern|((pixel:Pixel)=>void),
    tick?: (pixel:Pixel)=>void,
    tick1?: (pixel:Pixel)=>void,
    tick2?: (pixel:Pixel)=>void,
    tool?: (pixel:Pixel)=>void,
    onMouseUp?: (event: MouseEvent)=>void,
    onMouseDown?: (event: MouseEvent)=>void,
    onSelect?: (element: elementNameString)=>void,
    onUnselect?: (element: elementNameString)=>void,
    onPlace?: (pixel:Pixel)=>void,
    onDelete?: (pixel:Pixel)=>void,
    onChange?: (pixel:Pixel)=>void,
    onMix?: (pixel:Pixel)=>void,
    onBreak?: (pixel:Pixel)=>void,
    perTick?: ()=>void,
    hoverStat?: (pixel:Pixel)=>void,
    renderer?: (pixel:Pixel,ctx:CanvasRenderingContext2D)=>void,
    reactions?: Reactions,
    /**
     * The default temperature of pixels of the element
     */
    temp?: number,
    tempLow?: temperatureNumber,
    stateLow?: elementNameString|null,
    stateLowName?: string,
    stateLowColor?: colorString,
    stateLowColorMultiplier?: number,
    tempHigh?: temperatureNumber,
    stateHigh?: elementNameString|null,
    stateHighName?: string,
    stateHighColor?: colorString,
    stateHighColorMultiplier?: number,
    /**
     * Defines other temperatures below `tempLow` at which element turns into other elements
     */
    extraTempLow?: extraTemperature,
    /**
     * Defines other temperatures above `tempHigh` at which element turns into other elements
     */
    extraTempHigh?: extraTemperature,
    state?: state,
    density?: number,
    insulate?: boolean,
    viscosity?: number,
    conduct?: zeroToOne,
    ignoreConduct?: elementNameString[],
    superconductAt?: temperatureNumber,
    stain?: numberFromMinus1To1,
    /**
     * Whether the element can stain itself
     */
    stainSelf?: boolean,
    /**
     * Charge that pixels of the element spawn with
     */
    charge?: number,
    movable?: boolean,
    hardness?: zeroToOne,
    /**
     * Amount of food needed for an egg to be spawned
     */
    foodNeed?: number,
    properties?: Record<propertyName,defaultValue>,
    /**
     * Maximum brush size allowed when placing the element
     */
    maxSize?: number,
    /**
     * Element that will be spawned from an egg
     */
    baby?: elementNameString,
    /**
     * Element to be used as an egg (`Egg` by default)
     */
    egg?: elementNameString,
    eggColor?: colorString,
    /**
     * Element to be used as a seed of the element (when seed is the `elementNameString`)
     * Whether the element is a seed (when seed is a `boolean`)
     */
    seed?: elementNameString|boolean,
    noMix?: boolean,
    /**
     * Whether the element should ignore air density
     */
    ignoreAir?: boolean,
    /**
     * Whether the element should be excluded from random events
     */
    excludeRandom?: boolean,
    /**
     * Amount of ticks you have to wait after placing the element before you can place it again
     */
    cooldown?: number,
    /**
     * Whether the element can be mixed into Dough or Batter
     */
    isFood?: boolean,
    /**
     * Whether the element is a gas
     */
    isGas?: boolean,
    /**
     * Elements that the element will ignore (e.g. in DL, DB, CH, ST or CF behavior rules)
     */
    ignore?: elementNameString[],
    /**
     * Whether pixels of the element can contain other pixels (e.g. Pipes)
     */
    canContain?: boolean,
    /**
     * Flammability of the element
     */
    burn?: number,
    /**
     * Whether the element is burning by default
     */
    burning?: boolean,
    /**
     * Amount of ticks pixels of the element can burn for
     */
    burnTime?: number,
    burnInto?: elementNameString,
    /**
     * Whether the element can extinguish fire
     */
    extinguish?: boolean,
    fireColor?: colorString,
    /**
     * Element that will be used as fire
     */
    fireElement?: elementNameString,
    /**
     * Whether the element can rotate in 4 directions
     */
    rotatable?: boolean,
    /**
     * Whether the element can be flipped on the X-axis when placed
     */
    flippableX?: boolean,
    /**
     * Whether the element can be flipped on the Y-axis when placed
     */
    flippableY?: boolean,
    /**
     * Element that pixels of the element will turn into when they get smashed
     */
    breakInto?: elementNameString,
    /**
     * Color of pixels of the element after they are smashed
     */
    breakIntoColor?: colorString
};
type propertyName = string;
type defaultValue = any;
type elementNameString = keyof typeof elements;
type state = 'solid'|'liquid'|'gas'|(string&{});
type category = (typeof categoryList)[number]|(string&{});
type Reactions = Record<elementNameString,{
    elem1: elementNameString|null,
    elem2: elementNameString|null,
    chance?: zeroToOne,
    tempMin?: number,
    tempMax?: number,
    /**
     * Reaction only occurs if elem1 moves into elem2
     */
    oneway?: boolean,
    /**
     * Reaction only occurs if elements are charged
     */
    charged?: boolean,
    /**
     * Reaction only occurs if elem1 is burning
     */
    burning1?: boolean,
    /**
     * Reaction only occurs if elem2 is burning
     */
    burning2?: boolean,
    /**
     * Reaction only occurs at y-values within range
     */
    y?: number,
    /**
     * Reaction only occurs if specified setting is enabled
     */
    setting?: setting,
    /**
     * Color(s) of primary reactant
     */
    color1?: colorString|colorString[],
    /**
     * Color(s) of secondary reactant
     */
    color2?: colorString|colorString[],
    /**
     * Temperature of primary reactant
     */
    temp1?: temperatureNumber,
    /**
     * Temperature of secondary reactant
     */
    temp2?: temperatureNumber,
    /**
     * Additional attribute of primary reactant, must be applicable
     */
    attr1?: Record<string, any>,
    /**
     * Additional attribute of secondary reactant, must be applicable
     */
    attr2?: Record<string, any>,
    func?: (pixel1:Pixel,pixel2:Pixel)=>void,
}>;
type colorString = string;
type colorObject = {r:number,g:number,b:number};
type colorPattern = string[];
type patternKey = string;
type zeroToOne = number;
type Pixel = {
    readonly x: number,
    readonly y: number,
    element: elementNameString,
    /**
     * Current temperature
     */
    temp: temperatureNumber,
    density: number,
    /**
     * Current color string `rgb(r,g,b)`
     */
    color: colorString,
    /**
     * Current alpha
     */
    alpha?: zeroToOne,
    moved: boolean,
    dir?: number,
    /**
     * Last tick of the pixel
     */
    tick?: number,
    charge?: number | boolean,
    /**
     * How much ticks the pixel will save the charge
     */
    chargeCD?: number,
    /**
     * Current ticks of the burning of the pixel
     */
    burning?: number,
    delay?: number,
    hp?: number,
    storedElement?: elementNameString | null,
    /**
     * Custom properties
     */
    [customProperty: string]: any
};
type temperatureNumber = number;
type temperatureString = string;

type behaviorPattern = [string, string, string];

type extraTemperature = Record<temperatureString,elementNameString|null>;
type numberFromMinus1To1 = number;
type setting = string;
declare var pixelMap: (Pixel|null)[][];
declare function createPixel(elem:elementNameString,x:number,y:number): void;
declare function deletePixel(x:number,y:number): void;
declare var width: number;
declare var height: number;
declare var pixelTicks: number;
declare function isEmpty(x:number,y:number,ignoreAir?:boolean):boolean;
declare function outOfBounds(x:number,y:number): void;
declare function changePixel(pixel:Pixel,newElem:elementNameString):void;
/**
 * Tries to move the pixel to x and y. If it's possible, moves the pixel
 */
declare function tryMove(pixel:Pixel,targetX:number,targetY:number):boolean;
/**
 * Tests that the pixel can be moved to x y. But doesn't moves that.
 */
declare function canMove(pixel:Pixel,targetX:number,targetY:number):boolean;
declare function explode(x:number,y:number,radius:number):void;
declare function flash(x:number,y:number,duration:number):void;
declare function hexToRgb(hex:colorString):colorObject;
declare function rgbToHex(r:number,g:number,b:number):colorString;
declare function pixelColorPick(pixel:Pixel,color?:colorString):colorString;
/**
 * Runs the callback every tick without pauses and runs it fast even with small FPS
 */
declare function runEveryTick(callback:()=>void):void;
declare function runPerPixel(callback:(pixel:Pixel)=>void): void;
declare function drawSquare(ctx:CanvasRenderingContext2d,color:colorString,x:number,y:number): void;
declare function drawPixel(ctx:CanvasRenderingContext2d,x:number,y:number,color:colorString): void;
type Settings = {
    gravity:boolean,
    airTemp:number,
    /** Power of wind */
    wind:number,
    reactions:boolean,
    paused:boolean,
    simulationSpeed:number,
    /** Ticks Per Second */
    readonly tps:number,
    pixelSize:number,
    thermalView:boolean,
    showGrid:boolean,
    elementsHidden:boolean,
    unlocked:elementNameString[],
    /** Custom settings from other/this mod(s) */
    [key: string]: any;
};
declare var settings:Settings;
/** Forces game to update settings */
declare function updateSettings(): void;
