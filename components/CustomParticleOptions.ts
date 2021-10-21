import { ParticleOptions } from "react-particle-image";

const CustomParticleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.r > 10;
  },
  color: ({ x, y, image }) => "#03F072",
};

export default CustomParticleOptions;