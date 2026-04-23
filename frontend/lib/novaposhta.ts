const NP_API = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = process.env.NEXT_PUBLIC_NP_API_KEY ?? "";

export type NpCity = {
  Ref: string;
  MainDescription: string;
  Present: string; // formatted: "м. Кам'янка, Черкаська обл."
};

export type NpWarehouse = {
  Ref: string;
  Description: string;
};

export async function searchCities(query: string): Promise<NpCity[]> {
  if (query.length < 2) return [];
  const res = await fetch(NP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: { CityName: query, Limit: 12 },
    }),
  });
  const json = await res.json();
  // Response: { data: [{ Addresses: NpCity[] }] }
  return (json.data?.[0]?.Addresses ?? []) as NpCity[];
}

export async function getWarehouses(settlementRef: string): Promise<NpWarehouse[]> {
  const res = await fetch(NP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: { SettlementRef: settlementRef, Limit: 500, Language: "UA" },
    }),
  });
  const json = await res.json();
  return (json.data ?? []) as NpWarehouse[];
}
