import { useLottie } from "lottie-react";
import vinylPlayerAnimation from "../assets/lotties/music-loader.json";

export function Loader() {
  const options = {
    animationData: vinylPlayerAnimation,
    loop: true,
    autoplay: true,

  }
  const { View } = useLottie(options);

  return View
}
