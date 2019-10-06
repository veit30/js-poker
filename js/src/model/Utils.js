module.exports = {

  COLOR: {
    darkGrey: '#303030',
    lightGreen: '#68b249',
    darkerGreen: '#4d8436',
    brown: '#4c4128',
    brown2: '#7a6840',
    black: '#000000',
    red: '#ff0000',
    white: '#ffffff',
    shadedWhite: '#d9d9d9',
    lightGray: '#e0e0e0',
    blue:'#3c98de',
    darkerBlue: '#296ea3',
    darkGray: '#242424',
    lighterGray: '#3e3e3e',
    alertRedHover: '#ec6e6e',
    alertRed: '#ff9494',
    alertGreen: '#97e391',
    alertGreenHover: '#69d760',
    buttonGreen: '#64bd5e',
    buttonGreenHover: '#97d194',
    buttonGray: '#8b8b8b',
    buttonGrayHover: '#9fbf9c'
  },
  CARD_SUIT: {
    DIAMONDS: 1,
    HEARTS: 2,
    PIKES: 3,
    CLOVERS: 4
  },
  CARD_VALUE: {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    BOY: 11,
    TEN: 10,
    NINE: 9,
    EIGHT: 8,
    SEVEN: 7,
    SIX: 6,
    FIVE: 5,
    FOUR: 4,
    THREE: 3,
    TWO: 2
  },
  FONT: {
    MAIN: 'Kreon-Light',
    CARD: 'Kreon-Bold',
    LIGHT: 'Kreon-Light'
  },
  textFromValue: value => {
    switch (value) {
      case 14:
        return 'A';
      case 13:
        return 'K';
      case 12:
        return 'Q';
      case 11:
        return 'J';
      default:
        return value.toString();
    }
  },
  PLAYER_POSITION: [
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .063,
            y: canvas.height * .5 -  (canvas.width * .4) * .35
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .063,
            y: canvas.height * .5 -  (canvas.width * .4) * .35
          };
        }
      ],
      positionName: 'Upper Middle (DEALER)',
      cardRotation: 180
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .652,
            y: canvas.height * .5 -  (canvas.width * .4) * .265
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .548,
            y: canvas.height * .5 -  (canvas.width * .4) * .335
          };
        }
      ],
      positionName: 'Upper Right',
      cardRotation: -145
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .8,
            y: canvas.height * .5 -  (canvas.width * .4) * .063
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .8,
            y: canvas.height * .5 +  (canvas.width * .4) * .063
          };
        }
      ],
      positionName: 'Center Right',
      cardRotation: -90
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .652,
            y: canvas.height * .5 +  (canvas.width * .4) * .265
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .548,
            y: canvas.height * .5 +  (canvas.width * .4) * .335
          };
        }
      ],
      positionName: 'Lower Right',
      cardRotation: -35
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .063,
            y: canvas.height * .5 +  (canvas.width * .4) * .35
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 +  (canvas.width * .4) * .063,
            y: canvas.height * .5 +  (canvas.width * .4) * .35
          };
        }
      ],
      positionName: 'Lower Middle',
      cardRotation: 0
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .652,
            y: canvas.height * .5 +  (canvas.width * .4) * .265
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .548,
            y: canvas.height * .5 +  (canvas.width * .4) * .335
          };
        }
      ],
      positionName: 'Lower Left',
      cardRotation: 35
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .8,
            y: canvas.height * .5 -  (canvas.width * .4) * .063
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .8,
            y: canvas.height * .5 +  (canvas.width * .4) * .063
          };
        }
      ],
      positionName: 'Center Left',
      cardRotation: 90
    },
    {
      cards: [
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .652,
            y: canvas.height * .5 -  (canvas.width * .4) * .265
          };
        },
        canvas => {
          return {
            x: canvas.width * .5 -  (canvas.width * .4) * .548,
            y: canvas.height * .5 -  (canvas.width * .4) * .335
          };
        }
      ],
      positionName: 'Upper Left',
      cardRotation: 145
    },
  ],
  communityCardPosition: (canvas,index) => {
    let factor = .05;
    return {
      x: canvas.width * (.4 + .05 * index),
      y: canvas.height * .5
    }
  },
  EASING_FUNCTION: {
    easeIn: t => {
      return t * t * t
    },
    easeOut: t => {
      return (--t) * t * t + 1
    },
    easeInOut: t => {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    linear: t => {
      return t
    }
  },
  POS_QUOTIENT_CALC: {
    x: (ctx, x) => {
      let tableHeight = ctx.canvas.width * .4;
      return (x - (ctx.canvas.width * .5)) / tableHeight;
    },
    y: (ctx, y) => {
      let tableHeight = ctx.canvas.width * .4;
      return (y - (ctx.canvas.height * .5)) / tableHeight;
    }
  },
  convertToImg: svg => {
    let
      img = document.createElement('img'),
      svg64 = btoa(svg),
      b64Start = 'data:image/svg+xml;base64,',
      image64 = b64Start + svg64;

    img.src = image64;

    return img;
  },
  SVG_DATA: {
    backside1: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 154 200" width="154" height="200"><defs><clipPath id="_clipPath_aUlpfpfe5XYxLq0mqamiwlk8XdORg9N4"><rect width="154" height="200"/></clipPath></defs><g clip-path="url(#_clipPath_aUlpfpfe5XYxLq0mqamiwlk8XdORg9N4)"><g style="isolation:isolate" id="Layer 1"><path d=" M 30.2 8 L 123.8 8 C 129.16 8 134.3 10.13 138.08 13.92 C 141.87 17.7 144 22.84 144 28.2 L 144 171.8 C 144 177.16 141.87 182.3 138.08 186.08 C 134.3 189.87 129.16 192 123.8 192 L 30.2 192 C 24.84 192 19.7 189.87 15.92 186.08 C 12.13 182.3 10 177.16 10 171.8 L 10 28.2 C 10 22.84 12.13 17.7 15.92 13.92 C 19.7 10.13 24.84 8 30.2 8 Z  M 30.2 12 L 123.8 12 C 128.09 12 132.22 13.71 135.26 16.74 C 138.29 19.78 140 23.91 140 28.2 L 140 171.8 C 140 176.09 138.29 180.22 135.26 183.26 C 132.22 186.29 128.09 188 123.8 188 L 30.2 188 C 25.91 188 21.78 186.29 18.74 183.26 C 15.71 180.22 14 176.09 14 171.8 L 14 28.2 C 14 23.91 15.71 19.78 18.74 16.74 C 21.78 13.71 25.91 12 30.2 12 Z  M 29.17 100.25 L 77.25 52.17 L 125.34 100.25 L 77.25 148.34 L 29.17 100.25 Z  M 34.83 100.25 L 77.25 57.83 L 119.68 100.25 L 77.25 142.68 L 34.83 100.25 Z  M 42.17 100.25 L 77.25 65.17 L 112.34 100.25 L 77.25 135.34 L 42.17 100.25 Z  M 47.83 100.25 L 77.25 70.83 L 106.68 100.25 L 77.25 129.68 L 47.83 100.25 Z  M 30.32 47.46 C 29.05 45.26 28.38 42.77 28.38 40.23 C 28.37 35.05 31.14 30.25 35.63 27.65 C 37.83 26.38 40.32 25.71 42.86 25.71 C 48.04 25.71 52.84 28.48 55.43 32.96 C 56.71 35.16 57.38 37.65 57.38 40.19 C 57.38 45.37 54.61 50.18 50.13 52.77 C 47.93 54.04 45.43 54.71 42.89 54.71 C 37.72 54.71 32.91 51.95 30.32 47.46 Z  M 32.92 45.96 C 31.91 44.22 31.38 42.24 31.38 40.23 C 31.37 36.12 33.57 32.31 37.13 30.25 C 38.87 29.24 40.85 28.71 42.86 28.71 C 46.97 28.71 50.78 30.91 52.84 34.46 C 53.84 36.21 54.38 38.18 54.38 40.2 C 54.38 44.3 52.18 48.11 48.63 50.17 C 46.88 51.18 44.91 51.71 42.89 51.71 C 38.78 51.71 34.97 49.52 32.92 45.96 Z  M 99.08 32.96 C 101.67 28.48 106.47 25.71 111.65 25.71 C 114.19 25.71 116.68 26.38 118.88 27.65 C 123.37 30.25 126.14 35.05 126.13 40.23 C 126.13 42.77 125.46 45.26 124.19 47.46 C 121.6 51.95 116.79 54.71 111.62 54.71 C 109.08 54.71 106.58 54.04 104.38 52.77 C 99.9 50.18 97.13 45.37 97.13 40.19 C 97.13 37.65 97.8 35.16 99.08 32.96 Z  M 101.67 34.46 C 103.73 30.91 107.54 28.71 111.65 28.71 C 113.66 28.71 115.64 29.24 117.38 30.25 C 120.94 32.31 123.13 36.12 123.13 40.23 C 123.13 42.24 122.6 44.22 121.59 45.96 C 119.54 49.52 115.73 51.71 111.62 51.71 C 109.6 51.71 107.63 51.18 105.88 50.17 C 102.33 48.11 100.13 44.3 100.13 40.2 C 100.13 38.18 100.66 36.21 101.67 34.46 Z  M 99.08 166.55 C 97.8 164.35 97.13 161.86 97.13 159.32 C 97.13 154.14 99.9 149.33 104.38 146.74 C 106.58 145.47 109.08 144.8 111.62 144.8 C 116.79 144.79 121.6 147.56 124.19 152.05 C 125.46 154.25 126.13 156.74 126.13 159.28 C 126.14 164.46 123.37 169.26 118.88 171.86 C 116.68 173.13 114.19 173.8 111.65 173.8 C 106.47 173.8 101.67 171.03 99.08 166.55 Z  M 101.67 165.05 C 100.66 163.3 100.13 161.33 100.13 159.31 C 100.13 155.21 102.33 151.39 105.88 149.34 C 107.63 148.33 109.6 147.8 111.62 147.8 C 115.73 147.8 119.54 149.99 121.59 153.55 C 122.6 155.29 123.13 157.27 123.13 159.28 C 123.13 163.39 120.94 167.2 117.38 169.26 C 115.64 170.27 113.66 170.8 111.65 170.8 C 107.54 170.8 103.73 168.6 101.67 165.05 Z  M 30.32 152.05 C 32.91 147.56 37.72 144.79 42.89 144.8 C 45.43 144.8 47.93 145.47 50.13 146.74 C 54.61 149.33 57.38 154.14 57.38 159.32 C 57.38 161.86 56.71 164.35 55.43 166.55 C 52.84 171.03 48.04 173.8 42.86 173.8 C 40.32 173.8 37.83 173.13 35.63 171.86 C 31.14 169.26 28.37 164.46 28.38 159.28 C 28.38 156.74 29.05 154.25 30.32 152.05 Z  M 32.92 153.55 C 34.97 149.99 38.78 147.8 42.89 147.8 C 44.91 147.8 46.88 148.33 48.63 149.34 C 52.18 151.39 54.38 155.21 54.38 159.31 C 54.38 161.33 53.84 163.3 52.84 165.05 C 50.78 168.6 46.97 170.8 42.86 170.8 C 40.85 170.8 38.87 170.27 37.13 169.26 C 33.57 167.2 31.37 163.39 31.38 159.28 C 31.38 157.27 31.91 155.29 32.92 153.55 Z " fill-rule="evenodd" fill="rgb(255,0,0)"/></g></g></svg>',
    gearlock: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 500 500" width="500" height="500"><defs><path d="M288.5 0.05L288.98 0.12L289.45 0.2L289.9 0.32L290.34 0.45L290.77 0.61L291.18 0.8L291.58 1L291.97 1.23L292.35 1.48L292.71 1.75L293.07 2.03L293.41 2.34L293.75 2.67L294.07 3.02L294.39 3.38L294.7 3.76L295 4.16L295.29 4.58L295.57 5.01L295.85 5.46L296.11 5.92L296.38 6.4L296.63 6.89L296.88 7.4L297.13 7.92L297.37 8.45L297.6 8.99L297.84 9.55L298.06 10.11L298.29 10.69L298.51 11.28L298.73 11.87L298.94 12.48L299.16 13.09L299.37 13.71L299.58 14.34L299.79 14.98L300 15.63L310.81 56.18L314.2 57.23L321.7 59.89L329.07 62.84L336.28 66.06L343.35 69.55L343.93 69.86L380.37 48.77L380.98 48.46L381.58 48.16L382.17 47.86L382.76 47.57L383.35 47.29L383.93 47.01L384.5 46.75L385.07 46.49L385.64 46.24L386.2 46L386.76 45.77L387.31 45.55L387.85 45.35L388.39 45.15L388.93 44.97L389.46 44.81L389.98 44.65L390.5 44.52L391.01 44.39L391.52 44.29L392.02 44.2L392.51 44.13L393 44.08L393.48 44.04L393.95 44.03L394.42 44.03L394.88 44.06L395.34 44.11L395.79 44.17L396.23 44.27L396.67 44.38L397.09 44.52L397.52 44.68L397.93 44.87L398.34 45.08L398.74 45.32L399.13 45.59L399.51 45.88L399.89 46.21L400.26 46.56L453.29 99.59L453.65 99.96L453.97 100.34L454.27 100.73L454.54 101.13L454.79 101.54L455.01 101.95L455.21 102.38L455.39 102.81L455.54 103.25L455.66 103.7L455.77 104.16L455.85 104.62L455.91 105.09L455.95 105.56L455.97 106.05L455.97 106.53L455.95 107.03L455.91 107.53L455.85 108.04L455.77 108.55L455.68 109.06L455.57 109.58L455.44 110.11L455.29 110.64L455.13 111.17L454.95 111.71L454.76 112.25L454.55 112.79L454.33 113.34L454.09 113.89L453.84 114.44L453.58 114.99L453.31 115.55L453.02 116.11L452.72 116.67L452.42 117.23L452.1 117.79L451.77 118.35L451.43 118.91L451.08 119.48L430.02 155.86L430.45 156.65L433.94 163.72L437.16 170.93L440.11 178.3L442.77 185.8L443.82 189.19L484.37 200L485.02 200.15L485.66 200.31L486.29 200.48L486.91 200.65L487.52 200.83L488.13 201.01L488.72 201.21L489.31 201.41L489.89 201.61L490.45 201.83L491.01 202.05L491.55 202.28L492.08 202.52L492.6 202.76L493.11 203.01L493.6 203.28L494.08 203.55L494.54 203.83L494.99 204.12L495.42 204.41L495.84 204.72L496.24 205.04L496.62 205.36L496.98 205.7L497.33 206.04L497.66 206.4L497.97 206.76L498.25 207.14L498.52 207.52L498.77 207.92L499 208.32L499.2 208.74L499.39 209.17L499.55 209.61L499.68 210.06L499.8 210.53L499.88 211L499.95 211.49L499.99 211.99L500 212.5L500 287.5L499.99 288.01L499.95 288.5L499.88 288.98L499.8 289.45L499.68 289.9L499.55 290.34L499.39 290.77L499.2 291.18L499 291.58L498.77 291.97L498.52 292.35L498.25 292.71L497.97 293.07L497.66 293.41L497.33 293.75L496.98 294.07L496.62 294.39L496.24 294.7L495.84 295L495.42 295.29L494.99 295.57L494.54 295.85L494.08 296.11L493.6 296.38L493.11 296.63L492.6 296.88L492.08 297.13L491.55 297.37L491.01 297.6L490.45 297.84L489.89 298.06L489.31 298.29L488.72 298.51L488.13 298.73L487.52 298.94L486.91 299.16L486.29 299.37L485.66 299.58L485.02 299.79L484.37 300L443.82 310.81L442.77 314.2L440.11 321.7L437.16 329.07L433.94 336.28L430.45 343.35L430.06 344.06L451.08 380.37L451.43 380.94L451.77 381.5L452.1 382.06L452.42 382.62L452.72 383.18L453.02 383.74L453.31 384.3L453.58 384.86L453.84 385.41L454.09 385.96L454.33 386.51L454.55 387.06L454.76 387.6L454.95 388.14L455.13 388.68L455.29 389.21L455.44 389.74L455.57 390.27L455.68 390.79L455.77 391.3L455.85 391.82L455.91 392.32L455.95 392.82L455.97 393.32L455.97 393.8L455.95 394.29L455.91 394.76L455.85 395.23L455.77 395.7L455.66 396.15L455.54 396.6L455.39 397.04L455.21 397.47L455.01 397.9L454.79 398.31L454.54 398.72L454.27 399.12L453.97 399.51L453.65 399.89L453.29 400.26L400.26 453.29L399.89 453.64L399.51 453.97L399.13 454.26L398.74 454.53L398.34 454.77L397.93 454.98L397.52 455.17L397.09 455.33L396.67 455.47L396.23 455.59L395.79 455.68L395.34 455.75L394.88 455.79L394.42 455.82L393.95 455.82L393.48 455.81L393 455.77L392.51 455.72L392.02 455.65L391.52 455.56L391.01 455.46L390.5 455.33L389.98 455.2L389.46 455.05L388.93 454.88L388.39 454.7L387.85 454.5L387.31 454.3L386.76 454.08L386.2 453.85L385.64 453.61L385.07 453.36L384.5 453.1L383.93 452.84L383.35 452.56L382.76 452.28L382.17 451.99L381.58 451.69L380.98 451.39L380.37 451.08L344.06 430.06L343.35 430.45L336.28 433.94L329.07 437.16L321.7 440.11L314.2 442.77L310.81 443.82L300 484.37L299.79 485.02L299.58 485.66L299.37 486.29L299.16 486.91L298.94 487.52L298.73 488.13L298.51 488.72L298.29 489.31L298.06 489.89L297.84 490.45L297.6 491.01L297.37 491.55L297.13 492.08L296.88 492.6L296.63 493.11L296.38 493.6L296.11 494.08L295.85 494.54L295.57 494.99L295.29 495.42L295 495.84L294.7 496.24L294.39 496.62L294.07 496.98L293.75 497.33L293.41 497.66L293.07 497.97L292.71 498.25L292.35 498.52L291.97 498.77L291.58 499L291.18 499.2L290.77 499.39L290.34 499.55L289.9 499.68L289.45 499.8L288.98 499.88L288.5 499.95L288.01 499.99L287.5 500L212.5 500L211.99 499.99L211.49 499.95L211 499.88L210.53 499.8L210.06 499.68L209.61 499.55L209.17 499.39L208.74 499.2L208.32 499L207.92 498.77L207.52 498.52L207.14 498.25L206.76 497.97L206.4 497.66L206.04 497.33L205.7 496.98L205.36 496.62L205.04 496.24L204.72 495.84L204.41 495.42L204.12 494.99L203.83 494.54L203.55 494.08L203.28 493.6L203.01 493.11L202.76 492.6L202.52 492.08L202.28 491.55L202.05 491.01L201.83 490.45L201.61 489.89L201.41 489.31L201.21 488.72L201.01 488.13L200.83 487.52L200.65 486.91L200.48 486.29L200.31 485.66L200.15 485.02L200 484.37L189.19 443.82L185.8 442.77L178.3 440.11L170.93 437.16L163.72 433.94L156.65 430.45L155.8 429.99L119.63 450.93L119.06 451.28L118.5 451.62L117.94 451.95L117.38 452.27L116.82 452.57L116.26 452.87L115.7 453.16L115.14 453.43L114.59 453.69L114.04 453.94L113.49 454.18L112.94 454.4L112.4 454.61L111.86 454.8L111.32 454.98L110.79 455.14L110.26 455.29L109.73 455.42L109.21 455.53L108.7 455.62L108.18 455.7L107.68 455.76L107.18 455.8L106.68 455.82L106.2 455.82L105.71 455.8L105.24 455.76L104.77 455.7L104.3 455.62L103.85 455.52L103.4 455.39L102.96 455.24L102.53 455.06L102.1 454.86L101.69 454.64L101.28 454.39L100.88 454.12L100.49 453.82L100.11 453.5L99.74 453.14L46.71 400.11L46.36 399.74L46.03 399.36L45.74 398.98L45.47 398.59L45.23 398.19L45.02 397.78L44.83 397.37L44.67 396.94L44.53 396.52L44.41 396.08L44.32 395.64L44.25 395.19L44.21 394.74L44.18 394.27L44.18 393.8L44.19 393.33L44.23 392.85L44.28 392.36L44.35 391.87L44.44 391.37L44.54 390.86L44.67 390.35L44.8 389.83L44.95 389.31L45.12 388.78L45.3 388.25L45.5 387.71L45.7 387.16L45.92 386.61L46.15 386.05L46.39 385.49L46.64 384.93L46.9 384.35L47.16 383.78L47.44 383.2L47.72 382.61L48.01 382.02L48.31 381.43L48.61 380.83L48.92 380.22L69.9 343.99L69.55 343.35L66.06 336.28L62.84 329.07L59.89 321.7L57.23 314.2L56.18 310.81L15.63 300L14.98 299.79L14.34 299.58L13.71 299.37L13.09 299.16L12.48 298.94L11.87 298.73L11.28 298.51L10.69 298.29L10.11 298.06L9.55 297.84L8.99 297.6L8.45 297.37L7.92 297.13L7.4 296.88L6.89 296.63L6.4 296.38L5.92 296.11L5.46 295.85L5.01 295.57L4.58 295.29L4.16 295L3.76 294.7L3.38 294.39L3.02 294.07L2.67 293.75L2.34 293.41L2.03 293.07L1.75 292.71L1.48 292.35L1.23 291.97L1 291.58L0.8 291.18L0.61 290.77L0.45 290.34L0.32 289.9L0.2 289.45L0.12 288.98L0.05 288.5L0.01 288.01L0 287.5L0 212.5L0.01 211.99L0.05 211.49L0.12 211L0.2 210.53L0.32 210.06L0.45 209.61L0.61 209.17L0.8 208.74L1 208.32L1.23 207.92L1.48 207.52L1.75 207.14L2.03 206.76L2.34 206.4L2.67 206.04L3.02 205.7L3.38 205.36L3.76 205.04L4.16 204.72L4.58 204.41L5.01 204.12L5.46 203.83L5.92 203.55L6.4 203.28L6.89 203.01L7.4 202.76L7.92 202.52L8.45 202.28L8.99 202.05L9.55 201.83L10.11 201.61L10.69 201.41L11.28 201.21L11.87 201.01L12.48 200.83L13.09 200.65L13.71 200.48L14.34 200.31L14.98 200.15L15.63 200L56.18 189.19L57.23 185.8L59.89 178.3L62.84 170.93L66.06 163.72L69.55 156.65L69.94 155.94L48.92 119.63L48.61 119.02L48.31 118.42L48.01 117.83L47.72 117.24L47.44 116.65L47.16 116.07L46.9 115.5L46.64 114.93L46.39 114.36L46.15 113.8L45.92 113.24L45.7 112.69L45.5 112.15L45.3 111.61L45.12 111.07L44.95 110.54L44.8 110.02L44.67 109.5L44.54 108.99L44.44 108.48L44.35 107.98L44.28 107.49L44.23 107L44.19 106.52L44.18 106.05L44.18 105.58L44.21 105.12L44.25 104.66L44.32 104.21L44.41 103.77L44.53 103.33L44.67 102.91L44.83 102.48L45.02 102.07L45.23 101.66L45.47 101.26L45.74 100.87L46.03 100.49L46.36 100.11L46.71 99.74L99.74 46.71L100.11 46.35L100.49 46.03L100.88 45.73L101.28 45.46L101.69 45.21L102.1 44.99L102.53 44.79L102.96 44.61L103.4 44.46L103.85 44.34L104.3 44.23L104.77 44.15L105.24 44.09L105.71 44.05L106.2 44.03L106.68 44.03L107.18 44.05L107.68 44.09L108.18 44.15L108.7 44.23L109.21 44.32L109.73 44.43L110.26 44.56L110.79 44.71L111.32 44.87L111.86 45.05L112.4 45.24L112.94 45.45L113.49 45.67L114.04 45.91L114.59 46.16L115.14 46.42L115.7 46.69L116.26 46.98L116.82 47.28L117.38 47.58L117.94 47.9L118.5 48.23L119.06 48.57L119.63 48.92L155.94 69.94L156.65 69.55L163.72 66.06L170.93 62.84L178.3 59.89L185.8 57.23L189.19 56.18L200 15.63L200.15 14.98L200.31 14.34L200.48 13.71L200.65 13.09L200.83 12.48L201.01 11.87L201.21 11.28L201.41 10.69L201.61 10.11L201.83 9.55L202.05 8.99L202.28 8.45L202.52 7.92L202.76 7.4L203.01 6.89L203.28 6.4L203.55 5.92L203.83 5.46L204.12 5.01L204.41 4.58L204.72 4.16L205.04 3.76L205.36 3.38L205.7 3.02L206.04 2.67L206.4 2.34L206.76 2.03L207.14 1.75L207.52 1.48L207.92 1.23L208.32 1L208.74 0.8L209.17 0.61L209.61 0.45L210.06 0.32L210.53 0.2L211 0.12L211.49 0.05L211.99 0.01L212.5 0L287.5 0L288.01 0.01L288.5 0.05ZM241.03 140.99L236.62 141.44L232.26 142.06L227.96 142.85L223.72 143.8L219.54 144.92L215.43 146.2L211.39 147.63L207.43 149.22L203.54 150.95L199.74 152.83L196.02 154.85L192.39 157.01L188.85 159.3L185.4 161.73L182.06 164.28L178.82 166.95L175.69 169.75L172.66 172.66L169.75 175.69L166.95 178.82L164.28 182.06L161.73 185.4L159.3 188.85L157.01 192.39L154.85 196.02L152.83 199.74L150.95 203.54L149.22 207.43L147.63 211.39L146.2 215.43L144.92 219.54L143.8 223.72L142.85 227.96L142.06 232.26L141.44 236.62L140.99 241.03L140.72 245.49L140.62 250L140.72 254.51L140.99 258.97L141.44 263.38L142.06 267.74L142.85 272.04L143.8 276.28L144.92 280.46L146.2 284.57L147.63 288.61L149.22 292.57L150.95 296.46L152.83 300.26L154.85 303.98L157.01 307.61L159.3 311.15L161.73 314.6L164.28 317.94L166.95 321.18L169.75 324.31L172.66 327.34L175.69 330.25L178.82 333.05L182.06 335.72L185.4 338.27L188.85 340.7L192.39 342.99L196.02 345.15L199.74 347.17L203.54 349.05L207.43 350.78L211.39 352.37L215.43 353.8L219.54 355.08L223.72 356.2L227.96 357.15L232.26 357.94L236.62 358.56L241.03 359.01L245.49 359.28L250 359.37L254.51 359.28L258.97 359.01L263.38 358.56L267.74 357.94L272.04 357.15L276.28 356.2L280.46 355.08L284.57 353.8L288.61 352.37L292.57 350.78L296.46 349.05L300.26 347.17L303.98 345.15L307.61 342.99L311.15 340.7L314.6 338.27L317.94 335.72L321.18 333.05L324.31 330.25L327.34 327.34L330.25 324.31L333.05 321.18L335.72 317.94L338.27 314.6L340.7 311.15L342.99 307.61L345.15 303.98L347.17 300.26L349.05 296.46L350.78 292.57L352.37 288.61L353.8 284.57L355.08 280.46L356.2 276.28L357.15 272.04L357.94 267.74L358.56 263.38L359.01 258.97L359.28 254.51L359.37 250L359.28 245.49L359.01 241.03L358.56 236.62L357.94 232.26L357.15 227.96L356.2 223.72L355.08 219.54L353.8 215.43L352.37 211.39L350.78 207.43L349.05 203.54L347.17 199.74L345.15 196.02L342.99 192.39L340.7 188.85L338.27 185.4L335.72 182.06L333.05 178.82L330.25 175.69L327.34 172.66L324.31 169.75L321.18 166.95L317.94 164.28L314.6 161.73L311.15 159.3L307.61 157.01L303.98 154.85L300.26 152.83L296.46 150.95L292.57 149.22L288.61 147.63L284.57 146.2L280.46 144.92L276.28 143.8L272.04 142.85L267.74 142.06L263.38 141.44L258.97 140.99L254.51 140.72L250 140.63L245.49 140.72L241.03 140.99Z" id="aGK6If4Rw"></path></defs><g><g><g><use xlink:href="#aGK6If4Rw" opacity="1" fill="#ffffff" fill-opacity="1"></use></g></g></g></svg>'
  },
  KEY: {
    C: 67,
    F: 70,
    UP: 38,
    DOWN: 40,
  },
  numDots: num => {
    return num.toString().split("").reverse().reduce((a,c,i) => {
      if(i % 3 === 0 && i != 0) {
        a = c + '.' + a;
      } else {
        a = c + a;
      }
      return a;
    },'');
  },
  round: x => ~~(x + 0.5),
  rT: x => ~~(x*1000 + 0.5) / 1000,
  testHost: hostAddress => {
    let hostParams = hostAddress.split(":");
    if (hostParams.length !== 2) return false;
    let port = parseInt(hostParams[1]);
    if (!port) return false;
    if (hostParams[0] !== '') return true;
  }

}


module.exports.playersCardRotation =  playerId => {
  return module.exports.PLAYER_POSITION[playerId].cardRotation;
};

module.exports.playersCardPosition = (playerId,cardIndex,canvas) => {
  return module.exports.PLAYER_POSITION[playerId].cards[cardIndex](canvas)
};

module.exports.colorFromSuit = suit => {
  if (suit == 1 || suit == 2) {
    return module.exports.COLOR.red;
  } else {
    return module.exports.COLOR.black;
  }
};
