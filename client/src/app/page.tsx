// import Image from "next/image";
{/* <Image
  className="dark:invert"
  src="/next.svg"
  alt="Next.js logo"
  width={180}
  height={38}
  priority
/> */}

import { AnimalGallery } from '@/section/apigallery';

export default function Home() {
  return (
    <>
      <AnimalGallery />
    </>
  );
}
