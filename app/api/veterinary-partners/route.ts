import { NextResponse } from "next/server";

export async function GET() {
  const partners = [
    {
      name: "Vetic",
      desc: "Well-equipped local vet clinics across NCR for advanced medical treatment and surgery.",
      url: "https://vetic.in"
    },
    {
      name: "DeePet Services",
      desc: "Reliable companion healthcare, grooming, and clinic options.",
      url: "https://deepetservices.com"
    },
    {
      name: "IncrediPets",
      desc: "Comprehensive pet wellness, accessories, and vet checks.",
      url: "https://incredipets.in"
    },
    {
      name: "PawFriend",
      desc: "NCR clinic and home consultation platform for dogs and cats.",
      url: "https://pawfriend.in"
    }
  ];

  return NextResponse.json({
    success: true,
    data: partners
  });
}
