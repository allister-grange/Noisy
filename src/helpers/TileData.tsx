export const tileData = [
    {
        id: 1,
        iconName: "ios-rainy",
        darkThemeColor: "#7BC4F5",
        lightThemeColor: "#7BC4F5",
        isPlaying: false,
        name: "rain"
    },
    {
        id: 2,
        iconName: "ios-thunderstorm",
        darkThemeColor: "#623BF5",
        lightThemeColor: "#623BF5",
        isPlaying: false,
        name: "thunder"
    },
    {
        id: 3,
        iconName: "train",
        darkThemeColor: "#ED7067",
        lightThemeColor: "#ED7067",
        isPlaying: false,
        name: "train"
    },
    {
        id: 4,
        iconName: "ios-water",
        darkThemeColor: "#6988F2",
        lightThemeColor: "#6988F2",
        isPlaying: false,
        name: "river"
    },
    {
        id: 5,
        iconName: "tree",
        darkThemeColor: "#97C1A9",
        lightThemeColor: "#97C1A9",
        isPlaying: false,
        name: "forest"
    },
    {
        id: 6,
        iconName: "car",
        darkThemeColor: "#ABDEE6",
        lightThemeColor: "#ABDEE6",
        isPlaying: false,
        name: "car"
    },
    {
        id: 7,
        iconName: "multitrack-audio",
        darkThemeColor: "#F3B0C3",
        lightThemeColor: "#F3B0C3",
        isPlaying: false,
        name: "blackNoise"
    },
    {
        id: 8,
        iconName: "waves",
        darkThemeColor: "#6BE5FF",
        lightThemeColor: "#6BE5FF",
        isPlaying: false,
        name: "oceanWaves"
    },
    {
        id: 9,
        iconName: "kiwi-bird",
        darkThemeColor: "#FF968A",
        lightThemeColor: "#FF968A",
        isPlaying: false,
        name: "leaf"
    },
    {
        id: 10,
        iconName: "ios-bonfire",
        darkThemeColor: "#FC6238",
        lightThemeColor: "#FC6238",
        isPlaying: false,
        name: "campfire"
    },
    {
        id: 11,
        iconName: "ios-moon",
        darkThemeColor: "#74737A",
        lightThemeColor: "#74737A",
        isPlaying: false,
        name: "crickets"
    },
    {
        id: 12,
        iconName: "fan",
        darkThemeColor: "#00CDAC",
        lightThemeColor: "#00CDAC",
        isPlaying: false,
        name: "fan"
    },
    {
        id: 13,
        iconName: "coffee",
        darkThemeColor: "#987C64",
        lightThemeColor: "#987C64",
        isPlaying: false,
        name: "office"
    },
    {
        id: 14,
        iconName: "wind",
        darkThemeColor: "#349FA4",
        lightThemeColor: "#349FA4",
        isPlaying: false,
        name: "wind"
    },
    {
        id: 15,
        iconName: "grass",
        darkThemeColor: "#6EB5FF",
        lightThemeColor: "#6EB5FF",
        isPlaying: false,
        name: "grass"
    },
    {
        id: 16,
        iconName: "equalizer",
        darkThemeColor: "#A79AFF",
        lightThemeColor: "#A79AFF",
        isPlaying: false,
        name: "white"
    },
    {
        id: 17,
        iconName: "guitar",
        darkThemeColor: "#FFABAB",
        lightThemeColor: "#FFABAB",
        isPlaying: false,
        name: "guitar"
    },
    {
        id: 18,
        iconName: "piano",
        darkThemeColor: "#B28DFF",
        lightThemeColor: "#B28DFF",
        isPlaying: false,
        name: "piano"
    }
]

export const loadAudioFromFile: any = () => {
    return {
        campfire: require('../../assets/sounds/campfire.mp3'),
        car: require('../../assets/sounds/car.mp3'),
        crickets: require('../../assets/sounds/crickets.mp3'),
        fan: require('../../assets/sounds/fan.mp3'),
        forest: require('../../assets/sounds/forest.mp3'),
        grass: require('../../assets/sounds/grass.mp3'),
        guitar: require('../../assets/sounds/guitar.mp3'),
        leaf: require('../../assets/sounds/leaf.mp3'),
        office: require('../../assets/sounds/office.mp3'),
        piano: require('../../assets/sounds/piano.mp3'),
        rain: require('../../assets/sounds/rain.mp3'),
        river: require('../../assets/sounds/river.mp3'),
        thunder: require('../../assets/sounds/thunder.mp3'),
        train: require('../../assets/sounds/train.mp3'),
        white: require('../../assets/sounds/white.mp3'),
        wind: require('../../assets/sounds/wind.mp3'),
        oceanWaves: require('../../assets/sounds/oceanWaves.mp3'),
        blackNoise: require('../../assets/sounds/blackNoise.mp3'),
    };
}