import { client } from "@/sanity/lib/client";
import Image from "next/image";

type Logo = {
  _id: string;
  title: string;
  imageUrl: string;
};

export default async function CompanyLogos() {
  // Fetch logos from Sanity
  const logos: Logo[] = await client.fetch(`*[_type == "Logos"] {
    _id,
    title,
    "imageUrl": image.asset->url
  }`);

  return (
    <section className="flex justify-evenly sm:gap-5  mt-[50px]">
      {logos.map((logo) => (
        <div key={logo._id}>
          <Image
            src={logo.imageUrl}
            alt={logo.title}
            width={100}
            height={50}
            className="object-contain"
          />
        </div>
      ))}
    </section>
  );
}
