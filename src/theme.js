
import { Poppins } from "next/font/google";
// theme.js
export const colors = {
    colors: {
      blue: '#52C3FE',
      pink: '#EC4899',
      yellow: '#F8AD2D',

    },
   
  };

  export const poppinsLight = Poppins({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-poppins-light",
});

export const poppinsBold = Poppins({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-poppins-bold",
});
