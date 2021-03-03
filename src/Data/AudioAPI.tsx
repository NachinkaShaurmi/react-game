export default function playMusic(
  sound: string,
  vlm: number = 0.5,
  auto: boolean = false,
  repeat: boolean = false
): void {
  const audio = new Audio("");
  audio.src = `audio/${sound}.mp3`;
  audio.volume = vlm;
  audio.autoplay = auto;
  audio.loop = repeat;
  audio.play();
}

export const flipSound = (vlm: number = 0.5): void => {
  playMusic("flip", vlm);
};

export const miniSuccessSound = (vlm: number = 0.5): void => {
  playMusic("miniSuccess", vlm);
};

export const successSound = (vlm: number = 0.5): void => {
  playMusic("success", vlm);
};
export const mainTheme = (vlm: number = 0.5): void => {
  playMusic("mainTheme", vlm, true);
};
