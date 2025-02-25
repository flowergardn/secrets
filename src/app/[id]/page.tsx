import { getSecret } from "~/server/actions/secrets";
import { notFound, redirect } from "next/navigation";
import DisplaySecret from "~/app/[id]/display-secret";
import { type Metadata } from "next";
import { getBaseUrl } from "~/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewSecret({ params }: PageProps) {
  const { id } = await params;

  const secret = await getSecret(id);

  if (!secret) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <DisplaySecret
        secret={{
          id,
          content: secret,
        }}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const secret = await getSecret(id);

  if (!secret) notFound();

  return {
    title: "A secret was shared with you",
    description: "View it before it expires!",
    icons: [{ rel: "icon", url: "/icon.png" }],
    openGraph: {
      title: "A secret was shared with you",
      description: "View it before it expires!",
      url: `${getBaseUrl()}/${id}`,
      siteName: "secrets",
      images: [
        {
          url: `${getBaseUrl()}/icon.png`,
          width: 128,
          height: 128,
          type: "image/png",
          alt: "logo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
    },
  };
}
