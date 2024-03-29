import Image from "next/image";
import CoverImage from "../../public/image.jpg";

export default function Intro() {
  return (
    <section class="flex items-center justify-center py-10 text-white bg-white sm:py-16 md:py-24 lg:py-32">
      <div class="relative max-w-3xl px-10 text-center text-white auto lg:px-0">
        <div class="flex flex-col w-full md:flex-row">
          <div class="flex justify-between">
            <h1 class="relative flex flex-col text-5xl sm:text-6xl font-extrabold text-left text-black">
              Creating
              <span>Powerful</span>
              <span>Students</span>
            </h1>
          </div>
          <div class="relative top-0 right-0 h-64 mt-12 md:-mt-16 md:absolute md:h-96 md:w-2/5">
            <Image
              src={CoverImage}
              layout="fill"
              class="object-cover mt-3 mr-5 h-80 lg:h-96"
            />
          </div>
        </div>

        <div class="my-16 border-b border-gray-300 lg:my-24"></div>

        <h2 class="text-left text-gray-500 xl:text-xl md:pt-2">
          Building beautiful designs for your next project. We've unlocked the
          secret to converting visitors into customers. Download our re-usable
          and extandable components today.
        </h2>
      </div>
    </section>
  );
}
