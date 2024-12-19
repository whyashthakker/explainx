import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <>
      {" "}
      <Label>hfakjsdfhjkhjk</Label>
      Influencer button <Separator />
      <Button variant={"secondary"}>Button for test ui and tailwind</Button>
    </>
  );
}
