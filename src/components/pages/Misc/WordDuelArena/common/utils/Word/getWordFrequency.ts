export type FrequencyType = Record<string, number>;

let frequencyCache: FrequencyType | null = null;

export async function loadFrequencies(): Promise<FrequencyType> {
  if (frequencyCache) return frequencyCache;

  const res = await fetch(
    `${import.meta.env.BASE_URL}projects/wda/frequency.json`
  );


  const json = await res.json();
  frequencyCache = json as FrequencyType;
  return frequencyCache;
}