import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="py-32 text-center">
      <Container>
        <p className="font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-5xl font-bold">Page not found</h1>
        <div className="mt-8">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
