import { useLottie } from "lottie-react";
import vinylAnimation from "../assets/lotties/music-loader.json";

export function Loader() {
    const options = {
      animationData: vinylAnimation,
      loop: true,
      autoplay: true,
      
    }
    const { View } = useLottie(options);

  return View
}
