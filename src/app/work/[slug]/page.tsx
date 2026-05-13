import { projects } from "@/data/projects";
import { notFound, redirect } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type WorkRedirectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkRedirectPage({ params }: WorkRedirectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  redirect(project.url);
}
