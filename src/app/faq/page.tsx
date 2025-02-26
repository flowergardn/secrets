import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function FaqPage() {
  const questions = [
    {
      question: "what's the purpose of this app?",
      answer: (
        <>
          this app is a simple way to create and share temporary secrets. for
          extremely sensitive persistent information, please look into other
          options, such as{" "}
          <Link
            href="https://www.hashicorp.com/en/products/vault"
            className="underline"
          >
            hashicorp vault
          </Link>{" "}
          or{" "}
          <Link
            href="https://bitwarden.com/go/secrets-manager/"
            className="underline"
          >
            bitwarden secrets
          </Link>
          .
        </>
      ),
    },
    {
      question: "how do i create a secret?",
      answer: (
        <>
          secrets are created by clicking the <b>create</b> button on the{" "}
          <Link href="/" className="underline">
            home page
          </Link>
          .
        </>
      ),
    },
    {
      question: "how do i share a secret with someone?",
      answer:
        "once you have created a secret, the link will automatically be copied to your clipboard, you can then share the link wherever you want.",
    },
    {
      question: "how do i delete a secret?",
      answer:
        "secrets are deleted when they are viewed, or when they expire. there's not yet a way to delete them manually.",
    },
    {
      question: "are secrets encrypted?",
      answer:
        "yes, secrets are encrypted server-side using AES-256-CBC with a random IV per secret.",
    },
    {
      question: "but the plaintext is sent to the server, how is it secure?",
      answer: (
        <>
          while this could be a flaw, the server is only storing the encrypted
          content - you can audit our{" "}
          <Link
            href="https://github.com/flowergardn/secrets"
            className="underline"
          >
            source code
          </Link>{" "}
          to make sure we&#39;re not storing or leaking any sensitive
          information.
        </>
      ),
    },
    {
      question: "how can i donate?",
      answer: (
        <>
          you can donate to the{" "}
          <Link
            href="https://github.com/sponsors/flowergardn"
            className="underline"
          >
            creator
          </Link>{" "}
          of this project through github sponsors 🤍
        </>
      ),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white m-8 md:m-0">
      <section className="flex w-full md:w-2/4 flex-col gap-4">
        <h1 className="text-3xl font-bold">faq</h1>
        <p className="text-xl">
          here are some frequently asked questions about the app
        </p>
        <Link href="/" className="w-full">
          <Button variant="outline">
            back to home
          </Button>
        </Link>
        <hr className="border-border" />
        <div className="flex flex-col gap-4">
          {questions.map((question) => (
            <div key={question.question} className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{question.question}</h2>
              <p>{question.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
