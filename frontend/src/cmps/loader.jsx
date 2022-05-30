import { useLottie } from "lottie-react";
import vinylPlayerAnimation from "../data/lottie-animations/music-loader.json";

export function Loader() {
  const options = {
    animationData: vinylPlayerAnimation,
    loop: true,
    autoplay: true,

  }
  const { View } = useLottie(options);

  return View
}
