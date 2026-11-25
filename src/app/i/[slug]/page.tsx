import { redirect } from 'next/navigation';

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ to?: string }>;
}

export default async function LegacyInvitationPage({ params, searchParams }: InvitationPageProps) {
  const { slug } = await params;
  const resolvedParams = searchParams ? await searchParams : undefined;
  const to = resolvedParams?.to;

  if (to) {
    redirect(`/${slug}?to=${encodeURIComponent(to)}`);
  }
  redirect(`/${slug}`);
}
