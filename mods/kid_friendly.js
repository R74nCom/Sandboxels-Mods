// Sandboxels: Remove Weapons & Blood
// Deletes weapon and blood-related elements from the game.

// Blood
delete elements.blood;
delete elements.blood_2;
delete elements.blood_particle;

// Weapons / weapon-related elements
delete elements.gun;
delete elements.bullet;
delete elements.bullet_casing;
delete elements.rocket;
delete elements.missile;
delete elements.grenade;
delete elements.bomb;
delete elements.nuke;
delete elements.firearm;

// Prevent common explosive/weapon-like elements
delete elements.explosion;
delete elements.explosion_big;
