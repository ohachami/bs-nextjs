async function ExericseById({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const exerciseId = (await params).exerciseId;

  return <div>{exerciseId}</div>;
}

export default ExericseById;