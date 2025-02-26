import Link from "next/link";
import { Button } from "~/components/ui/button";
import { CreateButton } from "~/app/create";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <section className={"flex flex-col gap-4 md:mx-0 mx-8"}>
        <h1 className="text-3xl font-bold">secrets</h1>
        <p className="text-xl">an app to create and share temporary secrets</p>
        <CreateButton />
        <section className="flex flex-row gap-4 w-full">
          <Link href="https://github.com/flowergardn/secrets" className="w-1/2">
            <Button variant="outline" className="w-full">
              github
            </Button>
          </Link>
          <Link href="/faq" className="w-1/2">
            <Button variant="outline" className="w-full">
              faq
            </Button>
          </Link>
        </section>
      </section>
    </main>
  );
}
