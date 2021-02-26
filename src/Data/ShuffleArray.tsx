export default function shuffleArray(ar: string[]): string[] {
  const sortAr = [...ar];
  return sortAr.sort(() => 0.5 - Math.random());
}