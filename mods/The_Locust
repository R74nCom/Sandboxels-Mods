elements.locust = {
    color: "#080808",
    behavior: behaviors.WALL,
    category: "life",
    state: "solid",
    density: 1500,
    hardness: 0.8,
    desc: "The Locust. A strange, dark figure.",

    excludeRandom: true,

    renderer: function(pixel, ctx) {
        const pattern = [
            "....T.T.T....",
            "...TT#TTT....",
            "..TT#####T...",
            "...T#####....",
            "....#FFF#....",
            "....F#E#F....",
            "....F###F....",
            ".....FFF.....",
            "......#......",
            ".....###.....",
            "....#####....",
            "...##...##...",
            "..##.....##..",
            ".##.......##.",
            ".#.........#.",
            ".#.........#.",
            "....##.##....",
            "....##.##....",
            "...###.###..."
        ];

        const colors = {
            "#": "#080808",
            "T": "#171717",
            "F": "#242424",
            "E": "#000000"
        };

        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                const part = pattern[y][x];

                if (part !== ".") {
                    drawSquare(
                        ctx,
                        colors[part],
                        pixel.x + x - 6,
                        pixel.y + y - 15
                    );
                }
            }
        }
    }
};
