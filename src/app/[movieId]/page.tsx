type MovieDetailsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MovieDetailsPage({
  searchParams,
}: MovieDetailsPageProps) {
  return <div></div>;
}
