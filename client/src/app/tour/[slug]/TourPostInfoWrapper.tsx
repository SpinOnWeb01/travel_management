"use client";
import TourPostInfo from "./TourPostInfo";

export default function TourPostInfoWrapper({ data }: { data: any }) {
  return <TourPostInfo tour={data} />;
}
